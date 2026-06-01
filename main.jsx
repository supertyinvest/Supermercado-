import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './supermercado.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
