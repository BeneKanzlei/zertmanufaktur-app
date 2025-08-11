-- Firmen-Tabelle erstellen
CREATE TABLE public.companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  firmenname TEXT NOT NULL,
  firmenanschrift TEXT NOT NULL,
  firmen_plz TEXT NOT NULL,
  firmen_ort TEXT NOT NULL,
  firmen_mail TEXT NOT NULL,
  firmen_telefon TEXT,
  firmen_ust_id TEXT,
  firmen_logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS für Firmen-Tabelle aktivieren
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- Richtlinien für Firmen-Tabelle
CREATE POLICY "Users can view own company" ON public.companies
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.firmen_id = companies.id 
      AND profiles.id = auth.uid()
    )
  );

CREATE POLICY "Users can update own company" ON public.companies
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.firmen_id = companies.id 
      AND profiles.id = auth.uid()
    )
  );

CREATE POLICY "Users can insert company" ON public.companies
  FOR INSERT WITH CHECK (true);

-- Profiles-Tabelle erweitern
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_registration BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS firmen_id UUID REFERENCES public.companies(id);

-- Index für bessere Performance
CREATE INDEX IF NOT EXISTS idx_profiles_firmen_id ON public.profiles(firmen_id);
CREATE INDEX IF NOT EXISTS idx_profiles_is_registration ON public.profiles(is_registration);

-- Funktion für automatische Aktualisierung des updated_at Feldes
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger für companies-Tabelle
CREATE TRIGGER update_companies_updated_at 
    BEFORE UPDATE ON public.companies 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
