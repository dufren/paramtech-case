import React from "react";
import { PackageType } from "../../../types/types";
import { Button, message } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { addToCart } from "../../../features/cartSlice";

type PackageInLinePropsType = {
  packageItem: PackageType;
};

export default function PackageInLine({ packageItem }: PackageInLinePropsType) {
  const dispatch = useAppDispatch();

  const removeHandle = (packageItem: PackageType) => {
    dispatch(addToCart(packageItem));
    message.warning(`${packageItem.name} çıkartıldı!`);
  };

  return (
    <div key={packageItem.id} className="payment__container__right__package">
      <Button onClick={() => removeHandle(packageItem)} type="primary">
        -
      </Button>
      <h1>{packageItem.name}</h1>
      <h1>
        {packageItem.amount} <span>{packageItem.currency}</span>
      </h1>
    </div>
  );
}
