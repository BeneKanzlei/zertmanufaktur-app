-- Erstelle companies Tabelle
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  firmenname TEXT NOT NULL,
  firmenanschrift TEXT NOT NULL,
  firmen_land TEXT NOT NULL,
  firmen_bundesland TEXT NOT NULL,
  firmen_plz TEXT NOT NULL,
  firmen_ort TEXT NOT NULL,
  firmen_mail TEXT NOT NULL,
  firmen_telefon TEXT,
  firmen_nummer TEXT NOT NULL,
  firmen_ust_id TEXT,
  firmen_logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS aktivieren
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- RLS-Richtlinien für companies
CREATE POLICY "Companies are viewable by authenticated users" ON public.companies
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Companies can be created by authenticated users" ON public.companies
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Companies can be updated by authenticated users" ON public.companies
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Alternative: RLS komplett deaktivieren für companies (falls die obigen Richtlinien nicht funktionieren)
-- ALTER TABLE public.companies DISABLE ROW LEVEL SECURITY;

-- Index für bessere Performance
CREATE INDEX IF NOT EXISTS idx_companies_firmenname ON public.companies(firmenname);
CREATE INDEX IF NOT EXISTS idx_companies_firmen_mail ON public.companies(firmen_mail);
