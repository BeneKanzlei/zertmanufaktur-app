'use client'

import { useState } from 'react'

export default function NotificationsCard() {
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
        <h2 className="text-base/7 font-semibold text-gray-900">Benachrichtigungen</h2>
        <p className="mt-1 text-sm/6 text-gray-600">Wir informieren dich immer über wichtige Änderungen, aber du bestimmst, was du sonst noch hören möchtest.</p>
      </div>

      <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-8">
        <fieldset className="col-span-full">
          <legend className="text-sm/6 font-semibold text-gray-900">Per E-Mail</legend>
          <div className="mt-6 space-y-6">
            <div className="flex gap-3">
              <div className="flex h-6 shrink-0 items-center">
                <div className="group grid size-4 grid-cols-1">
                  <input id="comments" type="checkbox" name="comments" defaultChecked aria-describedby="comments-description" className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-green-600 checked:bg-green-600 indeterminate:border-green-600 indeterminate:bg-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
                  <svg viewBox="0 0 14 14" fill="none" className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
                    <path d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-checked:opacity-100" />
                    <path d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-indeterminate:opacity-100" />
                  </svg>
                </div>
              </div>
              <div className="text-sm/6">
                <label htmlFor="comments" className="font-medium text-gray-900">Kommentare</label>
                <p id="comments-description" className="text-gray-500">Benachrichtigung erhalten, wenn jemand einen Kommentar zu einem Beitrag schreibt.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 shrink-0 items-center">
                <div className="group grid size-4 grid-cols-1">
                  <input id="tasks" type="checkbox" name="tasks" aria-describedby="tasks-description" className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-green-600 checked:bg-green-600 indeterminate:border-green-600 indeterminate:bg-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
                  <svg viewBox="0 0 14 14" fill="none" className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
                    <path d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-checked:opacity-100" />
                    <path d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-indeterminate:opacity-100" />
                  </svg>
                </div>
              </div>
              <div className="text-sm/6">
                <label htmlFor="tasks" className="font-medium text-gray-900">Aufgaben</label>
                <p id="tasks-description" className="text-gray-500">Benachrichtigung erhalten, wenn neue Aufgaben zugewiesen oder aktualisiert werden.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 shrink-0 items-center">
                <div className="group grid size-4 grid-cols-1">
                  <input id="appointments" type="checkbox" name="appointments" aria-describedby="appointments-description" className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-green-600 checked:bg-green-600 indeterminate:border-green-600 indeterminate:bg-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
                  <svg viewBox="0 0 14 14" fill="none" className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
                    <path d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-checked:opacity-100" />
                    <path d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-indeterminate:opacity-100" />
                  </svg>
                </div>
              </div>
              <div className="text-sm/6">
                <label htmlFor="appointments" className="font-medium text-gray-900">Termine</label>
                <p id="appointments-description" className="text-gray-500">Benachrichtigung erhalten, wenn Termine anstehen oder sich ändern.</p>
              </div>
            </div>
          </div>
        </fieldset>

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