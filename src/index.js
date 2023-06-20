import React from "react";
import {createRoot} from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import store from "./store/store";

const rootElement = document.getElementById('root');

const renderApp = ()=>{
  createRoot(rootElement).render(
<Provider store={store}>
    <App />
  </Provider>,
  )
}


renderApp()