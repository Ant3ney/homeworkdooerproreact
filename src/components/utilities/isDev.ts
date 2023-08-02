import React from "react";

const FORCE_PRODUCTION = false;

export default function isDev() {
  return FORCE_PRODUCTION ? false : "_self" in React.createElement("div");
}
