import "../styles/_package.scss";

import React from "react";
import { PackageType } from "../types/types";
import { useAppDispatch } from "../app/hooks";
import { addToCart } from "../features/packagesSlice";

import { message } from "antd";

type packagePropType = {
  paket: PackageType;
  inCart: boolean;
};

export default function Package({ paket, inCart }: packagePropType) {
  const dispatch = useAppDispatch();

  const successHandler = () => {
    message.success("Ürün eklendi");
  };

  const warningHandler = () => {
    message.warning("Ürün Çıkartıldı");
  };

  const addToCartHandle = () => {
    dispatch(addToCart(paket));
    if (inCart) {
      warningHandler();
    } else {
      successHandler();
    }
  };

  return (
    <div
      onClick={addToCartHandle}
      className={`package ${inCart ? "selected" : ""}`}
    >
      <img src={paket.imagePath} alt={paket.name} />

      <div>
        <div className="title">
          <h1>{paket.name}</h1>
          <h1>
            {paket.amount}
            <span>{paket.currency}</span>
          </h1>
        </div>

        <div className="details">
          {paket.details.map((detail, index) => (
            <ul key={index}>
              <li>{detail}</li>
            </ul>
          ))}
        </div>

        <hr />

        <div className="tags">
          {paket.tags.map((tag, index) => (
            <ul key={index}>
              <li>{tag}</li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
