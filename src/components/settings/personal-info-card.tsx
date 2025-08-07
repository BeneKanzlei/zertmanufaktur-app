'use client'

import { useState } from 'react'

export default function PersonalInfoCard() {
  const [isSaving, setIsSaving] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState('Deutschland')

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
        <h2 className="text-base/7 font-semibold text-gray-900">Persönliche Informationen</h2>
        <p className="mt-1 text-sm/6 text-gray-600">Verwende eine permanente Adresse, wo du Post erhalten kannst.</p>
      </div>

      <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-8">
        <div className="sm:col-span-3">
          <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">Vorname</label>
          <div className="mt-2">
            <input id="first-name" type="text" name="first-name" autoComplete="given-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">Nachname</label>
          <div className="mt-2">
            <input id="last-name" type="text" name="last-name" autoComplete="family-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">E-Mail-Adresse</label>
          <div className="mt-2">
            <input id="email" type="email" name="email" autoComplete="email" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">Land</label>
          <div className="mt-2 grid grid-cols-1">
            <select 
              id="country" 
              name="country" 
              autoComplete="country-name" 
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
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
          <label htmlFor="region" className="block text-sm/6 font-medium text-gray-900">
            {selectedCountry === 'Schweiz' ? 'Kanton' : 'Bundesland'}
          </label>
          <div className="mt-2 grid grid-cols-1">
            <select 
              id="region" 
              name="region" 
              autoComplete="address-level1" 
              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            >
              <option value="">Bitte wählen</option>
              {getRegionsByCountry(selectedCountry).map((region) => (
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
          <label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900">Straße & Hausnummer</label>
          <div className="mt-2">
            <input id="street-address" type="text" name="street-address" autoComplete="street-address" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">Stadt</label>
          <div className="mt-2">
            <input id="city" type="text" name="city" autoComplete="address-level2" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-900">PLZ</label>
          <div className="mt-2">
            <input id="postal-code" type="text" name="postal-code" autoComplete="postal-code" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
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