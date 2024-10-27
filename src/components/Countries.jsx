import { Link } from "react-router-dom";
import "./Countries.css";

const Countries = ({ countries }) => {
  return (
    <section className="grid">
      {countries.map(country => {
        const {
          cca3,
          name: { common },
          flags: { png },
          population = "N/A",
          region = "N/A",
          capital = ["N/A"],
        } = country;

        return (
          <Link to={`/countries/${cca3}`} key={cca3} className="grid-block-link">
            <article className="grid-block">
              <div>
                <img src={png} alt={`${common} flag`} />
                <div className="detail">
                  <h3>{common}</h3>
                  <h4>
                    Population: <span>{population.toLocaleString()}</span>
                  </h4>
                  <h4>
                    Region: <span>{region}</span>
                  </h4>
                  <h4>
                    Capital: <span>{capital[0]}</span>
                  </h4>
                </div>
              </div>
            </article>
          </Link>
        );
      })}
    </section>
  );
};

export default Countries;
