import "../styles/componentStyles/_package.scss";
import React from "react";
import { PackageType } from "../types/types";
import { useAppDispatch } from "../app/hooks";
import { addToCart } from "../features/cartSlice";

import { message, Card } from "antd";

type packagePropType = {
  paket: PackageType;
  inCart: boolean;
};

export default function Package({ paket, inCart }: packagePropType) {
  const dispatch = useAppDispatch();

  const addToCartHandle = () => {
    dispatch(addToCart(paket));
    if (inCart) {
      message.warning("Ürün Çıkartıldı");
    } else {
      message.success("Ürün eklendi");
    }
  };

  return (
    <Card
      onClick={addToCartHandle}
      className={`package ${inCart ? "selected" : ""}`}
    >
      <div className="package__container">
        <img
          className="package__container__img"
          src={paket.imagePath}
          alt={paket.name}
        />
        <div className="package__container__content">
          <div className="package__container__content__title">
            <h1>{paket.name}</h1>
            <h1>
              {paket.amount}
              {paket.currency}
            </h1>
          </div>
          <div className="package__container__content__details">
            {paket.details.map((detail, index) => (
              <ul key={index}>
                <li>{detail}</li>
              </ul>
            ))}
          </div>

          <hr />

          <div className="package__container__content__tags">
            {paket.tags.map((tag, index) => (
              <ul key={index}>
                <li>{tag}</li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
