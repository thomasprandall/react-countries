import {useState, useEffect} from 'react';

import './App.css';

import { RegionDropdown } from './components/region';
import { SearchField } from './components/search';
import { CountryBlock } from './components/country';

const apiBase = 'https://restcountries.com/v3.1/';
const regionData = ['Africa','Americas','Asia','Europe','Oceania'];

function App() {
  const [region, setRegion] = useState("");
  const [searchString, setSearchString] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const savedCountries = JSON.parse(localStorage.getItem("countries"));
    const storageExpiration = new Date(localStorage.getItem("countriesExpire"));

    if(!savedCountries || storageExpiration < new Date()){
      fetch(apiBase + "all")
        .then(response => response.json())
        .then(countryData => {
          let reducedCountries =[];
          
          countryData.map((country) => {
            
            reducedCountries.push({
              name: country.name.common,
              region: country.region,
              subregion: country.subregion,
              flag: country.flags.png,
              population: country.population,
              capital: country.capital ? country.capital.join(', '):'N/A'
            });

          });
          
          setCountries(reducedCountries);
          localStorage.setItem("countries", JSON.stringify(reducedCountries));
          localStorage.setItem("countriesExpire", new Date().setHours(23));
        });
    } else {
      setCountries(savedCountries);
    }
  
    return () => {
      console.log('Countries cleanup');
    }
  }, []);
  
  if(!countries.length){
    return (<h4>Countries Loading...</h4>)
  }

  return (
    <div className="App" style={{maxWidth: "120ch", margin: "auto", padding: '1em', minHeight: "100vh"}}>
      <div style={{display: "flex", flexFlow: "row wrap", justifyContent: "space-between"}}>
        <div>
          <h1>All Countries: {countries.length}</h1><br />
          <RegionDropdown regions={regionData} updateRegion={setRegion} /><br />
        </div>
        <div>
          <SearchField search={searchString} updateSearch={setSearchString} />
        </div>
      </div>
      <div>
        
      </div>
      <div style={{display: "flex", flexFlow: "row wrap", justifyContent: "space-evenly"}}>
        {countries.length > 0 && 
          countries.filter((country) => region.length === 0 || country.region === region)
            .filter((country) => searchString.length === 0 || country.name.toLowerCase().includes(searchString.toLowerCase()))
            .map((country) => {
              return(
                <CountryBlock country={country} key={country.name} />
              )
            })
      }
      </div>
    </div>
  );
}

export default App;
