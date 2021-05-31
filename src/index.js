import { StrictMode } from "react";
import ReactDOM from "react-dom";

import './FontAwesome'
import "./styles.css";

import App from "./App";
import { VKProvider } from "./VK";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <VKProvider>
      <App />
    </VKProvider>
  </StrictMode>,
  rootElement
);
