import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import GlobalStyle from './styles.ts'

const toastoption = {
  duration: 3000,
  baclgroundColor:'red',
  style: {
    padding: '12px 10px',
    boxShadow:
      '0 1px 10px rgb(0 0 0 / 30%)',
  },
  success: {
    style: {
      border:
        '2px solid #61d345',
    },
  },
  error: {
    style: {
      border:
        '2px solid #ff4b4b',
    },
  },
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalStyle/>
      <App />
      <Toaster position="top-center" reverseOrder={false} toastOptions={toastoption} />
    </BrowserRouter>
  </StrictMode>,
)
