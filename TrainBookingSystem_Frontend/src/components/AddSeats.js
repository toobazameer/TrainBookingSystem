import React, {Component} from 'react';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';
import axios from 'axios';

export default class AddSeats extends Component {

	constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.state = {
            seats : []
        };
        this.seatChange = this.seatChange.bind(this);
        this.submitSeat = this.submitSeat.bind(this);
    }
    
    initialState = {
        tid:'' , sid:'', date:'', count:''
    };

    componentDidMount() {
        const tid = this.props.match.params.tid;
        if(tid) {
            this.findSeatById(tid);
        }
    }   

    findSeatById = (tid) => {
        axios.get("http://localhost:8080/api/seats/"+tid)
            .then(response => {
                if(response.data != null) {
                    this.setState({
                        sid: response.data.sid,
                        date: response.data.date,
                        count: response.data.count
                    });
                }
            }).catch((error) => {
                console.error("Error - "+error);
            });
    };

    resetSeat = () => {
        this.setState(() => this.initialState);
    };

	submitSeat = event => {
        event.preventDefault();

        const seat = {
            sid: this.state.sid,
            date: this.state.date,
            count: this.state.count
        };

        axios.post("http://localhost:8080/api/seats/"+this.state.tid, seat)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true, "method":"post"});
                    setTimeout(() => this.setState({"show":false}), 3000);
                } else {
                    this.setState({"show":false});
                }
            });

        this.setState(this.initialState);
    };

    updateSeat = event => {
        event.preventDefault();

        const seat = {
            sid: this.state.sid,
            date: this.state.date,
            count: this.state.count
        };

        axios.put("http://localhost:8080/api/trains/"+this.state.tid, seat)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true, "method":"put"});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    setTimeout(() => this.trainList(), 3000);
                } else {
                    this.setState({"show":false});
                }
            });

        this.setState(this.initialState);
    };

    
    seatChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    seatList = () => {
        return this.props.history.push("/findseats");
    };

    
	render() {
        const {sid, date, count} = this.state;
        return (
            <div>
            <div style={{"display":this.state.show ? "block" : "none"}}>
                <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Seat Updated Successfully." : "Seat Saved Successfully."} type = {"success"}/>
            </div>
		    <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>
                    <FontAwesomeIcon icon={this.state.tid ? faEdit : faPlusSquare} /> {this.state.tid ? "Update Seat" : "Add New Seat"}
                </Card.Header>
                <Form onReset={this.resetSeat} onSubmit={this.state.tid ? this.updateSeat : this.submitSeat} id="seatFormId">
                        <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridSid">
                                <Form.Label>Sid</Form.Label>
                                <Form.Control required
                                    type="test" name="sid"
                                    value={sid}
                                    onChange={this.seatChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Seat Id" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridDate">
                                <Form.Label>Date</Form.Label>
                                <Form.Control required
                                    type="test" name="date"
                                    value={date}
                                    onChange={this.seatChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Seat Date" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formCount">
                                <Form.Label>Count</Form.Label>
                                <Form.Control required
                                    type="test" name="count"
                                    value={count}
                                    onChange={this.seatChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Seat Count" />
                            </Form.Group>
                        </Form.Row>
                    </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button size="sm" variant="success" type="submit">
                            <FontAwesomeIcon icon={faSave} /> {this.state.tid ? "Update" : "Save"}
                        </Button>{' '}
                       <Button size="sm" variant="info" type="reset">
                            <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{' '}
                        <Button size="sm" variant="info" type="button" onClick={this.seatList.bind()}>
                            <FontAwesomeIcon icon={faList} /> Seat List
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
            </div>
	);
  }
}