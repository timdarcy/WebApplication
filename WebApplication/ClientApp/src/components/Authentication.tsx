import * as React from 'react';
import { Formik, Field, Form } from 'formik';
import { Button } from 'reactstrap';
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
                    <label htmlFor="email">Email</label>
                    <Field id="email" type="email" name="email" />

                    <label htmlFor="password">Password</label>
                    <Field id="password" name="password" type="password" />
                    <Button color="link" onClick={this.handleChangeToSignup}>Sign Up</Button>
                    <Button color="primary" type="submit">Submit</Button>
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
                    <label htmlFor="firstName">First Name</label>
                    <Field id="firstName" name="firstName" placeholder="Ender first name..."/>

                    <label htmlFor="lastName">Last Name</label>
                    <Field id="lastName" name="lastName" />

                    <label htmlFor="email">Email</label>
                    <Field id="email" name="Email" />

                    <label htmlFor="password">Password</label>
                    <Field id="password" name="password" type="password"/>

                    <label htmlFor="passwordRepeat">Password Repeat</label>
                    <Field id="passwordRepeat" name="passwordRepeat" />
                    <Button color="link" onClick={this.handleChangeToLogin}>Login</Button>
                    <Button color="primary">Submit</Button>
                </Form>


            </Formik>
        )
    }

    render(){
        return(
            <>
                {this.state.displayLoginForm
                    ? this.renderLogin()
                    : this.renderSignup() 
                }
            </>
        );
    }
}


export default connect(
    (state: ApplicationState) => state.authentication,
    AuthenticationStore.actionCreators
)(Authentication);