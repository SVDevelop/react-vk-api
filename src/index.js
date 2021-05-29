import { StrictMode } from "react";
import ReactDOM from "react-dom";

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
