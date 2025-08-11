-- Repariere RLS-Richtlinien für profiles Tabelle

-- Lösche alte Richtlinien
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- Erstelle neue, weniger restriktive Richtlinien
CREATE POLICY "Enable read access for all authenticated users" ON public.profiles
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert access for all authenticated users" ON public.profiles
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update access for all authenticated users" ON public.profiles
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Alternative: RLS komplett deaktivieren (falls die Richtlinien immer noch Probleme machen)
-- ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
