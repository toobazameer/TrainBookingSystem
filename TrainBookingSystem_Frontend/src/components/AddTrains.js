import React, {Component} from 'react';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';
import axios from 'axios';

export default class AddTrains extends Component {

	constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.trainChange = this.trainChange.bind(this);
        this.submitTrain = this.submitTrain.bind(this);
    }
    
    initialState = {
        id:'', tid:'', tname:'', source:'', destination:'', duration:'', fare:''
    };

    componentDidMount() {
        const trainid = this.props.match.params.tid;
        if(trainid) {
            this.findTrainById(trainid);
        }
    }   

    findTrainById = (trainid) => {
        axios.get("http://localhost:8080/api/trains/"+trainid)
            .then(response => {
                if(response.data != null) {
                    this.setState({
                        id: response.data.tid,
                        tid: response.data.tid,
                        tname: response.data.tname,
                        source: response.data.source,
                        destination: response.data.destination,
                        duration: response.data.duration,
                        fare: response.data.fare
                    });
                }
            }).catch((error) => {
                console.error("Error - "+error);
            });
    };


    resetTrain = () => {
        this.setState(() => this.initialState);
    };

	submitTrain = event => {
        event.preventDefault();

        const train = {
            tid: this.state.tid,
            tname: this.state.tname,
            source: this.state.source,
            destination: this.state.destination,
            duration: this.state.duration,
            fare: this.state.fare
        };

        axios.post("http://localhost:8080/api/trains", train)
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
    
    updateTrain = event => {
        event.preventDefault();

        const train = {
            id: this.state.tid,
            tid: this.state.tid,
            tname: this.state.tname,
            source: this.state.source,
            destination: this.state.destination,
            duration: this.state.duration,
            fare: this.state.fare
        };

        axios.put("http://localhost:8080/api/trains", train)
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

     trainChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    trainList = () => {
        return this.props.history.push("/find");
    };

    
	render() {
        const {tid, tname, source, destination, duration, fare} = this.state;
        return (
            <div>
            <div style={{"display":this.state.show ? "block" : "none"}}>
                <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Train Updated Successfully." : "Train Saved Successfully."} type = {"success"}/>
            </div>
		<Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>
                    <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update Train" : "Add New Train"}
                </Card.Header>
                <Form onReset={this.resetTrain} onSubmit={this.state.id ? this.updateTrain : this.submitTrain} id="trainFormId">
                        <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridTid">
                                <Form.Label>Tid</Form.Label>
                                <Form.Control required
                                    type="test" name="tid"
                                    value={tid}
                                    onChange={this.trainChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Train Id" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridTname">
                                <Form.Label>Tname</Form.Label>
                                <Form.Control required
                                    type="test" name="tname"
                                    value={tname}
                                    onChange={this.trainChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Train Name" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formSource">
                                <Form.Label>Source</Form.Label>
                                <Form.Control required
                                    type="test" name="source"
                                    value={source}
                                    onChange={this.trainChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Train Source" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formDestination">
                                <Form.Label>Destination</Form.Label>
                                <Form.Control required
                                    type="test" name="destination"
                                    value={destination}
                                    onChange={this.trainChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Train Destination" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formDuration">
                                <Form.Label>Duration</Form.Label>
                                <Form.Control required
                                    type="test" name="duration"
                                    value={duration}
                                    onChange={this.trainChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Train Duration" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formFare">
                                <Form.Label>Fare</Form.Label>
                                <Form.Control required
                                    type="test" name="fare"
                                    value={fare}
                                    onChange={this.trainChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Train Fare" />
                            </Form.Group>
                        </Form.Row>
                    </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button size="sm" variant="success" type="submit">
                            <FontAwesomeIcon icon={faSave} /> {this.state.id ? "Update" : "Save"}
                        </Button>{' '}
                       <Button size="sm" variant="info" type="reset">
                            <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{' '}
                        <Button size="sm" variant="info" type="button" onClick={this.trainList.bind()}>
                            <FontAwesomeIcon icon={faList} /> Train List
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        </div>
	);
  }
}