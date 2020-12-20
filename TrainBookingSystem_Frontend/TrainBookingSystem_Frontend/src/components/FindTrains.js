import React, {Component} from 'react';

import {Card, Table, InputGroup, FormControl, ButtonGroup, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faAddressCard, faPlus, faTrain, faStepBackward, faFastBackward, faStepForward, faFastForward} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import MyToast from './MyToast';
import axios from 'axios';

export default class FindTrains extends Component {

	constructor(props) {
        super(props);
        this.state = {
            trains : [],
            currentPage : 1,
            trainsPerPage : 5
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

    changePage = event => {
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        });
    };

    firstPage = () => {
        if(this.state.currentPage > 1) {
            this.setState({
                currentPage: 1
            });
        }
    };

    prevPage = () => {
        if(this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            });
        }
    };

    lastPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.trains.length / this.state.trainsPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.trains.length / this.state.trainsPerPage)
            });
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.trains.length / this.state.trainsPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };

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
        const {trains, currentPage, trainsPerPage} = this.state;
        const lastIndex = currentPage * trainsPerPage;
        const firstIndex = lastIndex - trainsPerPage;
        const currentTrains = trains.slice(firstIndex, lastIndex);
        const totalPages = trains.length / trainsPerPage;

        const pageCss = {
            width: "45px",
            border: "1px solid #FFFFFF",
            color: "#FFFFFF",
            textAlign: "center",
            fontWeight: "bold"
        };
		return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                <MyToast show = {this.state.show} message = {"Train Deleted Successfully."} type = {"danger"}/>
                </div>
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faTrain} /> Train List</Card.Header>
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
                                currentTrains.map((train) => (
                                <tr key={train.tid}>
                                    <td>{train.tname}</td>
                                    <td>{train.source}</td>
                                    <td>{train.destination}</td>
                                    <td>{train.duration}</td>
                                    <td>{train.fare}</td>
                                    <td>
                                        <ButtonGroup>
                                            <Link to={"edit/"+train.tid} className="btn btn-sm btn-outline-info"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                                            <Link to={"addseats/"+train.tid} className="btn btn-sm btn-outline-info"><FontAwesomeIcon icon={faPlus} /></Link>{' '}
                                            <Link to={"findseats/"+train.tid} className="btn btn-sm btn-outline-info"><FontAwesomeIcon icon={faAddressCard} /></Link>{' '}
                                            <Button size="sm" variant="outline-danger" onClick={this.deleteTrain.bind(this, train.tid)}><FontAwesomeIcon icon={faTrash} /></Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                                ))
                            }
                          </tbody>
                    </Table>
                </Card.Body>
                <Card.Footer>
                <div style={{"float":"left"}}>
                            Showing Page {currentPage} of {totalPages}
                        </div>
                        <div style={{"float":"right"}}>
                            <InputGroup size="sm">
                                <InputGroup.Prepend>
                                    <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                        onClick={this.firstPage}>
                                        <FontAwesomeIcon icon={faFastBackward} /> First
                                    </Button>
                                    <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                        onClick={this.prevPage}>
                                        <FontAwesomeIcon icon={faStepBackward} /> Prev
                                    </Button>
                                </InputGroup.Prepend>
                                <FormControl style={pageCss} className={"bg-dark"} name="currentPage" value={currentPage}
                                    onChange={this.changePage}/>
                                <InputGroup.Append>
                                    <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                        onClick={this.nextPage}>
                                        <FontAwesomeIcon icon={faStepForward} /> Next
                                    </Button>
                                    <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                        onClick={this.lastPage}>
                                        <FontAwesomeIcon icon={faFastForward} /> Last
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </Card.Footer>
            </Card> 
        </div>
    );	
  }
}