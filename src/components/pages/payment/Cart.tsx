import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { paymentInfoType } from "../../../types/types";
import { useSendPaymentMutation } from "../../../app/api/apiSlice";
import { useEffect } from "react";
import { Button, message } from "antd";
import {
  CARD_REGEX,
  CVV_REGEX,
  EXP_REGEX,
  NAME_REGEX,
} from "../../../utils/RegexSchemas";
import { paymentReset } from "../../../features/cartSlice";
import PackageInLine from "./PackageInLine";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type CartPropsType = {
  paymentInfo: paymentInfoType;
};

export default function Cart({ paymentInfo }: CartPropsType) {
  const cart = useAppSelector((store) => store.cart.cart);
  const cartTotal = useAppSelector((store) => store.cart.cartTotal);
  const packageIds = cart.map((packageItem) => String(packageItem.id));

  const [parent] = useAutoAnimate();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [sendPayment, { isLoading, isSuccess, isError, error }] =
    useSendPaymentMutation(undefined);

  useEffect(() => {
    if (isSuccess) {
      dispatch(paymentReset());
      localStorage.clear();
      navigate("/cart/success");
    }
    if (isError) {
      message.warning(`${error}`);
      navigate("/cart/error");
    }
  }, [isSuccess, isError]);

  const canSaveHandle = () => {
    const isNameValid = NAME_REGEX.test(paymentInfo.cardHolderName);
    const isCardNumberValid = CARD_REGEX.test(paymentInfo.cardNumber);
    const isExpDateValid = EXP_REGEX.test(paymentInfo.expireDate);
    const isCvvValid = CVV_REGEX.test(paymentInfo.cvv);

    const canSave =
      [isNameValid, isCardNumberValid, isExpDateValid, isCvvValid].every(
        Boolean
      ) &&
      !isLoading &&
      cart.length > 0;

    return canSave;
  };

  const handlePayment = async () => {
    await sendPayment({
      packageIds,
      cardHolderName: paymentInfo.cardHolderName,
      cardNumber: paymentInfo.cardNumber,
      expireDate: paymentInfo.expireDate,
      cvv: paymentInfo.cvv,
      totalAmount: cartTotal,
    });
  };

  const content =
    cart.length > 0 ? (
      cart.map((packageItem) => (
        <PackageInLine key={packageItem.id} packageItem={packageItem} />
      ))
    ) : (
      <div className="payment__container__right__empty">Sepet boş</div>
    );

  return (
    <>
      <h1 className="payment__container__right__title">Sepetteki Paketler</h1>

      <div ref={parent}>{content}</div>
      {
        <Button
          onClick={handlePayment}
          loading={isLoading}
          disabled={!canSaveHandle()}
          className="payment__container__right__btn"
          type="primary"
        >
          Ödeme Yap
        </Button>
      }
    </>
  );
}
