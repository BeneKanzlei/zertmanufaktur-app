interface StatItem {
  label: string
  value: string | number
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
}

interface StatsProps {
  stats: StatItem[]
}

export default function Stats({ stats }: StatsProps) {
  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600'
      case 'negative':
        return 'text-red-600'
      default:
        return 'text-gray-700'
    }
  }

  return (
    <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
      <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0">
        {stats.map((stat, index) => (
          <div 
            key={stat.label}
            className={`flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8 ${
              index > 0 ? 'sm:border-l' : ''
            } ${index > 0 && index % 2 === 1 ? 'lg:border-l' : ''}`}
          >
            <dt className="text-sm font-medium text-gray-500">{stat.label}</dt>
            <dd className={`text-xs font-medium ${getChangeColor(stat.changeType)}`}>
              {stat.change}
            </dd>
            <dd className="w-full flex-none text-3xl font-medium tracking-tight text-gray-900">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
} 