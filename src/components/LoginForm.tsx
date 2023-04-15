import "../styles/pageStyles/_home.scss";

import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../app/api/apiSlice";
import { getLoginData } from "../features/loginSlice";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";

import { FormValuesType } from "../types/types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { EMAIL_REGEX, NAME_REGEX } from "../utils/RegexSchemas";

export default function Home() {
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isSuccess) {
      dispatch(getLoginData({ fullName, email }));
      setFullName("");
      setEmail("");
      navigate("/packages");
    }

    if (isError) {
      message.error((error as any).data);
    }
  }, [isSuccess, isError]);

  const onFullNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const canSave = () => {
    const isNameValid = NAME_REGEX.test(fullName);
    const isEmailValid = EMAIL_REGEX.test(email);

    const canSave = [isEmailValid, isNameValid].every(Boolean) && !isLoading;
    return canSave;
  };

  const onFinish = async (values: FormValuesType) => {
    if (!isLoading) {
      await login({ fullName: values.fullName, email: values.email });
    }
  };

  return (
    <div className="login__container">
      <Form
        name="normal_login"
        className="login__container__form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="fullName"
          rules={[
            { required: true, message: "Lütfen adınızı soyadınızı giriniz!" },
            {
              pattern: NAME_REGEX,
              message: "Lütfen geçerli bir isim giriniz",
            },
          ]}
        >
          <Input
            placeholder="Adınız Soyadınız"
            prefix={<UserOutlined className="site-form-item-icon" />}
            onChange={onFullNameChanged}
            value={fullName}
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Lütfen email adresinizi giriniz!" },
            {
              pattern: EMAIL_REGEX,
              message: "Lütfen geçerli bir mail giriniz",
            },
          ]}
        >
          <Input
            placeholder="Email Adresiniz"
            prefix={<LockOutlined className="site-form-item-icon" />}
            onChange={onEmailChanged}
            value={email}
            type="email"
          />
        </Form.Item>

        <Form.Item className="login__container__form__btn">
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            disabled={!canSave()}
          >
            Devam et
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
