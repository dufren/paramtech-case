import { Result } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/packages");
    }, 5000);
  }, []);

  return (
    <div>
      <Result
        status="success"
        title="Başarıyla Tamamlandı!"
        subTitle="Paketler ekranına yönlendiriliyorsunuz..."
      />
    </div>
  );
}
