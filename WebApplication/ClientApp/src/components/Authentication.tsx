import * as React from 'react';
import { Formik, Field, Form } from 'formik';
import { Button, Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as AuthenticationStore from '../store/Authentication';

interface SignUpValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordRepeat: string;
}

interface LoginValues {
    email: string;
    password: string;
}

type Props =
    AuthenticationStore.AuthenticationState &
    typeof AuthenticationStore.actionCreators

interface State {
    displayLoginForm: boolean;
};

const axios = require('axios').default;

class Authentication extends React.Component<Props>{
    
    state: State = {
        displayLoginForm: true
    }

    handleChangeToSignup = () => {
        this.setState({
            displayLoginForm: false
        })
    }

    handleChangeToLogin = () =>{
        this.setState({
            displayLoginForm: true
        })
    }


    renderLogin = () => {
        return(
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                onSubmit={(values: LoginValues) => {
                    axios.post('/api/user/login', values)
                        .then((response: any) => {
                            console.log(response)
                            if (response.data.token) {
                                this.props.updateToken(response.data.token)
                                console.log("Props", this.props);
                            }
                            
                            axios.get('api/user/getdata', {
                                headers: { 'Authorization': `Bearer ${response.data.token}`}
                            })
                                .then((response: any) => {
                                    console.log(response)
                                })

                        });
                    }
                }
            >
                <Form>
                    <Row className="auth-row">
                        <label htmlFor="email">Email</label>
                        <Field id="email" type="email" name="email" />
                    </Row>

                    <Row className="auth-row">
                        <label htmlFor="password">Password</label>
                        <Field id="password" name="password" type="password" />
                    </Row>
                    <Row className="auth-row">
                        <Button color="link" onClick={this.handleChangeToSignup}>Sign Up</Button>
                    </Row>
                    <Row className="auth-row">
                        <Button color="primary" type="submit">Submit</Button>
                    </Row>
                </Form>

            </Formik>
        )
    }
    renderSignup = () => {
        return (
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    passwordRepeat: ''
                }}
                onSubmit={(values: SignUpValues) => {
                    axios.post('/api/user/register', values)
                        .then((response: any) => {
                            console.log(response)
                        });
                }
                }
            >
                <Form>
                    <Row className="auth-row">
                        <label htmlFor="firstName">First Name</label>
                        <Field id="firstName" name="firstName" placeholder="Ender first name..." />
                    </Row>

                    <Row className="auth-row">
                        <label htmlFor="lastName">Last Name</label>
                        <Field id="lastName" name="lastName" />
                    </Row>

                    <Row className="auth-row">
                        <label htmlFor="email">Email</label>
                        <Field id="email" name="Email" />
                    </Row>

                    <Row className="auth-row">
                        <label htmlFor="password">Password</label>
                        <Field id="password" name="password" type="password"/>
                    </Row>

                    <Row className="auth-row">
                        <label htmlFor="passwordRepeat">Password Repeat</label>
                        <Field id="passwordRepeat" name="passwordRepeat" />
                    </Row>
                    <Row className="auth-row">
                        <Button color="link" onClick={this.handleChangeToLogin}>Login</Button>
                    </Row>
                    <Row className="auth-row">
                        <Button color="primary">Submit</Button>
                    </Row>
                </Form>


            </Formik>
        )
    }

    render(){
        return(
            <Container className="centerContent" Fluid="sm">
                {this.state.displayLoginForm
                    ? this.renderLogin()
                    : this.renderSignup() 
                }
            </Container>
        );
    }
}


export default connect(
    (state: ApplicationState) => state.authentication,
    AuthenticationStore.actionCreators
)(Authentication);