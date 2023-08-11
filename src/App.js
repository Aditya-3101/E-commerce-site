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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route index element={<Home />} loader={HomeLoader} />
      <Route path="/lists" element={<ListsLayout />} loader={ListsLoader}>
        <Route path="/lists/:type" element={<Lists />}></Route>
      </Route>

      <Route
        path="/lists/:type/:id"
        index
        element={<DetailPage />}
        loader={MainLoader}
      />
      <Route path="/cart" element={<Cart />} />
      <Route path="/account" element={<Account />} />
      <Route element={<AuthLayout/>}>
      <Route path="/checkout" element={<Checkout />} />
      </Route>
      <Route path="*" element={<NoPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
