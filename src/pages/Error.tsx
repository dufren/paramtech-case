import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div>
      <Result
        status="500"
        title="500"
        subTitle="Üzgünüz, bir şeyler ters gitti."
        extra={
          <Button type="primary">
            <Link to={"/"}>Anasayfaya dön</Link>
          </Button>
        }
      />
    </div>
  );
}
