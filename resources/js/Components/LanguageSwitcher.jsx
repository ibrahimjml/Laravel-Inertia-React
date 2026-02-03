import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { router, usePage } from '@inertiajs/react';
import { route, setZiggyLocale  } from '@/ziggylocale';
import { useMessagesT } from '@/i18n/helpers/useMessagesT';
import { setLocale } from '../i18next';


export default function LanguageSwitcher() {

  const { i18n } = useTranslation();
  const m = useMessagesT();
  const { locale, languages } = usePage().props
  const [showmodel,setshowmodel] = useState(false);
  const currentFlag = languages?.[locale]?.flag

const changeLanguage = (lang) => {
  router.post(route('locale.switch'), { locale: lang }, {
    onSuccess: () => {
      i18n.changeLanguage(lang);
      localStorage.setItem('i18nextLng', lang);
      setZiggyLocale(lang);
      setLocale(lang);
      setshowmodel(false);
      router.reload({ only: ['locale'] });
    },
    preserveScroll: true,
  })
}
  const togglemodel = () => setshowmodel(!showmodel);
  return (
       <div className='relative flex gap-1 items-center'>
        <span onClick={togglemodel} className='w-6 h-6 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center cursor-pointer'>
            <img
              className='w-full h-full object-cover'
              src={`https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/${currentFlag}.svg`}
            />
        </span>
        {showmodel &&
        <div className="absolute z-50 top-16 lg:-right-4 -right-10 border dark:border-slate-200 bg-white dark:bg-slate-800 rounded-lg overflow-hidden w-40">
        {Object.entries(languages).map(([code, { flag }]) => (
          <div key={code} onClick={() => changeLanguage(code)} className='flex flex-row-reverse items-center justify-between dark:hover:bg-slate-700 hover:bg-gray-200/20 px-4'>
          <button
            key={code}
            className={`block w-full px-6 py-3 ${locale === code ? 'font-bold text-green-500 dark:text-blue-500' : 'dark:text-white text-black'}`}
          >
            {m(`lang.${code}`)}
          </button>
          <span className='w-8 h-6 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center'>
            <img
              src={`https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/${flag}.svg`}
            className='w-full h-full object-cover'
            />
            </span>
            </div>
        ))}
        </div>
        }
      </div>
  )
}
