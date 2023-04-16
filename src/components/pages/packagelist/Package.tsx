import "../../../styles/componentStyles/_package.scss";
import React from "react";
import { PackageType } from "../../../types/types";
import { useAppDispatch } from "../../../app/hooks";
import { toggleItem } from "../../../features/cartSlice";

import { message, Card } from "antd";

type packagePropsType = {
  packageItem: PackageType;
  inCart: boolean;
};

export default function Package({ packageItem, inCart }: packagePropsType) {
  const dispatch = useAppDispatch();

  const toggleItemHandle = () => {
    dispatch(toggleItem(packageItem));
    if (inCart) {
      message.warning(`${packageItem.name} çıkartıldı!`);
    } else {
      message.success(`${packageItem.name} eklendi!`);
    }
  };

  return (
    <Card
      onClick={toggleItemHandle}
      className={`package ${inCart ? "selected" : ""}`}
    >
      <div className="package__container">
        <img
          className="package__container__img"
          src={packageItem.imagePath}
          alt={packageItem.name}
        />
        <div className="package__container__content">
          <div className="package__container__content__title">
            <h1>{packageItem.name}</h1>
            <h1>
              {packageItem.amount}
              {packageItem.currency}
            </h1>
          </div>
          <div className="package__container__content__details">
            {packageItem.details.map((detail, index) => (
              <p key={index}>{detail}</p>
            ))}
          </div>

          <hr />

          <div className="package__container__content__tags">
            {packageItem.tags.map((tag, index) => (
              <p key={index}>{tag}</p>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
