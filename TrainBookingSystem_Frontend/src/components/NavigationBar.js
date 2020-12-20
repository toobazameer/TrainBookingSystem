import React, {Component} from 'react';

import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default class NavigationBar extends Component {
	render(){
	return (
	<Navbar bg="dark" variant="dark">
	<Link to={""} className="navbar-brand">
		Booking App
	</Link>
	<Nav className="mr-auto">
      <Link to={"find"} className="nav-link">Find Trains</Link>
      <Link to={"add"} className="nav-link">Add Trains</Link>
	  <Link to={"findseats"} className="nav-link">Find Seats</Link>
    </Nav>
	</Navbar>
	);
	}
}