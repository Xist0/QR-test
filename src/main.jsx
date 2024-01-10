import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Test from './components/test.jsx'

<script src="./App.jsx"></script>
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import QRCode from "./components/QRCode.jsx";
import AddUsers from "./components/addUsers.jsx";


const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: "/test",
    element: <Test/>
  },
  {
    path: "/QR",
    element: <QRCode/>
  },
  {
    path: "/add",
    element: <AddUsers/>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={routes} />
)
