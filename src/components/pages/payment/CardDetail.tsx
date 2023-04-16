import { Col, Form, Input, Row } from "antd";
import Cleave from "cleave.js/react";
import React from "react";
import {
  CARD_REGEX,
  CVV_REGEX,
  EXP_REGEX,
  NAME_REGEX,
} from "../../../utils/RegexSchemas";
import { paymentInfoType } from "../../../types/types";

import "../../../styles/pageStyles/_payment.scss";

type CardDetailPropsType = {
  paymentInfo: paymentInfoType;
  setPaymentInfo: React.Dispatch<React.SetStateAction<paymentInfoType>>;
};

export default function CardDetail({
  paymentInfo,
  setPaymentInfo,
}: CardDetailPropsType) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });

  return (
    <>
      <h1 className="payment__container__left__title">Kart Bilgileri</h1>
      <Form
        name="basic"
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
    </>
  );
}
