'use client'

import Breadcrumb from './breadcrumb'

interface HeaderProps {
  onSidebarToggle: () => void
  breadcrumbItems?: Array<{ label: string; href?: string; current?: boolean }>
}

export default function Header({ onSidebarToggle, breadcrumbItems }: HeaderProps) {
  return (
    <div className="sticky top-0 z-40 flex flex-col border-b border-gray-200 bg-white">
      {/* Breadcrumbs */}
      {breadcrumbItems && breadcrumbItems.length > 0 && (
        <Breadcrumb items={breadcrumbItems} />
      )}
      
      {/* Main Header */}
      <div className="flex h-16 shrink-0 items-center gap-x-4 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={onSidebarToggle}
        >
          <span className="sr-only">Open sidebar</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="h-6 w-px bg-gray-200 lg:hidden"></div>

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <form action="#" method="GET" className="grid flex-1 grid-cols-1">
            <input
              type="search"
              name="search"
              placeholder="Suchen..."
              aria-label="Search"
              className="col-start-1 row-start-1 block size-full bg-white pl-8 text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm"
            />
            <svg viewBox="0 0 20 20" fill="currentColor" className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400">
              <path d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" fillRule="evenodd" />
            </svg>
          </form>
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
              <span className="sr-only">View notifications</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
                <path d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"></div>

            <div className="relative">
              <button className="relative flex items-center">
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  className="size-8 rounded-full bg-gray-50"
                />
                <span className="hidden lg:flex lg:items-center">
                  <span aria-hidden="true" className="ml-4 text-sm font-semibold text-gray-900">Benutzer</span>
                  <svg viewBox="0 0 20 20" fill="currentColor" className="ml-2 size-5 text-gray-400">
                    <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 