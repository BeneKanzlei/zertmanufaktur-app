-- Repariere RLS-Richtlinien für die profiles-Tabelle
-- Führe dieses Skript in deiner Supabase-Datenbank aus

-- 1. Lösche alle bestehenden Richtlinien für profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- 2. Erstelle neue, korrekte Richtlinien
-- Richtlinie für das Anzeigen von Profilen
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Richtlinie für das Aktualisieren von Profilen
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Richtlinie für das Einfügen von Profilen (wichtig für automatische Erstellung)
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 3. Stelle sicher, dass RLS aktiviert ist
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 4. Prüfe die aktuellen Richtlinien
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'profiles';
