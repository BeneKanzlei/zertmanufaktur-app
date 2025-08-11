'use client'

import { useState, useRef, useEffect } from 'react'
import { CompanyFormData } from '@/types'

// DACH Länderliste
const dachCountries = [
  { code: '+49', name: 'Deutschland', flag: '🇩🇪' },
  { code: '+43', name: 'Österreich', flag: '🇦🇹' },
  { code: '+41', name: 'Schweiz', flag: '🇨🇭' },
]

interface CompanyRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: CompanyFormData) => Promise<void>
  isLoading?: boolean
  userProfile?: any
}

export default function CompanyRegistrationModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  userProfile
}: CompanyRegistrationModalProps) {
  const [formData, setFormData] = useState<CompanyFormData>({
    firmenname: '',
    firmenanschrift: '',
    firmen_plz: '',
    firmen_ort: '',
    firmen_mail: '',
    firmen_telefon: '',
    firmen_ust_id: ''
  })
  const [errors, setErrors] = useState<Partial<CompanyFormData>>({})
  const [selectedCountry, setSelectedCountry] = useState('Deutschland')
  const [selectedPhoneCountry, setSelectedPhoneCountry] = useState('+49')

  // Aktualisiere Firmenname wenn userProfile sich ändert
  useEffect(() => {
    console.log('🔍 CompanyRegistrationModal: userProfile geändert:', userProfile)
    console.log('🔍 CompanyRegistrationModal: userProfile.company_name:', userProfile?.company_name)
    
    if (userProfile?.company_name && userProfile.company_name.trim() !== '') {
      console.log('🔍 CompanyRegistrationModal: Setze Firmenname auf:', userProfile.company_name)
      setFormData(prev => {
        const newData = {
          ...prev,
          firmenname: userProfile.company_name
        }
        console.log('🔍 CompanyRegistrationModal: Neuer FormData:', newData)
        return newData
      })
    } else {
      console.log('🔍 CompanyRegistrationModal: Kein company_name gefunden oder leer')
    }
  }, [userProfile])

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    console.log('🔍 CompanyRegistrationModal: Input geändert:', name, value)
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name as keyof CompanyFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }



  const validateForm = (): boolean => {
    const newErrors: Partial<CompanyFormData> = {}

    if (!formData.firmenname.trim()) {
      newErrors.firmenname = 'Firmenname ist erforderlich'
    }
    if (!formData.firmenanschrift.trim()) {
      newErrors.firmenanschrift = 'Firmenanschrift ist erforderlich'
    }
    if (!formData.firmen_plz.trim()) {
      newErrors.firmen_plz = 'PLZ ist erforderlich'
    }
    if (!formData.firmen_ort.trim()) {
      newErrors.firmen_ort = 'Ort ist erforderlich'
    }
    if (!formData.firmen_mail.trim()) {
      newErrors.firmen_mail = 'E-Mail ist erforderlich'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.firmen_mail)) {
      newErrors.firmen_mail = 'Gültige E-Mail-Adresse erforderlich'
    }
    if (!formData.firmen_telefon.trim()) {
      newErrors.firmen_telefon = 'Telefonnummer ist erforderlich'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      // Kombiniere die Telefonnummer mit der Ländervorwahl
      const completeFormData = {
        ...formData,
        land: selectedCountry,
        bundesland: (document.getElementById('region') as HTMLSelectElement)?.value || '',
        telefon_laendervorwahl: selectedPhoneCountry,
        firmen_telefon: `${selectedPhoneCountry}${formData.firmen_telefon}`
      }
      
      await onSubmit(completeFormData)
    } catch (error) {
      console.error('Fehler beim Speichern der Firmendaten:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">


          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-6.75 4.5h6.75m-6.75 4.5h6.75m-6.75 4.5h6.75" />
              </svg>
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
              <div className="flex items-center justify-center mb-4">
                <img src="/Zertmanufaktur.svg" alt="Zertmanufaktur Logo" className="h-12 w-auto" />
              </div>
              <h3 className="text-lg font-semibold leading-6 text-gray-900">
                Willkommen bei Zertmanufaktur
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Hallo <strong>{userProfile?.first_name && userProfile?.last_name ? `${userProfile.first_name} ${userProfile.last_name}` : userProfile?.first_name ? userProfile.first_name : 'Benutzer'}</strong>,<br />
                  schön, dass Sie dabei sind!<br />
                  Bitte vervollständigen Sie noch kurz Ihre Angaben – wir schalten Ihr Profil dann sofort frei.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
              {/* Firmenname */}
              <div className="col-span-full">
                <label htmlFor="firmenname" className="block text-sm/6 font-medium text-gray-900">
                  Firmenname *
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="firmenname"
                    name="firmenname"
                    value={formData.firmenname}
                    onChange={handleInputChange}
                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${
                      errors.firmenname ? 'outline-red-300 focus:outline-red-600' : ''
                    }`}
                    placeholder="Ihre Firma GmbH"
                  />
                </div>
                {errors.firmenname && (
                  <p className="mt-1 text-sm text-red-600">{errors.firmenname}</p>
                )}
              </div>

              {/* Firmenanschrift */}
              <div className="col-span-full">
                <label htmlFor="firmenanschrift" className="block text-sm/6 font-medium text-gray-900">
                  Firmenanschrift *
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="firmenanschrift"
                    name="firmenanschrift"
                    value={formData.firmenanschrift}
                    onChange={handleInputChange}
                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${
                      errors.firmenanschrift ? 'outline-red-300 focus:outline-red-600' : ''
                    }`}
                    placeholder="Musterstraße 123"
                  />
                </div>
                {errors.firmenanschrift && (
                  <p className="mt-1 text-sm text-red-600">{errors.firmenanschrift}</p>
                )}
              </div>

              {/* Land */}
              <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                  Land *
                </label>
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

              {/* Bundesland/Kanton */}
              <div className="sm:col-span-3">
                <label htmlFor="region" className="block text-sm/6 font-medium text-gray-900">
                  {selectedCountry === 'Schweiz' ? 'Kanton' : 'Bundesland'} *
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

              {/* PLZ */}
              <div className="sm:col-span-3">
                <label htmlFor="firmen_plz" className="block text-sm/6 font-medium text-gray-900">
                  PLZ *
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="firmen_plz"
                    name="firmen_plz"
                    value={formData.firmen_plz}
                    onChange={handleInputChange}
                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${
                      errors.firmen_plz ? 'outline-red-300 focus:outline-red-600' : ''
                    }`}
                    placeholder="12345"
                  />
                </div>
                {errors.firmen_plz && (
                  <p className="mt-1 text-sm text-red-600">{errors.firmen_plz}</p>
                )}
              </div>

              {/* Ort */}
              <div className="sm:col-span-3">
                <label htmlFor="firmen_ort" className="block text-sm/6 font-medium text-gray-900">
                  Ort *
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="firmen_ort"
                    name="firmen_ort"
                    value={formData.firmen_ort}
                    onChange={handleInputChange}
                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${
                      errors.firmen_ort ? 'outline-red-300 focus:outline-red-600' : ''
                    }`}
                    placeholder="Musterstadt"
                  />
                </div>
                {errors.firmen_ort && (
                  <p className="mt-1 text-sm text-red-600">{errors.firmen_ort}</p>
                )}
              </div>

              {/* E-Mail und Telefon in einer Zeile */}
              <div className="sm:col-span-3">
                <label htmlFor="firmen_mail" className="block text-sm/6 font-medium text-gray-900">
                  Firmen-E-Mail *
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    id="firmen_mail"
                    name="firmen_mail"
                    value={formData.firmen_mail}
                    onChange={handleInputChange}
                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${
                      errors.firmen_mail ? 'outline-red-300 focus:outline-red-600' : ''
                    }`}
                    placeholder="info@ihrefirma.de"
                  />
                </div>
                {errors.firmen_mail && (
                  <p className="mt-1 text-sm text-red-600">{errors.firmen_mail}</p>
                )}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="firmen_telefon" className="block text-sm/6 font-medium text-gray-900">
                  Telefonnummer *
                </label>
                <div className="mt-2 flex">
                  <div className="relative">
                    <select
                      name="phoneCountry"
                      value={selectedPhoneCountry}
                      onChange={(e) => setSelectedPhoneCountry(e.target.value)}
                      className="block w-26 rounded-l-md border-0 py-1.5 pl-2 pr-8 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 bg-white h-full [&::-ms-expand]:hidden [&::-webkit-select-placeholder]:hidden"
                      style={{
                        backgroundImage: 'none',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none'
                      }}
                    >
                      {dachCountries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    type="tel"
                    id="firmen_telefon"
                    name="firmen_telefon"
                    value={formData.firmen_telefon}
                    onChange={handleInputChange}
                    className="block w-full rounded-r-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    placeholder="1512345678"
                  />
                </div>
              </div>



              {/* USt-ID */}
              <div className="col-span-full">
                <label htmlFor="firmen_ust_id" className="block text-sm/6 font-medium text-gray-900">
                  USt-ID
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="firmen_ust_id"
                    name="firmen_ust_id"
                    value={formData.firmen_ust_id}
                    onChange={handleInputChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    placeholder="DE123456789"
                  />
                </div>
              </div>


            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Speichern...
                  </div>
                ) : (
                  'Firmendaten speichern'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
