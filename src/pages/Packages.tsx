import "../styles/_packages.scss";

import React from "react";
import { useGetPackagesQuery } from "../app/api/apiSlice";
import Package from "../components/Package";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

export default function Packages() {
  const { data, isLoading, isFetching, isSuccess } =
    useGetPackagesQuery(undefined);

  const navigate = useNavigate();

  const total = useAppSelector((store) => store.packages.cartTotal);
  const cartList = useAppSelector((store) => store.packages.cart);

  let content;

  if (isLoading || isFetching) content = <div>Yükleniyor...</div>;

  if (isSuccess) {
    content = data.map((paket) => (
      <Package
        key={paket.id}
        paket={paket}
        inCart={cartList.some((p) => p.id === paket.id)}
      />
    ));
  }

  return (
    (
      <div>
        <div className="packages">{content}</div>
        <div className="footer">
          <h1>
            Cart Total <span>{total}</span>₺
          </h1>

          <Button onClick={() => navigate("/cart")} type="primary">
            Devam et
          </Button>
        </div>
      </div>
    ) ?? <div>Hata Oluştu.</div>
  );
}
