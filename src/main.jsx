import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { MainStore } from './componants/reduxwork/MainStore.jsx'
import { Provider } from 'react-redux'
import { AlertProvider } from "./custom/CustomAlert.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={MainStore}>
      <AlertProvider>
      <App />
      </AlertProvider>
    </Provider>
    </BrowserRouter>
  </StrictMode>
)
