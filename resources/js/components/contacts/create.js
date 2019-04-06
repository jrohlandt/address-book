import React, { Component } from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import Ajax from '../../Helpers/AjaxHelper.js';

import PhoneInput from './phone-input.js';

export default class ContactCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contact: {
                first_name: '',
                last_name: '',
                email_addresses: [],
                phone_numbers: [],
            },
            validationErrors: {},
            redirectToContactList: false,
            // activePhoneNumber: -1,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addPhoneNumber = this.addPhoneNumber.bind(this);
        this.displayValidationErrors = this.displayValidationErrors.bind(this);
    }

    handleChange(e) {
        let contact = {...this.state.contact};
        const name = e.target.name;
        if ( ! contact.hasOwnProperty(name)) {
            return;
        }

        contact[name] = e.target.value;
        this.setState({contact});
    }

    addPhoneNumber(obj) {
        let contact = {...this.state.contact};
        contact.phone_numbers.push(obj);
        this.setState({contact});
    }

    handleSubmit() {
        // reset validation errors
        this.setState({validationErrors: {}});

        Ajax.post('/contacts', this.state.contact)
            .then(res => {
                window.localStorage.setItem('success', 'Contact created!');
                this.setState({redirectToContactList: true});
            })
            .catch(err => {
                if (typeof(err.validationErrors) !== 'undefined'/* && err.validationErrors.length > 0*/) {
                    this.setState({validationErrors: err.validationErrors});
                    return;
                }
                console.log('other error: ', err);
            });
    }

    displayValidationErrors(key) {
        const errors = this.state.validationErrors;
        if (typeof(errors[key]) !== 'undefined' && errors[key].length > 0) {
            return (
                <div>
                    <ul>
                        {errors[key].map((v, i) => <li key={i}>{v}</li>)}
                    </ul>
                </div>
            );
        }
        return '';
    }

    render() {
        if (this.state.redirectToContactList === true) {
            return (<Redirect to="/contacts" />);
        }
        return (
            <div className="page-content-container">
                <div className="bread-crumbs-container">
                        <NavLink to="/contacts"><span>Contacts</span></NavLink> /
                        <div className="current-crumb">New Contact</div>
                </div>
                <div className="content">

                    <div>
                        <div className="form-row">
                            <label htmlFor="contact-fname-input">First name:</label>
                            <input
                                id="contact-fname-input"
                                type="text"
                                name="first_name"
                                onChange={this.handleChange}
                                value={this.state.contact.first_name}
                            />
                        </div>
                        { this.displayValidationErrors('first_name') }

                        <div className="form-row">
                            <label htmlFor="contact-lname-input">Last name:</label>
                            <input
                                id="contact-lname-input"
                                type="text"
                                name="last_name"
                                onChange={this.handleChange}
                                value={this.state.contact.last_name}
                            />
                        </div>
                        { this.displayValidationErrors('last_name') }

                        <div>
                            <b>Phone numbers</b>
                            {
                                this.state.contact.phone_numbers.length > 0
                                    ?   <ul>
                                            { this.state.contact.phone_numbers.map((p, i) => <li key={i}><b>{p.type}</b> {p.phone_number}</li>) }
                                        </ul>
                                    : 'no phone numbers'
                            }
                        </div>


                        <div>
                            <b>Email addresses</b>
                            {/* todo add email addresses */}
                        </div>

                        <PhoneInput addPhoneNumber={this.addPhoneNumber} />


                    </div>

                    <button onClick={this.handleSubmit}>Create</button>

                </div>
            </div>
        );
    }
}
