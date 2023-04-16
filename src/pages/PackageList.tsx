import "../styles/pageStyles/_packageList.scss";
import React from "react";
import { useGetPackagesQuery } from "../app/api/apiSlice";
import Package from "../components/pages/packagelist/Package";
import { useAppSelector } from "../app/hooks";
import Loading from "../components/Loading";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Footer from "../components/pages/packagelist/Footer";

export default function Packages() {
  const { data, isLoading, isFetching, isSuccess } =
    useGetPackagesQuery(undefined);

  const [parent] = useAutoAnimate();

  const cartList = useAppSelector((store) => store.cart.cart);

  let content;

  if (isLoading || isFetching)
    content = (
      <div className="packageListLoading">
        <Loading />
      </div>
    );

  if (isSuccess) {
    content = data.map((packageItem) => (
      <Package
        key={packageItem.id}
        packageItem={packageItem}
        inCart={cartList.some((p) => p.id === packageItem.id)}
      />
    ));
  }

  return (
    <div className="main__container">
      <div className="main__container__packageList" ref={parent}>
        {content}
      </div>
      <hr />
      <div className="main__container__footer">
        <Footer />
      </div>
    </div>
  );
}
