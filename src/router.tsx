import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App";
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import { CartPage } from "./pages/CartPage/CartPage";
import { ProductPage } from "./pages/ItemPage/ItemPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="*" element={<App />}>
      <Route index element={<CatalogPage />} />
      <Route path={"product/:id"} element={<ProductPage />} />
      <Route path={"cart"} element={<CartPage />} />
    </Route>
  )
);
