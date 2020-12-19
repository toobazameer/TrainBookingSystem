import React, {Component} from 'react';

import {Jumbotron} from 'react-bootstrap';

export default class Welcome extends Component {
	render() {
		return (
	<Jumbotron className = "bg-dark text-white">
	  <h1>Welcome to the Ticket Booking App</h1>
		<blockquote className="blockquote mb-0">
			<p>
				Here you can simply find trains with direct and indirect path from your source to destination and can book them easily.
  			</p>
  			<footer className="blockquote-footer">
  				Tooba Zameer
  			</footer>
  		</blockquote>
	</Jumbotron >
	);
  }
}