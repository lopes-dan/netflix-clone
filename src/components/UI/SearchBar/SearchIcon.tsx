
const SearchIcon = (width:{width:number}) => {
   
    return (
        <svg width={width.width}  height="24" viewBox="0 0 24 24"
            fill="none" xmlns="http://www.w3.org/2000/svg"
            className="search-icon"><path fillRule="evenodd"
                clipRule="evenodd" d="M13 11C13 13.7614 10.7614 16 8 16C5.23858 16 3 13.7614 3 11C3 8.23858 5.23858 6 8 6C10.7614 6 13 8.23858 13 11ZM14.0425 16.2431C12.5758 17.932 10.4126 19 8 19C3.58172 19 0 15.4183 0 11C0 6.58172 3.58172 3 8 3C12.4183 3 16 6.58172 16 11C16 11.9287 15.8417 12.8205 15.5507 13.6497L24.2533 18.7028L22.7468 21.2972L14.0425 16.2431Z" fill="currentColor"></path></svg>
    )
}

export default SearchIcon;