import React from "react";
import { PulseLoader } from "react-spinners";

import "../../styles/componentStyles/_loading.scss";

export default function Loading() {
  return (
    <div className="loading">
      <PulseLoader />
    </div>
  );
}
