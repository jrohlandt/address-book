import React, { Component } from 'react';
import {Link, NavLink, Redirect} from 'react-router-dom';
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
            mode: 'create', // or edit
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

        let method = 'post';
        let url = '/contacts';
        if (this.state.mode === 'edit') {
            method = 'put';
            url = `/contacts/${this.state.contact.id}`;
        }

        Ajax[method](url, this.state.contact)
            .then(res => {
                window.localStorage.setItem('success', 'Contact saved');
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

    componentDidMount() {
        console.log('create mounted', );
        if (typeof(this.props.match.params.contactId) !== 'undefined') {
            console.log('edit');
            this.setState({mode: 'edit'});
            Ajax.get('/contacts/'+this.props.match.params.contactId)
                .then(res => {
                    console.log('contact', res.contact);
                    let contact = res.contact;
                    contact.phone_numbers = contact.phone_numbers === null ? [] : contact.phone_numbers;
                    contact.email_addresses = contact.email_addresses === null ? [] : contact.email_addresses;
                    this.setState({contact});
                })
                .catch(err => {
                    console.error(err);
                })
        }
    }

    render() {
        if (this.state.redirectToContactList === true) {
            return (<Redirect to="/contacts" />);
        }
        return (
            <div className="wrapper">

                <div className="content">

                    <div className="create-contact-form">
                        <div className="form-row">
                            <label htmlFor="contact-fname-input">First name:</label>
                            <input
                                id="contact-fname-input"
                                type="text"
                                name="first_name"
                                onChange={this.handleChange}
                                value={this.state.contact.first_name}
                            />
                            { this.displayValidationErrors('first_name') }
                        </div>

                        <div className="form-row">
                            <label htmlFor="contact-lname-input">Last name:</label>
                            <input
                                id="contact-lname-input"
                                type="text"
                                name="last_name"
                                onChange={this.handleChange}
                                value={this.state.contact.last_name}
                            />
                            { this.displayValidationErrors('last_name') }
                        </div>


                        <div className="form-row">
                            <b>Phone numbers</b>
                            {
                                this.state.contact.phone_numbers.length > 0
                                    ?   <ul>
                                            { this.state.contact.phone_numbers.map((p, i) => <li key={i}><b>{p.type}</b> {p.phone_number}</li>) }
                                        </ul>
                                    : 'no phone numbers'
                            }
                            <PhoneInput addPhoneNumber={this.addPhoneNumber} />

                        </div>


                        <div>
                            <b>Email addresses</b>
                            {/* todo add email addresses */}
                        </div>



                    </div>

                    <div className="form-button-row">
                        <Link to="/contacts" className="btn btn-default">Cancel</Link>
                        <div
                            className="btn btn-cyan"
                            onClick={this.handleSubmit}
                            style={{marginLeft: '5px'}}
                        >
                            Save
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
