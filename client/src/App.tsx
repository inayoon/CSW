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
import { useSelector } from "react-redux";
import { IRootState } from "./redux/store";
import NotAuthRoutes from "./components/NotAuthRoutes";
import Favorite from "./pages/Favorite";
import NewProduct from "./pages/NewProduct";
import { ProtectedAdmin, ProtectedRoutes } from "./components/ProtectedRoutes";
import ProductDetail from "./pages/ProductDetail";

function App() {
  const isAuth = useSelector<IRootState, boolean>(
    (state) => state.user?.isAuth
  );
  const isAdmin = useSelector<IRootState, boolean>(
    (state) => state.user.currentUser?.isAdmin
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
              <Header isAuth={isAuth} isAdmin={isAdmin} />
              <Outlet />
              <FooterCom />
            </>
          }
        >
          <Route path="/" element={<Home />}></Route>
          <Route path="/product/rabbit" element={<Rabbit />}></Route>
          <Route path="/product/bear" element={<Bear />}></Route>
          <Route
            path="/product/:category/:id"
            element={<ProductDetail />}
          ></Route>
          <Route path="/product/diy-kit" element={<DiyKit />}></Route>
          <Route element={<ProtectedAdmin isAdmin={isAdmin} />}>
            <Route path="/product/new" element={<NewProduct />}></Route>
          </Route>

          <Route element={<ProtectedRoutes isAuth={isAuth} />}>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/favorite" element={<Favorite />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
