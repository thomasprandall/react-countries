export const RegionDropdown = (props) => {
    
    return (
        <div style={{flexGrow: 0}}>
            <select name="region" onChange={(evt) => props.updateRegion(evt.target.value)}>
                <option value=''>Filter By Region</option>
                {
                    props.regions.map(region => {
                        return(<option value={region} key={region}>{region}</option>)
                    })
                }
            </select>
        </div>
    )
}