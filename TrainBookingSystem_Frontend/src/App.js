import './App.css';
import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import FindTrains from './components/FindTrains';
import AddTrains from './components/AddTrains';

import { Container, Row, Col } from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
	const marginTop = {
		marginTop: "20px"
	};
	return (
		<Router>
				<NavigationBar />
				<Container>
					<Row>
						<Col lg={12} style={marginTop}>
							<Switch>
								<Route path="/" exact component={Welcome}/>
								<Route path="/find" exact component={FindTrains}/>
								<Route path="/edit/:tid" exact component={AddTrains}/>
								<Route path="/add" exact component={AddTrains}/>
							</Switch>
						</Col>
					</Row>
				</Container>
				<Footer/>
		</Router>
	);
}

export default App;
