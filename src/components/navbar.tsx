'use client'
import appwriteAuthService from '@/appwrite/auth'
import useAuthStore from '@/context/authStore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useAuthStore()
  const router = useRouter()

  const logout = async () => {
    try {
      await appwriteAuthService.logout()
      setIsLoggedIn(false)
      router.push('/')
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <div className='navbar bg-base-100'>
      <div className='flex-1'>
        <a className='btn btn-ghost text-xl'>SubMate</a>
      </div>
      <div className='flex-none'>
        {isLoggedIn ? (
          <button className='btn btn-square btn-ghost' onClick={logout}>
            Logout
          </button>
        ) : (
          <button className='btn btn-square btn-ghost'>
            <Link href='/auth/login'>Login</Link>
          </button>
        )}
      </div>
    </div>
  )
}
