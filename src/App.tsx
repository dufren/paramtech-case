import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PackageList from "./pages/PackageList";
import Payment from "./pages/Payment";
import Layout from "./components/sections/Layout";
import RequireAuth from "./utils/RequireAuth";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";
import Error from "./pages/Error";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<RequireAuth />}>
        <Route element={<Layout />}>
          <Route path="packages" element={<PackageList />} />
          <Route path="cart">
            <Route index element={<Payment />} />
            <Route path="success" element={<Success />} />
            <Route path="error" element={<Error />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
