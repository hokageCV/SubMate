'use client'
import SubscriptionForm from '@/components/SubscriptionForm'
import SubscriptionList from '@/components/SubscriptionList'
import useAuthStore from '@/context/authStore'
import { useRouter } from 'next/navigation'

export default function page() {
  const router = useRouter()

  const { isLoggedIn } = useAuthStore()
  if (!isLoggedIn) router.push('/')

  return (
    <main>
      <h1>Manage all your subscriptions</h1>
      <p>display subscriptions list here</p>
      <section>
        <SubscriptionForm />
      </section>
      <section>
        <SubscriptionList />
      </section>
    </main>
  )
}
