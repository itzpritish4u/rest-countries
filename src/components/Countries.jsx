import React, {useState, useEffect} from 'react'

const url = 'https://restcountries.com/v3.1/all'

const Countries = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            const response = await fetch(url)
            const countries = await response.json()
            setCountries(countries)
        }
        
        fetchCountries()
    }, [])
    
    return (
        <>
            <section className="grid">
                {countries.map(country => {
                    const { cca3, name: { common }, flags: { png }, population, region, capital } = country;

                    return (
                        <article className='grid-block' key={cca3}>
                           <div>
                                <img src={png} alt={`${common} flag`} />
                                <div className="details">
                                    <h3>{common}</h3>
                                    <h4>Population: <span>{population}</span></h4>
                                    <h4>Region: <span>{region}</span></h4>
                                    <h4>Capital: <span>{capital}</span></h4>
                                </div>
                            </div>
                        </article>
                    )
                })}
            </section>
        </>
    )
}

export default Countries