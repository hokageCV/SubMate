import subscriptionService from '@/appwrite/subscriptonDb'
import { readableDate } from '@/utils/date'
import { Models } from 'appwrite'
import { useEffect, useState } from 'react'

export default function SubscriptionList() {
  const [subscriptionList, setSubscriptionList] =
    useState<Models.DocumentList<Models.Document> | null>(null)

  const fetchSubscriptionList = async () => {
    const subscriptionList = await subscriptionService.getSubscriptionList()
    setSubscriptionList(subscriptionList)
  }

  useEffect(() => {
    fetchSubscriptionList()
  }, [])

  return (
    <section className='mb-10'>
      {subscriptionList !== null ? (
        <div>
          <h2 className='text-2xl text-center'>Your Subscriptions</h2>
          <div className='flex flex-col gap-4'>
            {subscriptionList.documents.map((subscription) => (
              <div className='card w-72 md:w-96 bg-primary text-primary-content'>
                <div className='card-body'>
                  <h3 className='card-title'>{subscription.title}</h3>
                  <p>Start Date: {readableDate(subscription.start_date, 'dd-LLL-yyyy')}</p>
                  <p>End Date: {readableDate(subscription.end_date, 'dd-LLL-yyyy')}</p>
                  <p>
                    Recurring Frequency: {subscription.recurring_frequency}
                    {subscription.recurring_frequency === 'custom' ? (
                      <span> ({subscription.custom_recurring_frequency} days)</span>
                    ) : null}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}
