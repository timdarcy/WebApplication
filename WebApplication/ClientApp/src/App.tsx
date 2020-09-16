import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Authentication from './components/Authentication';
import Board from './components/WorkFlowFeature/WorkflowBoard';
import { ApplicationState } from './store';
import { connect } from 'react-redux';

import './custom.scss'

class App extends React.Component<ApplicationState> {


    authenticatedView = () => {
        console.log("authenticatedView")
        return (
            
                <Layout>
                    <Route exact path='/' component={Home} />
                    <Route path='/counter' component={Counter} />
                    <Route path='/board' component={Board}/>
                    <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
                </Layout>
            
        )
    }
    unAuthenticatedView = () => {
        console.log("unAuthenticatedView")
        return (
            <Authentication/>
        )
    }
    render() {
        return (

            this.props.authentication && this.props.authentication.authToken
                ? this.authenticatedView()
                : this.unAuthenticatedView()
        )
    }
}

export default connect(
    (state: ApplicationState) => state
)(App);
