import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
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
      <Route path="product">
        <Route path=":id" element={<ProductPage />} />
        <Route index element={<Navigate to="/" replace />} />
      </Route>
      <Route path={"cart"} element={<CartPage />} />
    </Route>
  )
);
