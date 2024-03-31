import {createBrowserRouter, Navigate} from "react-router-dom";
import {ROUTES} from "../constants/rotues.js";
import {ProductList} from "../pages/productList/ProductList.jsx";
import {ProductDetail} from "../pages/productDetail/ProductDetail.jsx";

export const router = createBrowserRouter([
    {
        path: ROUTES.PRODUCT_LIST,
        element: <ProductList />
    },
    {
        path: ROUTES.PRODUCT_DETAIL,
        element: <ProductDetail />,
        children: [
            {
                path: ':productId',
                element: <ProductDetail />,
            },
        ],
    },
    {
        path: '/',
        element: <Navigate to={ROUTES.PRODUCT_LIST} />
    },
])