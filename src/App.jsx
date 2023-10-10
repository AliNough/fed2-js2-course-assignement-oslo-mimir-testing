import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/navbar";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>
      <Home />
      <footer>
        <small>Created with ❤️ by You</small>
      </footer>
    </>
  );
}

export default App;
