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
    <main className='flex flex-col justify-center items-center gap-8'>
      <SubscriptionForm />
      <SubscriptionList />
    </main>
  )
}
