import React, { useEffect, useState } from "react";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Layout from "./component/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import {createGlobalStyle, styled} from "styled-components";
import reset from "styled-reset";
import LoadingScreen from "./component/loading-screen";
import { auth } from "./routes/firebase";
import ProtectedRouter from "./component/protected-router";

const router = createBrowserRouter([
  {
    path:"/",
    element:<ProtectedRouter><Layout/></ProtectedRouter>,
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

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setLoading(false); 
  };
  useEffect (() => {
    init();
  }, []);
  return (
  <>
    <Wrapper>
      <GlobalStyles/>
      {isLoading ?<LoadingScreen/> : <RouterProvider router={router}/>}
    </Wrapper>
  </>
  );
}

export default App
