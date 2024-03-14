import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/Signin";
import Header from "./components/Header";
import FooterCom from "./components/Footer";
import DiyKit from "./pages/DiyKit";
import Rabbit from "./pages/Rabbit";
import Bear from "./pages/Bear";
import Cart from "./pages/Cart";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "./redux/store";
import NotAuthRoutes from "./components/NotAuthRoutes";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector<IRootState, boolean>(
    (state) => state.user?.isAuth
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NotAuthRoutes isAuth={isAuth} />}>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
        </Route>

        <Route
          element={
            <>
              <Header isAuth={isAuth} />
              <Outlet />
              <FooterCom />
            </>
          }
        >
          <Route path="/" element={<Home />}></Route>
          <Route path="/rabbit" element={<Rabbit />}></Route>
          <Route path="/bear" element={<Bear />}></Route>
          <Route path="/diy-kit" element={<DiyKit />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
