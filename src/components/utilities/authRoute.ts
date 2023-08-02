import isDev from "./isDev";

const DontForceProduction = true;

export default isDev()
  ? DontForceProduction
    ? "http://localhost:3005"
    : "https://hdp.singularitydevelopment.com"
  : "https://hdp.singularitydevelopment.com";
