-- Repariere RLS-Richtlinien für companies Tabelle

-- Lösche alte Richtlinien
DROP POLICY IF EXISTS "Companies are viewable by authenticated users" ON public.companies;
DROP POLICY IF EXISTS "Companies can be created by authenticated users" ON public.companies;
DROP POLICY IF EXISTS "Companies can be updated by authenticated users" ON public.companies;

-- Erstelle neue, weniger restriktive Richtlinien
CREATE POLICY "Enable read access for all authenticated users" ON public.companies
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert access for all authenticated users" ON public.companies
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update access for all authenticated users" ON public.companies
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Alternative: RLS komplett deaktivieren (falls die Richtlinien immer noch Probleme machen)
-- ALTER TABLE public.companies DISABLE ROW LEVEL SECURITY;
