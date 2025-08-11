-- Repariere Trigger und Profile
-- Führe dieses Skript in deiner Supabase-Datenbank aus

-- 1. Lösche alte Trigger und Funktionen
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 2. Erstelle verbesserte Trigger-Funktion
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Erstelle Profil mit Benutzerdaten aus raw_user_meta_data
  INSERT INTO public.profiles (
    id,
    email,
    first_name, 
    last_name,
    full_name,
    company_name,
    phone,
    is_registration,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'company_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    true,
    COALESCE(NEW.created_at, NOW()),
    NOW()
  );
  
  RAISE NOTICE 'Profil erstellt für Benutzer % mit Daten: %', NEW.id, NEW.raw_user_meta_data;
  RETURN NEW;
  
EXCEPTION
  WHEN OTHERS THEN
    -- Bei Fehler: Logge den Fehler und fahre fort
    RAISE WARNING 'Fehler beim Erstellen des Profils für Benutzer %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Erstelle Trigger neu
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. Stelle sicher, dass die profiles-Tabelle korrekt ist
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_registration BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS firmen_id UUID;

-- 5. RLS-Richtlinien reparieren
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 6. Erstelle fehlende Profile für bestehende Benutzer
INSERT INTO public.profiles (id, email, first_name, last_name, full_name, company_name, phone, is_registration, created_at, updated_at)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'first_name', ''),
  COALESCE(au.raw_user_meta_data->>'last_name', ''),
  COALESCE(au.raw_user_meta_data->>'full_name', ''),
  COALESCE(au.raw_user_meta_data->>'company_name', ''),
  COALESCE(au.raw_user_meta_data->>'phone', ''),
  true,
  COALESCE(au.created_at, NOW()),
  NOW()
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE p.id IS NULL;

-- 7. Teste den Trigger (optional)
-- INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_user_meta_data)
-- VALUES (
--   gen_random_uuid(),
--   'trigger-test@example.com',
--   crypt('password', gen_salt('bf')),
--   NOW(),
--   NOW(),
--   NOW(),
--   '{"first_name": "Trigger", "last_name": "Test", "phone": "+4912345678"}'::jsonb
-- );

-- 8. Zeige Statistiken
SELECT 
  'Users in auth.users' as table_name,
  COUNT(*) as count
FROM auth.users
UNION ALL
SELECT 
  'Profiles in public.profiles' as table_name,
  COUNT(*) as count
FROM public.profiles;

-- 9. Zeige Trigger-Status
SELECT 
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers 
WHERE event_object_table = 'users'
AND event_object_schema = 'auth';
