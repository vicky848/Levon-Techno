import React from 'react'
import'./index.css'
const NavBar= () => {
  return (
    <>
         
         <nav className="navbar navbar-expand-lg bg-body-tertiary ">
  <div className="container-fluid   bg-dark p-2  ">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <a className="navbar-brand text-light" href="/">Levon Techno</a>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active text-light" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-light" href="/">About</a>
        </li>
        
        <li className="nav-item">
          <a className="nav-link text-light" href="/">Contact Us</a>
        </li>
       
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>




    </>
  )
}
export default NavBar