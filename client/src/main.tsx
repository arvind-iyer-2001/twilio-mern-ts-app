import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import TwilioVideoProvider from '@Contexts/TwilioVideoContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <TwilioVideoProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TwilioVideoProvider>,
)
