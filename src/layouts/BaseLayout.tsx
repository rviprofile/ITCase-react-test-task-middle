import { JSX } from "react";
import { Header } from "../components/Header/Header";

/** Базовый лэйоут приложения */
export const BaseLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
