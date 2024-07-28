import React from "react";
import { Script } from "gatsby";

export const wrapPageElement = ({ element }) => {
  return (
    <>
      {element}
      <Script
        defer
        src="http://umami-qc8ksw8.82.112.245.222.sslip.io/script.js"
        data-website-id="822db299-d1d7-4a58-9834-593aabef1a11"
      />
    </>
  );
};
