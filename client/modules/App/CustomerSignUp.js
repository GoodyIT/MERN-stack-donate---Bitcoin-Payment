import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { browserHistory } from 'react-router';

import './App.css';
import callApi from '../../util/apiCaller';

import { saveToken } from '../App/AuthActions';

class CustomerSignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            password_repeat: '',
            isCreate: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = name => event => {
        this.setState({
          ...this.state,
          [name]: event.target.value,
        });
    };

    navigate = (url) => {
        browserHistory.push(url);
    }

    signUp = () => {
        const self = this;
        self.setState({ ...self.state, isCreate: true});
        callApi('users/customersignup', 'POST', { user: this.state }).then((res, err) => {
            let message = 'Successfully created';
            if  (res.errors) {
                message = res.errors;
                self.setState({ ...self.state, isCreate: false, errOnCreate: message });
            } else {
                window.localStorage.setItem('smartproject', JSON.stringify({ email: res.user.email, token: res.user.token, isSignIn: true }));
                this.props.dispatch(saveToken(res.user.token));
                browserHistory.push('/');
            }
        });
    }

    render() {
        return (
            <div className="container mt-100">
                <div className="card" style={{ width: '33%', margin: '0 auto', minWidth: '330px' }}>
                    <div className="card-head mt-5 text-center">
                        <h2 className="text-center text-uppercase">Sign Up</h2>
                        {this.state.isCreate && <i className="fa fa-spinner fa-spin fa-3x text-red"></i>}
                        {!this.state.isCreate && <div className="warning-color text-center">{this.state.errOnCreate}</div>}
                    </div>
                    <div className="d-flex justify-content-center align-items-center flex-column card-body">
                        <TextField
                            id="outlined-email-input"
                            label="Email"
                            className="textField"
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                            margin="normal"
                        />
                        <button onClick={() => this.signUp()} className="btn btn-lg bg-warning text-white mt-4 mb-4">Sign Up</button>
                        <p>Do you already have an account? <a href="javascript:void(0)" onClick={() => this.navigate('/user/signin')} className="warning-color">Sign In</a></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default CustomerSignUp;