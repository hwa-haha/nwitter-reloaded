import React, { useEffect, useState } from "react";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Layout from "./component/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";
import LoadingScreen from "./component/loading-screen";

const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"Profile",
        element:<Profile/>,
      }
    ]
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/create-account", 
    element:<CreateAccount/>
  }  
])

const GlobalStyles = createGlobalStyle`
  ${reset};
* {
  box-sizing: border-box;
}
body {
background-color: black;
color: white;
font-family: 'system-ui', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
`;

function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    setTimeout(() => setLoading(false), 2000); 
  };
  useEffect (() => {
    init();
  }, []);
  return (
  <>
    <GlobalStyles/>
    {isLoading ?<LoadingScreen/> : <RouterProvider router={router}/>}
    
  </>
  );
}

export default App
