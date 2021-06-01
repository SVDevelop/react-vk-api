import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./FontAwesome";
import "./styles.css";

import App from "./App";
import { VKProvider } from "./VK";

const rootElement = document.getElementById("root");
ReactDOM.render(
	<StrictMode>
		<Router>
			<VKProvider>
				<App />
			</VKProvider>
		</Router>
	</StrictMode>,
	rootElement
);
