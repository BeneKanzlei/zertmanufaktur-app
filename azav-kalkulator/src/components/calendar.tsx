'use client'

import { useState } from 'react'

interface CalendarEvent {
  id: string
  title: string
  time: string
  date: string
}

interface CalendarProps {
  events?: CalendarEvent[]
}

export default function Calendar({ events = [] }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  // Generiere alle Tage des aktuellen Monats
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const firstDayOfWeek = firstDay.getDay()
    
    const days = []
    
    // Füge leere Tage vom vorherigen Monat hinzu
    for (let i = 0; i < firstDayOfWeek; i++) {
      const prevMonthLastDay = new Date(year, month, 0).getDate()
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - firstDayOfWeek + i + 1),
        isCurrentMonth: false,
        isToday: false
      })
    }
    
    // Füge Tage des aktuellen Monats hinzu
    const today = new Date()
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(year, month, i)
      days.push({
        date: dayDate,
        isCurrentMonth: true,
        isToday: dayDate.toDateString() === today.toDateString()
      })
    }
    
    // Füge Tage vom nächsten Monat hinzu, um 6 Reihen zu füllen
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        isToday: false
      })
    }
    
    return days
  }
  
  const days = getDaysInMonth(currentDate)
  
  const getEventsForDay = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate.toDateString() === date.toDateString()
    })
  }
  
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })
  }
  
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }
  
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }
  
  const goToToday = () => {
    setCurrentDate(new Date())
  }

  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
        <h1 className="text-base font-semibold text-gray-900">
          <time dateTime={currentDate.toISOString().slice(0, 7)}>
            {formatMonthYear(currentDate)}
          </time>
        </h1>
        <div className="flex items-center">
          <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
            <button 
              type="button" 
              className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
              onClick={goToPreviousMonth}
            >
              <span className="sr-only">Vorheriger Monat</span>
              <svg viewBox="0 0 20 20" fill="currentColor" className="size-5">
                <path d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" fillRule="evenodd" />
              </svg>
            </button>
            <button 
              type="button" 
              className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
              onClick={goToToday}
            >
              Heute
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden"></span>
            <button 
              type="button" 
              className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
              onClick={goToNextMonth}
            >
              <span className="sr-only">Nächster Monat</span>
              <svg viewBox="0 0 20 20" fill="currentColor" className="size-5">
                <path d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="hidden md:ml-4 md:flex md:items-center">
            <div className="relative">
              <button type="button" className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
                Monatsansicht
                <svg viewBox="0 0 20 20" fill="currentColor" className="-mr-1 size-5 text-gray-400">
                  <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="ml-6 h-6 w-px bg-gray-300"></div>
            <button type="button" className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
              Termin hinzufügen
            </button>
          </div>
        </div>
      </header>
      
      <div className="shadow-sm ring-1 ring-black/5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs/6 font-semibold text-gray-700 lg:flex-none">
          <div className="flex justify-center bg-white py-3">
            <span>M</span>
            <span className="sr-only sm:not-sr-only">o</span>
          </div>
          <div className="flex justify-center bg-white py-3">
            <span>D</span>
            <span className="sr-only sm:not-sr-only">i</span>
          </div>
          <div className="flex justify-center bg-white py-3">
            <span>M</span>
            <span className="sr-only sm:not-sr-only">i</span>
          </div>
          <div className="flex justify-center bg-white py-3">
            <span>D</span>
            <span className="sr-only sm:not-sr-only">o</span>
          </div>
          <div className="flex justify-center bg-white py-3">
            <span>F</span>
            <span className="sr-only sm:not-sr-only">r</span>
          </div>
          <div className="flex justify-center bg-white py-3">
            <span>S</span>
            <span className="sr-only sm:not-sr-only">a</span>
          </div>
          <div className="flex justify-center bg-white py-3">
            <span>S</span>
            <span className="sr-only sm:not-sr-only">o</span>
          </div>
        </div>
        
        <div className="flex bg-gray-200 text-xs/6 text-gray-700 lg:flex-auto">
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            {days.map((day, index) => {
              const dayEvents = getEventsForDay(day.date)
              return (
                <div 
                  key={index}
                  className={`relative min-h-[120px] px-4 py-3 ${
                    day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                  } ${day.isToday ? 'bg-indigo-50' : ''}`}
                >
                  <time 
                    dateTime={day.date.toISOString().slice(0, 10)}
                    className={`text-base font-medium ${
                      day.isCurrentMonth ? 'text-gray-900' : 'text-gray-500'
                    } ${
                      day.isToday ? 'flex size-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white' : ''
                    }`}
                  >
                    {day.date.getDate()}
                  </time>
                  {dayEvents.length > 0 && (
                    <ol className="mt-3 space-y-1">
                      {dayEvents.slice(0, 3).map((event) => (
                        <li key={event.id}>
                          <a href="#" className="group flex items-center rounded px-2 py-1 hover:bg-gray-100">
                            <p className="flex-auto truncate text-sm font-medium text-gray-900 group-hover:text-indigo-600">
                              {event.title}
                            </p>
                            <time 
                              dateTime={event.time} 
                              className="ml-2 hidden flex-none text-xs text-gray-500 group-hover:text-indigo-600 xl:block"
                            >
                              {event.time}
                            </time>
                          </a>
                        </li>
                      ))}
                      {dayEvents.length > 3 && (
                        <li className="text-xs text-gray-500 px-2">
                          +{dayEvents.length - 3} weitere
                        </li>
                      )}
                    </ol>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
} 