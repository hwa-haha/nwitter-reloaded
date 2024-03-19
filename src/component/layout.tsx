import React from "react";
import { Outlet } from "react-router";

export default function Layout(){
    return (
        <>
            <h2>layout</h2>
            <Outlet/>
        </>
    );
}