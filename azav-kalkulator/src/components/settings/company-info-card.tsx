'use client'

import { useState } from 'react'

export default function CompanyInfoCard() {
  const [isSaving, setIsSaving] = useState(false)
  const [selectedCompanyCountry, setSelectedCompanyCountry] = useState('Deutschland')

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

  const handleSave = async () => {
    setIsSaving(true)
    // Hier würde die Speicherlogik implementiert
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
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
            <input id="company-name" type="text" name="company-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="ceo-first-name" className="block text-sm/6 font-medium text-gray-900">Vorname GF</label>
          <div className="mt-2">
            <input id="ceo-first-name" type="text" name="ceo-first-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="ceo-last-name" className="block text-sm/6 font-medium text-gray-900">Nachname GF</label>
          <div className="mt-2">
            <input id="ceo-last-name" type="text" name="ceo-last-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="company-email" className="block text-sm/6 font-medium text-gray-900">E-Mail-Adresse Unternehmen</label>
          <div className="mt-2">
            <input id="company-email" type="email" name="company-email" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="company-address" className="block text-sm/6 font-medium text-gray-900">Adresse</label>
          <div className="mt-2">
            <input id="company-address" type="text" name="company-address" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="company-country" className="block text-sm/6 font-medium text-gray-900">Land</label>
          <div className="mt-2 grid grid-cols-1">
            <select 
              id="company-country" 
              name="company-country" 
              autoComplete="country-name" 
              value={selectedCompanyCountry}
              onChange={(e) => setSelectedCompanyCountry(e.target.value)}
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
            {selectedCompanyCountry === 'Schweiz' ? 'Kanton' : 'Bundesland'}
          </label>
          <div className="mt-2 grid grid-cols-1">
            <select 
              id="company-region" 
              name="company-region" 
              autoComplete="address-level1" 
              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            >
              <option value="">Bitte wählen</option>
              {getRegionsByCountry(selectedCompanyCountry).map((region) => (
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
            <input id="ust-id" type="text" name="ust-id" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="company-postal-code" className="block text-sm/6 font-medium text-gray-900">PLZ</label>
          <div className="mt-2">
            <input id="company-postal-code" type="text" name="company-postal-code" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="company-city" className="block text-sm/6 font-medium text-gray-900">Ort</label>
          <div className="mt-2">
            <input id="company-city" type="text" name="company-city" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="company-phone" className="block text-sm/6 font-medium text-gray-900">Telefonnummer</label>
          <div className="mt-2">
            <input id="company-phone" type="tel" name="company-phone" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="company-logo" className="block text-sm/6 font-medium text-gray-900">Unternehmenslogo</label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <img src="/zertmanufaktur-logo.png" alt="Zertmanufaktur Logo" className="mx-auto w-[100px] h-[100px]" />
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