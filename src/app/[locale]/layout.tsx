import { notFound } from 'next/navigation'

import { isValidLocale } from '@/shared/config'

type LocaleLayoutProps = {
  children: React.ReactNode
  params: Promise<{
    locale: string
  }>
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  return <>{children}</>
}
