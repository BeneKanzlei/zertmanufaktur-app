-- Repariere die auth.users Tabelle und Trigger
-- Führe dieses Skript in deiner Supabase-Datenbank aus

-- 1. Prüfe die auth.users Tabelle
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'users' 
AND table_schema = 'auth'
ORDER BY ordinal_position;

-- 2. Prüfe die Trigger
SELECT 
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers 
WHERE event_object_table = 'users'
AND event_object_schema = 'auth';

-- 3. Lösche problematische Trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 4. Lösche problematische Funktionen
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 5. Prüfe ob die profiles-Tabelle existiert
SELECT 
  table_name,
  table_schema
FROM information_schema.tables 
WHERE table_name = 'profiles' 
AND table_schema = 'public';

-- 6. Erstelle die profiles-Tabelle falls sie nicht existiert
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  is_registration BOOLEAN DEFAULT true,
  firmen_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Stelle sicher, dass die Spalten existieren
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_registration BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS firmen_id UUID;

-- 8. Erstelle die Trigger-Funktion neu (vereinfacht)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Einfache Profilerstellung ohne komplexe Logik
  INSERT INTO public.profiles (id, is_registration, created_at, updated_at)
  VALUES (NEW.id, true, NOW(), NOW());
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Bei Fehler: Logge den Fehler und fahre fort
    RAISE WARNING 'Fehler beim Erstellen des Profils für Benutzer %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. Erstelle den Trigger neu
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 10. RLS für profiles-Tabelle
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 11. RLS-Richtlinien
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 12. Erstelle fehlende Profile für bestehende Benutzer
INSERT INTO public.profiles (id, is_registration, created_at, updated_at)
SELECT 
  au.id,
  true,
  au.created_at,
  NOW()
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE p.id IS NULL;

-- 13. Zeige Statistiken
SELECT 
  'Users in auth.users' as table_name,
  COUNT(*) as count
FROM auth.users
UNION ALL
SELECT 
  'Profiles in public.profiles' as table_name,
  COUNT(*) as count
FROM public.profiles;
