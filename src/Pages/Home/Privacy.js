import React from "react";
import Header from "../../components/Header";
import InstPrivacy from "./InstPrivacy";

const Privacy = () => {
  return (
    <div>
      <Header></Header>
      <div
        style={{
          paddingTop: "40px",
        }}
      >
        <InstPrivacy></InstPrivacy>
      </div>
    </div>
  );
};

export default Privacy;
