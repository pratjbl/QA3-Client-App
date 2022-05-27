import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";

const Footer = () => {
  const [customFooter, setCustomFooter] = useState(null);
  console.log(setCustomFooter);
  let finalRef = useRef(null);
  const customComponent = useSelector((state) => state.customComponent.value);
  console.log("what is custom Footer", customFooter);
  console.log("What is this custom Header", finalRef.current);

  if (customComponent.customFooter) {
    return React.createElement(customComponent.customFooter);
  }
  return (
    <footer className="bg-light p-3 text-center">
      <div className="logo" />
      <p>
        Sample project provided by <a href="https://auth0.com">Auth0</a>
      </p>
    </footer>
  );
};

export default Footer;
