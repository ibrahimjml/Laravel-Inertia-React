import { useEffect } from 'react'
import { usePage } from '@inertiajs/react'

export default function LocaleSync() {
  const { locale } = usePage().props

  useEffect(() => {
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
  }, [locale])

  return null
}
