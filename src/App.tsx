import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PackageList from "./pages/PackageList";
import Payment from "./pages/Payment";
import Layout from "./components/Layout";
import RequireAuth from "./utils/RequireAuth";
import Success from "./pages/Success";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<RequireAuth />}>
        <Route element={<Layout />}>
          <Route path="/packages" element={<PackageList />} />
          <Route path="/cart" element={<Payment />} />
          <Route path="/success" element={<Success />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
