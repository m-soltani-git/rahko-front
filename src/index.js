import "simplebar-react/dist/simplebar.min.css";

import ReactDOM from "react-dom/client";
import React, { Suspense } from "react";
import configureStore from "toolkits/redux";

import { SplashScreen } from "components";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";

const { store, persistor } = configureStore();

const Index = () => {
  return (
    <Suspense fallback={<SplashScreen />}>
      <HelmetProvider>
        <BrowserRouter>
          <ReduxProvider store={store}>
            <PersistGate persistor={persistor} loading={<SplashScreen />}>
              <App />
            </PersistGate>
          </ReduxProvider>
        </BrowserRouter>
      </HelmetProvider>
    </Suspense>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index />);

serviceWorker.unregister();
reportWebVitals();
