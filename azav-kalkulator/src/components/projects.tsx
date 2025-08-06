interface Project {
  id: string
  name: string
  status: 'active' | 'completed' | 'pending'
  budget: string
  icon?: string
}

interface ProjectsProps {
  projects: Project[]
}

export default function Projects({ projects }: ProjectsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-50 text-green-700 ring-green-600/20'
      case 'completed':
        return 'bg-blue-50 text-blue-700 ring-blue-600/20'
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20'
      default:
        return 'bg-gray-50 text-gray-700 ring-gray-600/20'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktiv'
      case 'completed':
        return 'Abgeschlossen'
      case 'pending':
        return 'Ausstehend'
      default:
        return 'Unbekannt'
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">Aktuelle Projekte</h2>
          <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
            Alle anzeigen
          </a>
        </div>
        <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
          {projects.map((project) => (
            <li key={project.id} className="overflow-hidden rounded-xl border border-gray-200">
              <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                <div className="size-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6 text-gray-600">
                    <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="text-sm font-medium text-gray-900">{project.name}</div>
              </div>
              <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm">
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500">Status</dt>
                  <dd className="text-gray-700">
                    <span className={`rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusColor(project.status)}`}>
                      {getStatusText(project.status)}
                    </span>
                  </dd>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500">Budget</dt>
                  <dd className="flex items-start gap-x-2">
                    <div className="font-medium text-gray-900">{project.budget}</div>
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
} 