import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Packages from "./pages/Packages";
import Cart from "./pages/Cart";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<RequireAuth />}>
        <Route element={<Layout />}>
          <Route path="/packages" element={<Packages />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
