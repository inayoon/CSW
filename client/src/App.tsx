import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";

import DiyKit from "./pages/DiyKit";
import Rabbit from "./pages/Rabbit";
import Bear from "./pages/Bear";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route
          element={
            <>
              <Header />
              <Outlet />
            </>
          }
        >
          <Route path="/" element={<Home />}></Route>
          <Route path="/sign-in" element={<Signin />}></Route>
          <Route path="/rabbit" element={<Rabbit />}></Route>
          <Route path="/bear" element={<Bear />}></Route>
          <Route path="/diy-kit" element={<DiyKit />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
