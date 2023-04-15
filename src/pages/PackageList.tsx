import "../styles/pageStyles/_packageList.scss";
import React from "react";
import { useGetPackagesQuery } from "../app/api/apiSlice";
import Package from "../components/Package";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function Packages() {
  const { data, isLoading, isFetching, isSuccess } =
    useGetPackagesQuery(undefined);

  const navigate = useNavigate();

  const total = useAppSelector((store) => store.cart.cartTotal);
  const cartList = useAppSelector((store) => store.cart.cart);

  let content;

  if (isLoading || isFetching) content = <Loading />;

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
      <div className="main__container">
        <div className="main__container__packageList">{content}</div>
        <hr />
        <div className="main__container__footer">
          <h1>
            Cart Total <span>{total}</span>₺
          </h1>

          <Button onClick={() => navigate("/cart")} type="primary">
            Devam et
          </Button>
        </div>
      </div>
    ) ?? <Error />
  );
}
