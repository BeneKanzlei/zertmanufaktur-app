'use client'

import { useState } from 'react'

export default function ProfileCard() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Hier würde die Speicherlogik implementiert
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-12">
      <div className="md:col-span-4">
        <h2 className="text-base/7 font-semibold text-gray-900">Profil</h2>
        <p className="mt-1 text-sm/6 text-gray-600">Diese Informationen werden öffentlich angezeigt, also sei vorsichtig mit dem, was du teilst.</p>
      </div>

      <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-8">
        <div className="sm:col-span-3">
          <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">Benutzername</label>
          <div className="mt-2">
            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
              <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">zertmanufaktur.com/</div>
              <input id="username" type="text" name="username" placeholder="maxmustermann" className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
            </div>
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">Über mich</label>
          <div className="mt-2">
            <textarea id="about" name="about" rows={3} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></textarea>
          </div>
          <p className="mt-3 text-sm/6 text-gray-600">Schreibe ein paar Sätze über dich.</p>
        </div>

        <div className="col-span-full">
          <label htmlFor="photo" className="block text-sm/6 font-medium text-gray-900">Foto</label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <img src="/zertmanufaktur-logo.png" alt="Zertmanufaktur Logo" className="mx-auto w-[100px] h-[100px]" />
              <div className="mt-0 flex text-sm/6 text-gray-600">
                <label htmlFor="photo-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-gray-900 focus-within:ring-2 focus-within:ring-gray-900 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-gray-700">
                  <span>Foto hochladen</span>
                  <input id="photo-upload" type="file" name="photo-upload" accept="image/*" className="sr-only" />
                </label>
                <p className="pl-1">oder per Drag & Drop</p>
              </div>
              <p className="text-xs/5 text-gray-600">PNG, JPG, GIF bis zu 5MB</p>
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