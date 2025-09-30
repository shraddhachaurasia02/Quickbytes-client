import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "easy-peasy";
import { store } from "./model/store.ts";
import { ModalProvier } from "./context/ModalContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <BrowserRouter>
        <ModalProvier>
          <App />
        </ModalProvier>
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>,
);
