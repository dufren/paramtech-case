import "../styles/_home.scss";

import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../app/api/apiSlice";
import { getLoginData } from "../features/loginSlice";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";

import { FormValuesType } from "../types/types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";

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
      errorHandler((error as any).data);
    }
  }, [isSuccess, isError]);

  const onFullNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onFinish = async (values: FormValuesType) => {
    if (!isLoading) {
      await login({ fullName: values.fullName, email: values.email });
    }
  };

  const errorHandler = (errorMessage: any) => {
    message.error(errorMessage);
  };

  return (
    <div className="home">
      <div className="login__form">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="fullName"
            rules={[
              { required: true, message: "Lütfen adınızı soyadınızı giriniz!" },
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

          <Form.Item className="submit__button">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={isLoading}
              disabled={isLoading}
            >
              Devam et
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
