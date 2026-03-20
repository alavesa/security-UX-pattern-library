import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error("Root element with id 'root' not found. Ensure index.html contains <div id=\"root\"></div>.")
}
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
