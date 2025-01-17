import {Route, Routes} from "react-router";
import {lazy} from "react";

const Dashboard = lazy(() => import("../pages/dashboard/dashboard.tsx"))
const PostDetail = lazy(() => import("../pages/products/product-detail.tsx"))
const AppRoutes = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Dashboard/>}></Route>
            <Route path={'/products/:id'} element={<PostDetail/>}></Route>
        </Routes>
    )
}

export default AppRoutes;