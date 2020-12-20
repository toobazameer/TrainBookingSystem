import React, {Component} from 'react';

import {Card, Table} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default class FindSeats extends Component {

	constructor(props) {
        super(props);
        this.state = {
            seats : []
        };
    }

    componentDidMount() {
        const trainid = this.props.match.params.tid;
        if(trainid) {
            this.findAllSeatsById(trainid);
        }
        else{
            this.findAllSeats();
        }
    }

    findAllSeatsById = (trainid) => {
        axios.get("http://localhost:8080/api/seats/"+trainid)
            .then(response => response.data)
            .then((data) => {
                this.setState({seats: data});
            });
    }

    findAllSeats() {
        axios.get("http://localhost:8080/api/seats/")
            .then(response => response.data)
            .then((data) => {
                this.setState({seats: data});
            });
    }

	render() {
		return (
            <div>
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList} /> Seat List</Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant="dark">
                        <thead>
                            <tr>
                              <th>Date</th>
                              <th>Count</th>
                            </tr>
                          </thead>
                          <tbody>
                             {
                                this.state.seats.length === 0 ?
                                <tr align="center">
                                  <td colSpan="6">No Seats Available.</td>
                                </tr> :
                                this.state.seats.map((seat) => (
                                <tr key={seat.sid}>
                                    <td>{seat.date}</td>
                                    <td>{seat.count}</td>
                                </tr>
                                ))
                            }
                          </tbody>
                    </Table>
                </Card.Body>
            </Card> 
        </div>
    );	
  }
}