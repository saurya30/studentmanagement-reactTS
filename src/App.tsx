import "./App.css";
import Card from "./components/Card";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="main-container-app">
      <Header />
      <Navbar />
      <Card />
      <Footer />
    </div>
  )
}

export default App
