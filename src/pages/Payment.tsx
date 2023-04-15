import React, { useEffect, useState } from "react";
import { useGetPaymentContentQuery } from "../app/api/apiSlice";
import { Col, Form, Input, Row } from "antd";
import Cleave from "cleave.js/react";
import "../styles/pageStyles/_payment.scss";
import Loading from "../components/Loading";
import Error from "../components/Error";
import {
  CARD_REGEX,
  CVV_REGEX,
  EXP_REGEX,
  NAME_REGEX,
} from "../utils/RegexSchemas";
import PackagesInCart from "../components/PackagesInCart";

export default function Payment() {
  const {
    data,
    isLoading: aggrementLoading,
    isSuccess: aggrementSuccess,
  } = useGetPaymentContentQuery(undefined);

  const [agreementForm, setAgreementForm] = useState(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  );

  const [paymentInfo, setPaymentInfo] = useState({
    cardHolderName: "",
    cardNumber: "",
    expireDate: "",
    cvv: "",
  });

  useEffect(() => {
    if (data) {
      setAgreementForm(decodeURIComponent(data.content));
    }
  }, [aggrementSuccess]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });

  if (aggrementLoading)
    return (
      <div className="loading">
        <Loading />
      </div>
    );

  if (!data) return <Error />;

  return (
    <div className="payment__container">
      <div className="payment__container__left">
        <h1 className="payment__container__left__title">Kart Bilgileri</h1>
        <Form
          name="basic"
          style={{ maxWidth: 1000 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          className="payment__container__left__form"
        >
          <Col className="col">
            <label>Kart Üzerindeki İsim Soyisim</label>
            <Form.Item
              style={{ maxWidth: 400 }}
              name="cardHolderName"
              rules={[
                {
                  required: true,
                  message: "İsminizi giriniz.",
                },
                {
                  pattern: NAME_REGEX,
                  message: "Geçerli isim giriniz.",
                },
              ]}
            >
              <Cleave
                className="payment__container__left__form__input"
                name="cardHolderName"
                options={{ blocks: [24], delimiter: "" }}
                value={paymentInfo.cardHolderName}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>

          <Row className="payment__container__left__form__row">
            <Col className="col">
              <label>Kart Numarası</label>
              <Form.Item
                style={{ maxWidth: 400 }}
                validateStatus="error"
                name="cardNumber"
                rules={[
                  {
                    required: true,
                    message: "Kart numaranızı giriniz!",
                  },

                  {
                    pattern: CARD_REGEX,
                    message: "Geçerli kart numarası giriniz.",
                  },
                ]}
              >
                <Cleave
                  className="payment__container__left__form__input"
                  name="cardNumber"
                  options={{
                    delimiter: "-",
                    blocks: [4, 4, 4, 4],
                    numericOnly: true,
                  }}
                  value={paymentInfo.cardNumber}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>

            <Col className="col">
              <label>Son Kul. Tar.</label>
              <Form.Item
                style={{ maxWidth: 400 }}
                name="expireDate"
                rules={[
                  {
                    required: true,
                    message: "Geçerli tarih giriniz.",
                  },
                  {
                    pattern: EXP_REGEX,
                    message: "Geçerli tarih giriniz.",
                  },
                ]}
              >
                <Cleave
                  name="expireDate"
                  className="payment__container__left__form__input"
                  options={{
                    delimiter: "/",
                    blocks: [2, 2],
                    numericOnly: true,
                    date: true,
                    datePattern: ["d", "m", "Y"],
                  }}
                  value={paymentInfo.expireDate}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>

            <Col className="col">
              <label>CVV</label>
              <Form.Item
                style={{ maxWidth: 400 }}
                name="cvv"
                rules={[
                  { required: true, message: "CVV'nizi giriniz." },
                  {
                    pattern: CVV_REGEX,
                    message: "Geçerli CVV giriniz.",
                  },
                ]}
              >
                <Input
                  className="card-date-cvv-info"
                  name="cvv"
                  type="password"
                  maxLength={3}
                  value={paymentInfo.cvv}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <div className="payment__container__left__aggrement">
          <h1 className="payment__container__left__aggrement__title">
            Sözleşme
          </h1>
          <p
            className="payment__container__left__aggrement__content"
            dangerouslySetInnerHTML={{ __html: agreementForm }}
          />
        </div>
      </div>

      <PackagesInCart paymentInfo={paymentInfo} />
    </div>
  );
}
