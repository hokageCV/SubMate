export type Subscription = {
  user_id: string
  title: string
  start_date: string
  end_date?: string
  email_notification?: boolean
  is_active?: boolean
  recurring_frequency: string
  custom_recurring_frequency: number
}

export type FormCreateSubscription = Omit<Subscription, 'user_id' | 'end_date' | 'is_active'>
