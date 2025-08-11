-- Deaktiviere RLS für companies Tabelle (einfachste Lösung)

-- Lösche alle bestehenden Richtlinien
DROP POLICY IF EXISTS "Companies are viewable by authenticated users" ON public.companies;
DROP POLICY IF EXISTS "Companies can be created by authenticated users" ON public.companies;
DROP POLICY IF EXISTS "Companies can be updated by authenticated users" ON public.companies;
DROP POLICY IF EXISTS "Enable read access for all authenticated users" ON public.companies;
DROP POLICY IF EXISTS "Enable insert access for all authenticated users" ON public.companies;
DROP POLICY IF EXISTS "Enable update access for all authenticated users" ON public.companies;

-- Deaktiviere RLS komplett
ALTER TABLE public.companies DISABLE ROW LEVEL SECURITY;
