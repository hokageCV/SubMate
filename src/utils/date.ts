import { DateTime } from 'luxon'

export function handleRegularEndDate(start_date: string, frequency: string): string {
  const startDate = new Date(start_date)
  let endDate = new Date(startDate)

  switch (frequency) {
    case 'daily':
      endDate.setDate(startDate.getDate() + 1)
      break
    case 'weekly':
      endDate.setDate(startDate.getDate() + 7)
      break
    case 'monthly':
      endDate.setMonth(startDate.getMonth() + 1)
      break
    case 'yearly':
      endDate.setFullYear(startDate.getFullYear() + 1)
      break
    default:
      throw new Error('Invalid recurring frequency')
  }

  return endDate.toISOString()
}

export function handleCustomEndDate(start_date: string, custom_frequency: number): string {
  const startDate = new Date(start_date)
  const endDate = new Date(startDate.getTime() + custom_frequency * 24 * 60 * 60 * 1000)
  return endDate.toISOString()
}

export function readableDate(dateStr: string, format: string): string {
  const date = new Date(dateStr)
  return DateTime.fromJSDate(date).toFormat(format || 'dd LLLL yyyy')
}
