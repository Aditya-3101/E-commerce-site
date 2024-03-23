import "./style/App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { HomeLayout } from "./Layouts/HomeLayout";
import { AuthLayout } from "./Layouts/AuthLayout";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { Home, loader as HomeLoader } from "./components/Home/Home.js";
import { ListsLayout, loader as ListsLoader } from "./Layouts/ListsLayout";
import NoPage from "./components/NoPage";
import { Lists } from "./components/Lists";
import { DetailPage, loader as MainLoader } from "./components/DetailPage";
import { Cart } from "../src/components/Carts";
import { Account } from "./components/Account";
import { Checkout } from "./components/Checkout";
import { Login } from "./components/Login";
import { Signin } from "./components/Signin";
import { Orders } from "./components/Orders";
import { LoginLayout } from "./Layouts/LoginLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route
        index
        element={<Home />}
        loader={HomeLoader}
        errorElement={<h1>We got an Error!</h1>}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      <Route
        path="/lists"
        element={<ListsLayout />}
        loader={ListsLoader}
        errorElement={<NoPage/>}
      >
        <Route path="/lists/:type" element={<Lists />}></Route>
      </Route>

      <Route
        path="/lists/:type/:id"
        index
        element={<DetailPage />}
        loader={MainLoader}
        errorElement={<h1>We got an Error!</h1>}
      />
      <Route element={<LoginLayout />}>
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Account />} />
        <Route path="/orders" element={<Orders />} />
        <Route element={<AuthLayout />}>
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Route>
      <Route path="*" element={<NoPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
