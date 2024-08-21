import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "src/css/App.css";

import Home from "./pages/Home";
import Question from "./pages/Question";

const BrowserRouter = createBrowserRouter([
    {
        path: "/",
        Component: Home,
    },
    {
        path: "/q/:id",
        Component: Question,
    }
]);



const App: React.FC = () => {
    return (
        <RouterProvider router={BrowserRouter} />
    );
}


export default App;
