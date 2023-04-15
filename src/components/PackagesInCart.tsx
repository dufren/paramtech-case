import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { PackageType, PackagesInCartProps } from "../types/types";
import { useSendPaymentMutation } from "../app/api/apiSlice";
import { useEffect } from "react";
import { Button, message } from "antd";
import {
  CARD_REGEX,
  CVV_REGEX,
  EXP_REGEX,
  NAME_REGEX,
} from "../utils/RegexSchemas";
import { addToCart, paymentReset } from "../features/cartSlice";

export default function PackagesInCart({ paymentInfo }: PackagesInCartProps) {
  const cart = useAppSelector((store) => store.cart.cart);
  const cartTotal = useAppSelector((store) => store.cart.cartTotal);
  const packageIds = cart.map((packageItem) => String(packageItem.id));

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [sendPayment, { isLoading, isSuccess, isError, error }] =
    useSendPaymentMutation(undefined);

  useEffect(() => {
    if (isSuccess) {
      dispatch(paymentReset());
      localStorage.clear();
      navigate("/success");
    }
    if (isError) {
      message.warning(`${error}`);
    }
  }, [isSuccess]);

  const removeHandle = (packageItem: PackageType) => {
    dispatch(addToCart(packageItem));
    message.warning(`${packageItem.name} çıkartıldı!`);
  };

  const canSave = () => {
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

  return (
    <div className="payment__container__right">
      <h1 className="payment__container__right__title">Sepetteki Paketler</h1>

      {cart.length > 0 ? (
        cart.map((packageItem) => (
          <div
            key={packageItem.id}
            className="payment__container__right__package"
          >
            <Button onClick={() => removeHandle(packageItem)} type="primary">
              -
            </Button>
            <h1>{packageItem.name}</h1>
            <h1>
              {packageItem.amount} <span>{packageItem.currency}</span>
            </h1>
          </div>
        ))
      ) : (
        <div className="payment__container__right__empty">Sepet boş</div>
      )}
      {
        <Button
          onClick={handlePayment}
          loading={isLoading}
          disabled={!canSave()}
          className="payment__container__right__btn"
          type="primary"
        >
          Ödeme Yap
        </Button>
      }
    </div>
  );
}
