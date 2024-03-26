import subscriptionService from '@/appwrite/subscriptonDb'
import { Models } from 'appwrite'
import { useEffect, useState } from 'react'

export default function SubscriptionList() {
  const [subscriptionList, setSubscriptionList] = useState<Models.DocumentList<Models.Document> | null>(null)

  const fetchSubscriptionList = async () => {
    const subscriptionList = await subscriptionService.getSubscriptionList()
    setSubscriptionList(subscriptionList)
  }

  useEffect(() => {
    fetchSubscriptionList()
  },[])

  return (
    <>
      {subscriptionList && subscriptionList.documents.map((subscription) => (
        <p key={subscription.$id}>{subscription.title}</p>
      ))}
    </>
  )
}
