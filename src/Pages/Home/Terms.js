import React from "react";

import Header from "../../components/Header";
import InstTerms from "./InstTerms";

const Terms = () => {
  return (
    <div>
      <Header></Header>
      <div
        style={{
          paddingTop: "40px",
        }}
      >
        <InstTerms></InstTerms>
      </div>
    </div>
  );
};

export default Terms;
