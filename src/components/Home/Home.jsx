import React from "react";
import { Helmet } from 'react-helmet-async';
import iconimage from "../../image/avataaars.svg";
import RecentPorduct from "../RecentPorduct/RecentPorduct";
import MainSilder from "../MainSilder/MainSilder";
import SilderBrands from "../SilderBrands/SilderBrands";

export default function Home() {
  return (
    <React.Fragment>
      <Helmet>
        <link rel="icon" href={iconimage} />
        <title>Home</title>
      </Helmet>

      <div className="mx-auto ">
        <MainSilder />
        <SilderBrands />

        <RecentPorduct></RecentPorduct>
      </div>
    </React.Fragment>
  );
}
