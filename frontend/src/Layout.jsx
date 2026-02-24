import React from "react";
import Header from "./Components/header";
import Footer from "./Components/footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;

