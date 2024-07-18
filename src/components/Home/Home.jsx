import React from "react";
import { Helmet } from 'react-helmet-async';
import iconimage from "../../image/avataaars.svg";
import RecentPorduct from "../RecentPorduct/RecentPorduct";
import MainSilder from "../MainSilder/MainSilder";

export default function Home() {
  return (
    <React.Fragment>
      <Helmet>
        <link rel="icon" href={iconimage} />
        <title>Home</title>
      </Helmet>

      <div className="container mx-auto py-6">
        <MainSilder />
        <RecentPorduct></RecentPorduct>
      </div>
    </React.Fragment>
  );
}
