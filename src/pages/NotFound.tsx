import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Aradığınız sayfa bulunamadı..."
        extra={
          <Button type="primary">
            <Link to={"/"}>Anasayfaya dön</Link>
          </Button>
        }
      />
    </div>
  );
}
