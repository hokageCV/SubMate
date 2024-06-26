import { FormCreateSubscription } from '@/app/types'
import subscriptionService from '@/appwrite/subscriptonDb'
import { FormEvent, useState } from 'react'

const initialFormData = {
  title: '',
  start_date: '',
  email_notification: true,
  recurring_frequency: 'monthly',
  custom_recurring_frequency: 0,
}

export default function SubscriptionForm() {
  const [formData, setFormData] = useState<FormCreateSubscription>(initialFormData)
  const [loading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await subscriptionService.createSubscription(formData)
    setIsLoading(false)
    setFormData(initialFormData)
  }

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target

    setFormData((prevData) => ({ ...prevData, [name]: type === 'checkbox' ? checked : value }))
  }

  return (
    <section>
      <form onSubmit={handleSubmit} className='flex flex-col items-center gap-4'>
        <label className='form-control w-full max-w-xs'>
          <div className='label'>
            <span className='label-text'>Title*</span>
          </div>
          <input
            name='title'
            type='text'
            className='input input-bordered w-full max-w-xs'
            required
            onChange={handleChange}
            value={formData.title}
          />
        </label>

        <label className='form-control w-full max-w-xs'>
          <div className='label'>
            <span className='label-text'>Start Date*</span>
          </div>
          <input
            name='start_date'
            type='date'
            className='input input-bordered w-full max-w-xs'
            required
            onChange={handleChange}
            value={formData.start_date}
          />
        </label>

        <label className='form-control w-full max-w-xs'>
          <div className='label'>
            <span className='label-text'>Recurring Frequency*</span>
          </div>
          <select
            name='recurring_frequency'
            className='select select-bordered'
            onChange={handleChange}
            value={formData.recurring_frequency}
          >
            <option value='daily'>Daily</option>
            <option value='weekly'>Weekly</option>
            <option value='monthly'>Monthly</option>
            <option value='yearly'>Yearly</option>
            <option value='custom'>Custom</option>
          </select>
        </label>

        {formData.recurring_frequency === 'custom' ? (
          <label className='form-control w-full max-w-xs'>
            <div className='label'>
              <span className='label-text'>Custom Recurring Frequency (in days)</span>
            </div>
            <input
              name='custom_recurring_frequency'
              type='number'
              className='input input-bordered w-full max-w-xs'
              onChange={handleChange}
              value={formData.custom_recurring_frequency}
            />
          </label>
        ) : null}

        <div className='form-control w-full max-w-xs'>
          <label className='label cursor-pointer'>
            <span className='label-text'>Email Notifications</span>
            <input
              name='email_notification'
              type='checkbox'
              className='toggle'
              onChange={handleChange}
              checked={formData.email_notification}
            />
          </label>
        </div>
        <button type='submit' className='btn w-fit'>
          Submit
        </button>
        {loading && <span className='loading loading-spinner'></span>}
      </form>
    </section>
  )
}
