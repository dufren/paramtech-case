import React, { useState } from "react";
import "../styles/pageStyles/_payment.scss";

import PackagesInCart from "../components/pages/payment/PackagesInCart";
import CardDetail from "../components/pages/payment/CardDetail";
import Aggrement from "../components/pages/payment/Aggrement";

export default function Payment() {
  const [paymentInfo, setPaymentInfo] = useState({
    cardHolderName: "",
    cardNumber: "",
    expireDate: "",
    cvv: "",
  });

  return (
    <div className="payment__container">
      <div className="payment__container__left">
        <CardDetail paymentInfo={paymentInfo} setPaymentInfo={setPaymentInfo} />

        <div className="payment__container__left__aggrement">
          <Aggrement />
        </div>
      </div>

      <div className="payment__container__right">
        <PackagesInCart paymentInfo={paymentInfo} />
      </div>
    </div>
  );
}
