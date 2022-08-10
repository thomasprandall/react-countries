export const RegionDropdown = (props) => {
    
    return (
        <select name="region" onChange={(evt) => props.updateRegion(evt.target.value)}>
            <option value=''>None</option>
            {
                props.regions.map(region => {
                    return(<option value={region} key={region}>{region}</option>)
                })
            }
        </select>
    )
}