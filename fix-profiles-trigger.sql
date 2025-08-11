-- Repariere den Trigger für automatische Profilerstellung
-- Führe dieses Skript in deiner Supabase-Datenbank aus

-- 1. Lösche den alten Trigger falls er existiert
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 2. Lösche die alte Funktion falls sie existiert
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 3. Erstelle die Funktion neu
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

-- 4. Erstelle den Trigger neu
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Prüfe ob die profiles-Tabelle die neuen Spalten hat
-- Falls nicht, füge sie hinzu
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_registration BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS firmen_id UUID REFERENCES public.companies(id);

-- 6. Erstelle fehlende Profile für bestehende Benutzer
INSERT INTO public.profiles (id, first_name, last_name, phone, is_registration, created_at, updated_at)
SELECT 
  au.id,
  COALESCE(au.raw_user_meta_data->>'first_name', ''),
  COALESCE(au.raw_user_meta_data->>'last_name', ''),
  COALESCE(au.raw_user_meta_data->>'phone', ''),
  true,
  au.created_at,
  NOW()
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE p.id IS NULL;

-- 7. Zeige Statistiken
SELECT 
  'Profiles in auth.users' as table_name,
  COUNT(*) as count
FROM auth.users
UNION ALL
SELECT 
  'Profiles in public.profiles' as table_name,
  COUNT(*) as count
FROM public.profiles;
