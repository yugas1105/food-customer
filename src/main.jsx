import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AlertProvider } from "./custom/CustomAlert.jsx";
import { PersistGate } from "redux-persist/integration/react";
import MainStore from "./componants/reduxwork/MainStore.jsx";
import persistStore from "redux-persist/es/persistStore";

let persistor = persistStore(MainStore);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={MainStore}>
        <PersistGate loading={null} persistor={persistor}>
          <AlertProvider>
            <App />
          </AlertProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
