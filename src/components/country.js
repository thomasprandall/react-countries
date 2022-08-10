export const CountryBlock = (props) => {
    return (
        <div style={{ boxShadow: "1ch 1px 1ch -1px black", margin: "1ch", backgroundColor: "hsl(209, 23%, 22%)", flexBasis:"30ch"}}>
            <div style={{ backgroundImage: "url(" + props.country.flag + ")", backgroundSize:"cover", backgroundRepeat:"no-repeat", minHeight:"20ch"}}></div>
            <div style={{padding:".5em"}}>
                <h3>{props.country.name}</h3>
                <p>Population: {props.country.population}</p>
                <p>Region: {props.country.region} {props.country.subregion && "(" + props.country.subregion + ")"}</p>
                <p>Capital: {props.country.capital}</p>
            </div>
        </div>
    )
}