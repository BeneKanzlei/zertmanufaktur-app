-- Füge fehlende Spalten zur companies Tabelle hinzu (falls sie bereits existiert)
ALTER TABLE public.companies 
ADD COLUMN IF NOT EXISTS firmen_land TEXT,
ADD COLUMN IF NOT EXISTS firmen_bundesland TEXT,
ADD COLUMN IF NOT EXISTS firmen_nummer TEXT;

-- Mache die neuen Spalten NOT NULL (nur wenn sie noch nicht NOT NULL sind)
DO $$
BEGIN
    -- Prüfe ob firmen_land bereits NOT NULL ist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'companies' 
        AND column_name = 'firmen_land' 
        AND is_nullable = 'NO'
    ) THEN
        ALTER TABLE public.companies ALTER COLUMN firmen_land SET NOT NULL;
    END IF;
    
    -- Prüfe ob firmen_bundesland bereits NOT NULL ist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'companies' 
        AND column_name = 'firmen_bundesland' 
        AND is_nullable = 'NO'
    ) THEN
        ALTER TABLE public.companies ALTER COLUMN firmen_bundesland SET NOT NULL;
    END IF;
    
    -- Prüfe ob firmen_nummer bereits NOT NULL ist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'companies' 
        AND column_name = 'firmen_nummer' 
        AND is_nullable = 'NO'
    ) THEN
        ALTER TABLE public.companies ALTER COLUMN firmen_nummer SET NOT NULL;
    END IF;
END $$;
