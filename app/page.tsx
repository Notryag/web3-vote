'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import React from 'react'

export default function Home({children}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    router.push('/mandate')
  },[])
  return (
    <main className="">
      {children}
    </main>
  )
}
