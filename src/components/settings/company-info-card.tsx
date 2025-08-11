'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { getCompanyByUserId, updateCompany } from '@/lib/supabase/companies'

interface Company {
  id: string
  firmenname: string
  firmenanschrift: string
  firmen_land: string
  firmen_bundesland: string
  firmen_plz: string
  firmen_ort: string
  firmen_mail: string
  firmen_telefon?: string
  firmen_nummer: string
  firmen_ust_id?: string
  firmen_logo_url?: string
  ceo_first_name?: string
  ceo_last_name?: string
  created_at: string
  updated_at: string
}

export default function CompanyInfoCard() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [company, setCompany] = useState<Company | null>(null)
  const [selectedCompanyCountry, setSelectedCompanyCountry] = useState('Deutschland')
  const [formData, setFormData] = useState({
    firmenname: '',
    firmenanschrift: '',
    firmen_land: 'Deutschland',
    firmen_bundesland: '',
    firmen_plz: '',
    firmen_ort: '',
    firmen_mail: '',
    firmen_telefon: '',
    firmen_ust_id: '',
    ceo_first_name: '',
    ceo_last_name: ''
  })

  // Bundesländer/Kantone je nach Land
  const getRegionsByCountry = (country: string) => {
    switch (country) {
      case 'Deutschland':
        return [
          'Baden-Württemberg', 'Bayern', 'Berlin', 'Brandenburg', 'Bremen', 
          'Hamburg', 'Hessen', 'Mecklenburg-Vorpommern', 'Niedersachsen', 
          'Nordrhein-Westfalen', 'Rheinland-Pfalz', 'Saarland', 'Sachsen', 
          'Sachsen-Anhalt', 'Schleswig-Holstein', 'Thüringen'
        ]
      case 'Österreich':
        return [
          'Burgenland', 'Kärnten', 'Niederösterreich', 'Oberösterreich', 
          'Salzburg', 'Steiermark', 'Tirol', 'Vorarlberg', 'Wien'
        ]
      case 'Schweiz':
        return [
          'Aargau', 'Appenzell Ausserrhoden', 'Appenzell Innerrhoden', 'Basel-Landschaft',
          'Basel-Stadt', 'Bern', 'Freiburg', 'Genf', 'Glarus', 'Graubünden',
          'Jura', 'Luzern', 'Neuenburg', 'Nidwalden', 'Obwalden', 'Schaffhausen',
          'Schwyz', 'Solothurn', 'St. Gallen', 'Tessin', 'Thurgau', 'Uri',
          'Waadt', 'Wallis', 'Zug', 'Zürich'
        ]
      default:
        return []
    }
  }

  // Lade Firmendaten beim Komponenten-Mount
  useEffect(() => {
    loadCompanyData()
  }, [])

  const loadCompanyData = async () => {
    try {
      setIsLoading(true)
      
      // Hole aktuellen Benutzer
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        console.error('Fehler beim Abrufen des Benutzers:', userError)
        return
      }

      // Hole Firmendaten direkt über die Benutzer-ID
      const { data: companyData, error: companyError } = await getCompanyByUserId(user.id)
      
      if (companyError) {
        console.error('Fehler beim Abrufen der Firmendaten:', companyError)
        // Wenn keine Firma verlinkt ist, ist das kein Fehler
        if (companyError.message === 'No company linked to user') {
          console.log('Benutzer hat keine Firma verlinkt')
          setIsLoading(false)
          return
        }
        return
      }

      if (companyData) {
        setCompany(companyData)
        setSelectedCompanyCountry(companyData.firmen_land || 'Deutschland')
        setFormData({
          firmenname: companyData.firmenname || '',
          firmenanschrift: companyData.firmenanschrift || '',
          firmen_land: companyData.firmen_land || 'Deutschland',
          firmen_bundesland: companyData.firmen_bundesland || '',
          firmen_plz: companyData.firmen_plz || '',
          firmen_ort: companyData.firmen_ort || '',
          firmen_mail: companyData.firmen_mail || '',
          firmen_telefon: companyData.firmen_telefon || '',
          firmen_ust_id: companyData.firmen_ust_id || '',
          ceo_first_name: companyData.ceo_first_name || '',
          ceo_last_name: companyData.ceo_last_name || ''
        })
      }
    } catch (error) {
      console.error('Fehler beim Laden der Firmendaten:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    if (!company) return

    try {
      setIsSaving(true)
      
      const updates = {
        firmenname: formData.firmenname,
        firmenanschrift: formData.firmenanschrift,
        firmen_land: formData.firmen_land,
        firmen_bundesland: formData.firmen_bundesland,
        firmen_plz: formData.firmen_plz,
        firmen_ort: formData.firmen_ort,
        firmen_mail: formData.firmen_mail,
        firmen_telefon: formData.firmen_telefon,
        firmen_ust_id: formData.firmen_ust_id,
        ceo_first_name: formData.ceo_first_name,
        ceo_last_name: formData.ceo_last_name,
        updated_at: new Date().toISOString()
      }

      const { data, error } = await updateCompany(company.id, updates)
      
      if (error) {
        console.error('Fehler beim Speichern der Firmendaten:', error)
        alert('Fehler beim Speichern der Daten. Bitte versuchen Sie es erneut.')
        return
      }

      if (data) {
        setCompany(data)
        alert('Firmendaten erfolgreich gespeichert!')
      }
    } catch (error) {
      console.error('Fehler beim Speichern:', error)
      alert('Ein unerwarteter Fehler ist aufgetreten.')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <h2 className="text-base/7 font-semibold text-gray-900">Unternehmensinformationen</h2>
          <p className="mt-1 text-sm/6 text-gray-600">Geschäftliche Informationen für Rechnungen und Geschäftskorrespondenz.</p>
        </div>
        <div className="md:col-span-8">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    )
  }

  // Wenn keine Firma verlinkt ist
  if (!company) {
    return (
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <h2 className="text-base/7 font-semibold text-gray-900">Unternehmensinformationen</h2>
          <p className="mt-1 text-sm/6 text-gray-600">Geschäftliche Informationen für Rechnungen und Geschäftskorrespondenz.</p>
        </div>
        <div className="md:col-span-8">
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Sie haben noch keine Firma verlinkt.</p>
            <p className="text-sm text-gray-400">Bitte kontaktieren Sie den Administrator, um eine Firma zu verlinken.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-12">
      <div className="md:col-span-4">
        <h2 className="text-base/7 font-semibold text-gray-900">Unternehmensinformationen</h2>
        <p className="mt-1 text-sm/6 text-gray-600">Geschäftliche Informationen für Rechnungen und Geschäftskorrespondenz.</p>
      </div>

      <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-8">
        <div className="col-span-full">
          <label htmlFor="company-name" className="block text-sm/6 font-medium text-gray-900">Unternehmensname</label>
          <div className="mt-2">
            <input 
              id="company-name" 
              type="text" 
              name="company-name" 
              value={formData.firmenname}
              onChange={(e) => handleInputChange('firmenname', e.target.value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="ceo-first-name" className="block text-sm/6 font-medium text-gray-900">Vorname GF</label>
          <div className="mt-2">
            <input 
              id="ceo-first-name" 
              type="text" 
              name="ceo-first-name" 
              value={formData.ceo_first_name}
              onChange={(e) => handleInputChange('ceo_first_name', e.target.value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="ceo-last-name" className="block text-sm/6 font-medium text-gray-900">Nachname GF</label>
          <div className="mt-2">
            <input 
              id="ceo-last-name" 
              type="text" 
              name="ceo-last-name" 
              value={formData.ceo_last_name}
              onChange={(e) => handleInputChange('ceo_last_name', e.target.value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
            />
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="company-email" className="block text-sm/6 font-medium text-gray-900">E-Mail-Adresse Unternehmen</label>
          <div className="mt-2">
            <input 
              id="company-email" 
              type="email" 
              name="company-email" 
              value={formData.firmen_mail}
              onChange={(e) => handleInputChange('firmen_mail', e.target.value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
            />
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="company-address" className="block text-sm/6 font-medium text-gray-900">Adresse</label>
          <div className="mt-2">
            <input 
              id="company-address" 
              type="text" 
              name="company-address" 
              value={formData.firmenanschrift}
              onChange={(e) => handleInputChange('firmenanschrift', e.target.value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="company-country" className="block text-sm/6 font-medium text-gray-900">Land</label>
          <div className="mt-2 grid grid-cols-1">
            <select 
              id="company-country" 
              name="company-country" 
              autoComplete="country-name" 
              value={formData.firmen_land}
              onChange={(e) => {
                setSelectedCompanyCountry(e.target.value)
                handleInputChange('firmen_land', e.target.value)
                handleInputChange('firmen_bundesland', '') // Reset region when country changes
              }}
              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            >
              <option>Deutschland</option>
              <option>Österreich</option>
              <option>Schweiz</option>
            </select>
            <svg viewBox="0 0 16 16" fill="currentColor" className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4">
              <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="company-region" className="block text-sm/6 font-medium text-gray-900">
            {formData.firmen_land === 'Schweiz' ? 'Kanton' : 'Bundesland'}
          </label>
          <div className="mt-2 grid grid-cols-1">
            <select 
              id="company-region" 
              name="company-region" 
              autoComplete="address-level1" 
              value={formData.firmen_bundesland}
              onChange={(e) => handleInputChange('firmen_bundesland', e.target.value)}
              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            >
              <option value="">Bitte wählen</option>
              {getRegionsByCountry(formData.firmen_land).map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <svg viewBox="0 0 16 16" fill="currentColor" className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4">
              <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="ust-id" className="block text-sm/6 font-medium text-gray-900">USt. ID</label>
          <div className="mt-2">
            <input 
              id="ust-id" 
              type="text" 
              name="ust-id" 
              value={formData.firmen_ust_id}
              onChange={(e) => handleInputChange('firmen_ust_id', e.target.value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="company-postal-code" className="block text-sm/6 font-medium text-gray-900">PLZ</label>
          <div className="mt-2">
            <input 
              id="company-postal-code" 
              type="text" 
              name="company-postal-code" 
              value={formData.firmen_plz}
              onChange={(e) => handleInputChange('firmen_plz', e.target.value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="company-city" className="block text-sm/6 font-medium text-gray-900">Ort</label>
          <div className="mt-2">
            <input 
              id="company-city" 
              type="text" 
              name="company-city" 
              value={formData.firmen_ort}
              onChange={(e) => handleInputChange('firmen_ort', e.target.value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
            />
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="company-phone" className="block text-sm/6 font-medium text-gray-900">Telefonnummer</label>
          <div className="mt-2">
            <input 
              id="company-phone" 
              type="tel" 
              name="company-phone" 
              value={formData.firmen_telefon}
              onChange={(e) => handleInputChange('firmen_telefon', e.target.value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
            />
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="company-logo" className="block text-sm/6 font-medium text-gray-900">Unternehmenslogo</label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              {company.firmen_logo_url ? (
                <img src={company.firmen_logo_url} alt="Unternehmenslogo" className="mx-auto w-[100px] h-[100px] object-contain" />
              ) : (
                <img src="/Zertmanufaktur.svg" alt="Zertmanufaktur Logo" className="mx-auto w-[100px] h-[100px]" />
              )}
              <div className="mt-0 flex text-sm/6 text-gray-600">
                <label htmlFor="logo-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-gray-900 focus-within:ring-2 focus-within:ring-gray-900 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-gray-700">
                  <span>Logo hochladen</span>
                  <input id="logo-upload" type="file" name="logo-upload" accept="image/*" className="sr-only" />
                </label>
                <p className="pl-1">oder per Drag & Drop</p>
              </div>
              <p className="text-xs/5 text-gray-600">PNG, JPG, SVG bis zu 5MB</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Speichern...' : 'Speichern'}
          </button>
        </div>
      </div>
    </div>
  )
} 