'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Tab, TabList, Tabs } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [tabIndex, setTabIndex] = useState(0)

  const tabsMap = ['/mandate', '/account', '/board']

  function handleChange(index: number) {
    setTabIndex(index)
  }

  useEffect(() => {
    let path = window.location.pathname
    let index = tabsMap.indexOf(path)
    setTabIndex(index)
  }, [])


  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Tabs index={tabIndex} onChange={handleChange}>
            <TabList>
              <Tab><Link href={'/mandate'}>分发票权</Link></Tab>
              <Tab><Link href={'/account'}>账户信息</Link></Tab>
              <Tab><Link href={'/board'}>投票看板</Link></Tab>
            </TabList>
          </Tabs>
          {children}
        </Providers>
      </body>
    </html>
  )
}
