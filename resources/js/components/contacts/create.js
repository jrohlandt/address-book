import React, { Component } from 'react';
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
            // activePhoneNumber: -1,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addPhoneNumber = this.addPhoneNumber.bind(this);
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

    handleSubmit() {
        Ajax.post('/contacts', this.state.contact)
            .then(response => {
                console.log(response);
            })
            .catch(err => { console.log(err)});
    }

    addPhoneNumber(obj) {
        // console.log(typeof )


        let contact = {...this.state.contact};
        // if (typeof this.state.contact.phone_numbers[this.state.activePhoneNumber] !== 'undefined') {
        //
        // }
        contact.phone_numbers.push(obj);
        this.setState({contact});
    }

    render() {
        return (
            <div className="page-content-container">
                <div className="bread-crumbs-container">
                    <ul>
                        <li><a href="/contacts">Contacts / </a></li>
                        <li><a href="/contacts/create">New Contact</a></li>
                    </ul>
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

                        <PhoneInput addPhoneNumber={this.addPhoneNumber} />


                    </div>

                    <button onClick={this.handleSubmit}>Create</button>

                </div>
            </div>
        );
    }
}
