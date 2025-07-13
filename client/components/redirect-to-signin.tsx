'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function RedirectToSignIn() {
  const router = useRouter()

  useEffect(() => {
    router.push('/sign-in')
  }, [router])

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground">Redirecting to sign in...</p>
      </div>
    </div>
  )
}
