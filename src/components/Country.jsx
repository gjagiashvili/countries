import React from "react";
import styles from "../modules/Country.module.scss";
const Country = ({ country }) => {
  return (
    <div key={country.cca3} className={styles["container"]}>
      <div className={styles["flag-container"]}>
        <img src={country.flags.png} className={styles["flag"]} />
      </div>
      <div className={styles["info-container"]}>
        <p className={styles["country-name"]}>{country.name.common}</p>
        <div className={styles["info-text"]}>
          <p>Population: {country.population}</p>
          <p>Region: {country.region}</p>
          <p>Capital: {country.capital}</p>
        </div>
      </div>
    </div>
  );
};

export default Country;
