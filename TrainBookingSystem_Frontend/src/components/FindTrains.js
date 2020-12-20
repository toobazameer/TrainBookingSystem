import React, {Component} from 'react';

import {Card, Table, ButtonGroup, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash, faAddressCard, faPlus} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import MyToast from './MyToast';
import axios from 'axios';

export default class FindTrains extends Component {

	constructor(props) {
        super(props);
        this.state = {
            trains : []
        };
    }
    
    componentDidMount() {
        this.findAllTrains();
    }

    findAllTrains() {
        axios.get("http://localhost:8080/api/trains")
            .then(response => response.data)
            .then((data) => {
                this.setState({trains: data});
            });
    }

    deleteTrain = (tid) => {
        axios.delete("http://localhost:8080/api/trains/"+tid)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    this.setState({
                        trains: this.state.trains.filter(train => train.tid !== tid)
                    });
                } else {
                    this.setState({"show":false});
                }
            });
    };
    
	render() {
		return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                <MyToast show = {this.state.show} message = {"Train Deleted Successfully."} type = {"danger"}/>
                </div>
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList} /> Train List</Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant="dark">
                        <thead>
                            <tr>
                              <th>Tname</th>
                              <th>Source</th>
                              <th>Destination</th>
                              <th>Duration</th>
                              <th>Fare</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                             {
                                this.state.trains.length === 0 ?
                                <tr align="center">
                                  <td colSpan="6">No Trains Available.</td>
                                </tr> :
                                this.state.trains.map((train) => (
                                <tr key={train.tid}>
                                    <td>{train.tname}</td>
                                    <td>{train.source}</td>
                                    <td>{train.destination}</td>
                                    <td>{train.duration}</td>
                                    <td>{train.fare}</td>
                                    <td>
                                        <ButtonGroup>
                                            <Link to={"edit/"+train.tid} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                                            <Link to={"addseats/"+train.tid} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faPlus} /></Link>{' '}
                                            <Link to={"findseats/"+train.tid} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faAddressCard} /></Link>{' '}
                                            <Button size="sm" variant="outline-danger" onClick={this.deleteTrain.bind(this, train.tid)}><FontAwesomeIcon icon={faTrash} /></Button>
                                        </ButtonGroup>
                                    </td>
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