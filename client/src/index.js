import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import router from './routers/router'

import ContextProvider from './features/Context/ContextValues';

import {
  RouterProvider,
} from "react-router-dom";

import { SuccessToast } from "./components/Alerts/Toasts"

import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';

const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider store={store}>
    <React.StrictMode>
      <SuccessToast />
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </React.StrictMode>
  </AuthProvider>
);

reportWebVitals();
