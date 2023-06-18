import { createBrowserRouter} from "react-router-dom";
import { HomePage } from "./components/home/HomePage";
import  AllProductsPage  from "./components/all-products/AllProductsPage";
import OrderSuccessPage from "./components/order-success/OrderSuccessPage";
import CreateOrder from "./components/OrderCRUD/CreateOrder";
import App from "./App";
import  {PageNotFound}  from "./components/PageNotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/all-products",
        element: <AllProductsPage />,
      },
      {
        path: "/order-success",
        element: <OrderSuccessPage />,
      },
      {
        path: "/create-order/:productId",
        element: <CreateOrder />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);