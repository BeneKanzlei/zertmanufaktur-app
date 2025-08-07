interface ActivityItem {
  id: string
  amount: string
  status: 'approved' | 'pending' | 'rejected'
  taxes: string
  project: string
  projectDetails: string
  calculationId: string
  date: string
}

interface ActivityTableProps {
  activities: ActivityItem[]
}

export default function ActivityTable({ activities }: ActivityTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-50 text-green-700 ring-green-600/20'
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20'
      case 'rejected':
        return 'bg-red-50 text-red-700 ring-red-600/20'
      default:
        return 'bg-gray-50 text-gray-700 ring-gray-600/20'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Genehmigt'
      case 'pending':
        return 'Ausstehend'
      case 'rejected':
        return 'Abgelehnt'
      default:
        return 'Unbekannt'
    }
  }

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-2xl text-base font-semibold text-gray-900 lg:mx-0 lg:max-w-none">
          Letzte Aktivitäten
        </h2>
      </div>
      <div className="mt-6 overflow-hidden border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <table className="w-full text-left">
              <thead className="sr-only">
                <tr>
                  <th>Betrag</th>
                  <th className="hidden sm:table-cell">Projekt</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.id}>
                    <td className="relative py-5 pr-6">
                      <div className="flex gap-x-6">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="hidden h-6 w-5 flex-none text-gray-400 sm:block">
                          <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-.75-4.75a.75.75 0 0 0 1.5 0V8.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0L6.2 9.74a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z" clipRule="evenodd" fillRule="evenodd" />
                        </svg>
                        <div className="flex-auto">
                          <div className="flex items-start gap-x-3">
                            <div className="text-sm font-medium text-gray-900">{activity.amount}</div>
                            <div className={`rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusColor(activity.status)}`}>
                              {getStatusText(activity.status)}
                            </div>
                          </div>
                          <div className="mt-1 text-xs text-gray-500">{activity.taxes} Steuern</div>
                        </div>
                      </div>
                      <div className="absolute right-full bottom-0 h-px w-screen bg-gray-100"></div>
                      <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100"></div>
                    </td>
                    <td className="hidden py-5 pr-6 sm:table-cell">
                      <div className="text-sm text-gray-900">{activity.project}</div>
                      <div className="mt-1 text-xs text-gray-500">{activity.projectDetails}</div>
                    </td>
                    <td className="py-5 text-right">
                      <div className="flex justify-end">
                        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                          Anzeigen<span className="hidden sm:inline"> Details</span>
                        </a>
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        Kalkulation <span className="text-gray-900">{activity.calculationId}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
} 