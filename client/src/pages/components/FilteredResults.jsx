import React, { useContext, useState } from 'react'
import AppContext from '../../context/AppContext'
import LikeButton from './LikeButton'
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

function FilteredResults({posts, loading, filtered, filteredResults}) {
  const {user, setUser} = useContext(AppContext)
  const decoded = jwtDecode(user)

  return (
    <>
    <button onClick={() => console.log(filteredResults)}>show</button>
    </>
  )
}

export default FilteredResults