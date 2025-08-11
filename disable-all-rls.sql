-- Deaktiviere RLS für alle Tabellen (einfachste Lösung)

-- Lösche alle bestehenden Richtlinien für companies
DROP POLICY IF EXISTS "Companies are viewable by authenticated users" ON public.companies;
DROP POLICY IF EXISTS "Companies can be created by authenticated users" ON public.companies;
DROP POLICY IF EXISTS "Companies can be updated by authenticated users" ON public.companies;
DROP POLICY IF EXISTS "Enable read access for all authenticated users" ON public.companies;
DROP POLICY IF EXISTS "Enable insert access for all authenticated users" ON public.companies;
DROP POLICY IF EXISTS "Enable update access for all authenticated users" ON public.companies;

-- Lösche alle bestehenden Richtlinien für profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Enable read access for all authenticated users" ON public.profiles;
DROP POLICY IF EXISTS "Enable insert access for all authenticated users" ON public.profiles;
DROP POLICY IF EXISTS "Enable update access for all authenticated users" ON public.profiles;

-- Deaktiviere RLS komplett für beide Tabellen
ALTER TABLE public.companies DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
