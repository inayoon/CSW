import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import AllProudcts from "./pages/AllProudcts";
import DiyKit from "./pages/DiyKit";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/sign-in" element={<Signin />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/all" element={<AllProudcts />}></Route>
        <Route path="/diy-kit" element={<DiyKit />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
