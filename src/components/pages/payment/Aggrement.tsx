import React, { useEffect, useState } from "react";
import { useGetPaymentContentQuery } from "../../../app/api/apiSlice";
import Error from "../../Error";
import Loading from "../../Loading";

export default function Aggrement() {
  const { data, isLoading, isSuccess, isFetching } =
    useGetPaymentContentQuery(undefined);

  const [agreementForm, setAgreementForm] = useState(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  );

  useEffect(() => {
    if (data) {
      setAgreementForm(decodeURIComponent(data.content));
    }
  }, [isSuccess]);

  if (isLoading || isFetching) return <Loading />;

  if (!data) return <Error />;

  return (
    <>
      <h1 className="payment__container__left__aggrement__title">Sözleşme</h1>
      <p
        className="payment__container__left__aggrement__content"
        dangerouslySetInnerHTML={{ __html: agreementForm }}
      />
    </>
  );
}
