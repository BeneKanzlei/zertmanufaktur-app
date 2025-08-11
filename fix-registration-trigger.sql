-- Repariere den Registrierungs-Trigger
-- Führe dieses Skript in deiner Supabase-Datenbank aus

-- 1. Prüfe ob die profiles-Tabelle existiert und die richtigen Spalten hat
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'profiles' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Lösche den alten Trigger falls er existiert
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 3. Lösche die alte Funktion falls sie existiert
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 4. Erstelle die Funktion neu mit korrekten Spalten
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    first_name, 
    last_name, 
    phone,
    is_registration,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    true, -- Standardmäßig true für neue Benutzer
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Erstelle den Trigger neu
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. Stelle sicher, dass die profiles-Tabelle die richtigen Spalten hat
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_registration BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS firmen_id UUID REFERENCES public.companies(id);

-- 7. Prüfe die RLS-Richtlinien
SELECT 
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'profiles';

-- 8. Erstelle fehlende RLS-Richtlinien falls nötig
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 9. Teste den Trigger mit einem Dummy-Benutzer (optional)
-- INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_user_meta_data)
-- VALUES (
--   gen_random_uuid(),
--   'test@example.com',
--   crypt('password', gen_salt('bf')),
--   NOW(),
--   NOW(),
--   NOW(),
--   '{"first_name": "Test", "last_name": "User", "phone": "+4912345678"}'::jsonb
-- );

-- 10. Zeige Statistiken
SELECT 
  'Users in auth.users' as table_name,
  COUNT(*) as count
FROM auth.users
UNION ALL
SELECT 
  'Profiles in public.profiles' as table_name,
  COUNT(*) as count
FROM public.profiles;
