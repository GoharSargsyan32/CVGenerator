import { Outlet } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { ROUTE_CONSTANTS } from "./core/utils/constants";



const Layout = () => {
    return (
        <main>
            <Link to={ROUTE_CONSTANTS.LOGIN}><Button type="primary">Sign in</Button></Link>
            <Outlet/>
        </main>
    )
}

export default Layout;