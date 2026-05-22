import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";

function Layout() {

    return (

        <div className="bg-[#F6F7F8] min-h-screen">

            <Navbar />

            <Outlet />

        </div>
    );
}

export default Layout;