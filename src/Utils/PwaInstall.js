import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPwa } from "../reducers/PwaSlice";

const PwaInstall = ({ title }) => {
  const dispatch = useDispatch();
  const supportsPWA = useSelector((state) => state.pwa.supportsPWA);
  const promptInstall = useSelector((state) => state.pwa.promptInstall);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();

      dispatch(addPwa(e));
    };

    window.addEventListener("beforeinstallprompt", handler);
  }, []);

  const onclick = (e) => {
    e.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  if (
    !supportsPWA ||
    !promptInstall ||
    window.matchMedia("(display-mode: standalone)").matches
  ) {
    return null;
  }

  return (
    <button
      onClick={onclick}
      className="btn btn-secondary rounded-pill nav-link text-decoration-underline"
    >
      Download App {title}
    </button>
  );
};

export default PwaInstall;
