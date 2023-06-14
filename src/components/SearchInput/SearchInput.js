import React from 'react'

function SearchInput({searchInput,handleChange}) {
  return (
    <div>
        <input value={searchInput} onChange={handleChange}></input>
    </div>
  )
}

export default SearchInput