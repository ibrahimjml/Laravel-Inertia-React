import { route as ziggyRoute } from 'ziggy-js';

let currentLocale =  'en';

export function setZiggyLocale(locale) {
    currentLocale = locale;
}

export function route(name, params = {}, absolute = true) {
     return ziggyRoute(name, {
        locale: currentLocale,
        ...params,
    }, absolute);
}
