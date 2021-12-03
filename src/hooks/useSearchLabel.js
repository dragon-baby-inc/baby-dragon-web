import React, { useState } from 'react'
import {
  SearchInput
} from '../components'

const useSearchLabel = ({
  reset,
  changed,
  closed,
}) => {
  const [searchValue, setSearchValue] = useState('')

  const handleChanged = (e) => {
    setSearchValue(e.target.value)
    if (changed) { changed(e.target.value) }
  }

  const handleReset = (e) => {
    setSearchValue('')
    if (reset) { reset() }
  }

  const label = <SearchInput
    reset={handleReset}
    filtered={handleChanged}
    value={searchValue}
    closed={closed}
  />

  return [searchValue, label]
}

export default useSearchLabel
