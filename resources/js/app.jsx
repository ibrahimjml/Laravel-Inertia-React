import './bootstrap';
import '../css/app.css';
import './lib/fontawesome';
import './i18next';
import 'react-toastify/dist/ReactToastify.css';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import Layout from '@/Layouts/Layout';
import { SetThemeOnLoad } from './theme';
import { setZiggyLocale, route as routeWithLocale } from './ziggylocale';
import { setLocale } from './i18next';

createInertiaApp({
  title: title => title ? `${title} - Laravel+Inertia` :'Laravel+Inertia',
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    let page = pages[`./Pages/${name}.jsx`];
    page.default.layout = page.default.layout || ((page)=><Layout children={page}/>);
    return page;
  },
  setup({ el, App, props }) {
    const locale = props.initialPage.props.locale || 'en';
     setZiggyLocale(locale);
     setLocale(locale);

    createRoot(el).render(<App {...props} route={routeWithLocale}/>)
  },
  
  progress: {
    
    delay: 200,
    color: '#fff',
    includeCSS: true,
    showSpinner: true,
  },
})
SetThemeOnLoad()