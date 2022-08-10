import {useState, useEffect, useCallback} from 'react';

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
          setCountries(countryData);
          localStorage.setItem("countries", JSON.stringify(countryData));
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
        {region.length === 0 && <h3>Select a Region to begin.</h3>}
        {countries.length > 0 && 
          countries.filter(
              (country) => {
                return (country.name.common.toLowerCase().includes(searchString.toLowerCase()) && country.region === region);
              })
            .map((country) => {
              return(
                <CountryBlock country={country} key={country.name.official} />
              )
            })
      }
      </div>
    </div>
  );
}

export default App;
