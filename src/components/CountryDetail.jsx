import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./CountryDetail.css";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const CountryDetail = () => {
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountry = async () => {
      setCountry(null);
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        const data = await response.json();
        setCountry(data[0]);

        if (data[0].borders) {
          fetchBorderCountries(data[0].borders);
        } else {
          setBorderCountries([]);
        }
      } catch (error) {
        console.error("Error fetching country details:", error);
      }
    };

    fetchCountry();
  }, [countryCode]);

  const fetchBorderCountries = async (borders) => {
    const borderPromises = borders.map(code =>
      fetch(`https://restcountries.com/v3.1/alpha/${code}`).then(res => res.json())
    );
    const borderData = await Promise.all(borderPromises);
    setBorderCountries(
      borderData.map((country) => ({
        name: country[0].name.common,
        code: country[0].cca3,
      }))
    );
  };

  if (!country) {
    return <div className="loader">Loading...</div>;
  }

  const nativeName = country.name.nativeName
    ? Object.values(country.name.nativeName)[0].common
    : country.name.common;

  const currencies = country.currencies
    ? Object.values(country.currencies).map((currency) => currency.name).join(", ")
    : "N/A";

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  return (
    <section className="country-detail">
      <button onClick={() => navigate(-1)} className="back-button">
        <MdOutlineKeyboardBackspace /> Back
      </button>
      <div className="container">
        <img
          src={country.flags.png}
          alt={`${country.name.common} flag`}
          className="country-flag"
        />
        <span className="country-info">
          <h2>{country.name.common}</h2>

          <div className="details">
            <div className="left-details">
              <p>
                <strong>Native Name:</strong> {nativeName}
              </p>
              <p>
                <strong>Population:</strong> {country.population.toLocaleString()}
              </p>
              <p>
                <strong>Region:</strong> {country.region}
              </p>
              <p>
                <strong>Sub Region:</strong> {country.subregion || "N/A"}
              </p>
              <p>
                <strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}
              </p>
            </div>
            <div className="right-details">
              <p>
                <strong>Top Level Domain:</strong> {country.tld ? country.tld[0] : "N/A"}
              </p>
              <p>
                <strong>Currencies:</strong> {currencies}
              </p>
              <p>
                <strong>Languages:</strong> {languages}
              </p>
            </div>
          </div>

          <div className="border-countries">
            <strong>Border Countries:</strong>
            {borderCountries.length > 0 ? (
              borderCountries.map(({ name, code }) => (
                <Link to={`/countries/${code}`} key={code} className="border-button">
                  {name}
                </Link>
              ))
            ) : (
              <span> None</span>
            )}
          </div>
        </span>
      </div>
    </section>
  );
};

export default CountryDetail;
