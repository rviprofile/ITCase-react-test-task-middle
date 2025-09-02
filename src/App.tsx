import React from "react";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";
import { BaseLayout } from "./layouts/BaseLayout";
import { CartProvider } from "./layouts/CartContext";

const queryClient = new QueryClient();

const config = defineConfig({
  theme: {
    tokens: {
      colors: {},
    },
  },
});

const system = createSystem(defaultConfig, config);

export default function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={system}>
          <CartProvider>
            <BaseLayout>
              <Outlet />
            </BaseLayout>
          </CartProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </div>
  );
}
