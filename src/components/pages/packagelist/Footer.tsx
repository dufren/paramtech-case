import React from "react";
import { useAppSelector } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import "../../../styles/pageStyles/_packageList.scss";

export default function Footer() {
  const total = useAppSelector((store) => store.cart.cartTotal);

  const navigate = useNavigate();

  return (
    <>
      <h1>
        Cart Total <span>{total}</span>₺
      </h1>

      <Button onClick={() => navigate("/cart")} type="primary">
        Devam et
      </Button>
    </>
  );
}
