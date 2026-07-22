import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Navbar from "../components/Navbar"


const RootLayout = () => {
  return (
    <div className="main-container-app">
      <Header />
      <Navbar />

      <main className="page-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};


export default RootLayout
