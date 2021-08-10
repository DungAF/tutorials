import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import 'bootstrap/dist/js/bootstrap.js'

import App from './App'

import 'bootstrap/dist/css/bootstrap.min.css'
// import 'flag-icon-css/css/flag-icon.min.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import 'bootstrap/dist/js/bootstrap.js'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs : ['en', 'fr'],
    fallbackLng: "en",
    detection: {
      order: ['cookie','htmlTag',  'localStorage',  'path', 'subdomain'],
      caches : ['cookie'],
    },
    backend :{
      loadPath: 'locales/{{lng}}/translation.json',
    },
    react : { useSuspense : false },
  });

const loadingMarkup = (
  <div className="py-4 text-center">
    <h3>Loading..</h3>
  </div>
)

ReactDOM.render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <App />
      {/* <p>hello</p> */}
    </React.StrictMode>
  </Suspense>,
  document.getElementById('root')
)