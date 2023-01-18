import React from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import "./App.css";
import { store } from "./Utils/redux/store";
import { router } from "./Utils/router";

export function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}
