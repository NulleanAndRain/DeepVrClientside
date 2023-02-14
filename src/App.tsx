import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { store } from "./Utils/redux/store";
import { router } from "./Utils/router";

import "./App.css";

export function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}
