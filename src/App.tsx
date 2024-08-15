import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "src/css/App.css";

import HelloWorld from "components/HelloWorld";


const BrowserRouter = createBrowserRouter([
    {
        path: "/",
        element: <HelloWorld />,
    }
]);



const App: React.FC = () => {
    return (
        <RouterProvider router={BrowserRouter} />
    );
}


export default App;
