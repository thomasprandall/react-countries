export const SearchField = (props) => {
    return (
        <div>
            <input type='text' name='search' value={props.search} onChange={(evt) => props.updateSearch(evt.target.value)} />
        </div>
    )
}