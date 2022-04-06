import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    return (
      <div>
          <div style={{display :'flex'}}>
            <Link to={'/'} style={{textDecoration:"none"}}><h1 style={{margin:"0px 10px"}}>Movies App</h1></Link>
              <Link to={'/favourites'} style={{textDecoration:"none"}}><h2 style={{margin:"10px 20px"}} >Favourites</h2></Link>
            
          </div>
      </div>
    )
  }
}
