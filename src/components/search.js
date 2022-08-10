export const SearchField = (props) => {
    return (
        <div style={{flexGrow: 1}}>
            <input type='text' name='search' placeholder="Search for a country..." value={props.search} onChange={(evt) => props.updateSearch(evt.target.value)} />
        </div>
    )
}