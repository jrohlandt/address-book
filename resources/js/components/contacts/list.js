import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Ajax from '../../Helpers/AjaxHelper';
import {FaChalkboard} from "../../app";
import {NavLink} from "react-router-dom";
import ContactsTable from "./partials/contacts-table.js";

export default class ContactList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contacts: [],
            placeholderText: 'Loading...',
            success: '',
            searching: false,
        };

        this.deleteContact = this.deleteContact.bind(this);
        this.search = this.search.bind(this);
    }

    search(e) {
        if (e.target.value < 1) {
            if (this.state.searching === false) {
                return;
            } else {
                // if was previously searching then just get all contacts again.
                this.setState({searching: false});
                this.getContacts();
                return;
            }
        }

        this.setState({searching: true});
        this.getContacts(e.target.value);
    }

    deleteContact(contactId) {
        Ajax.delete('/contacts/'+contactId)
            .then(res => {
                this.setState({success: 'Contact deleted'});
            })
            .catch(err => {
                // todo error notification
                console.error(err);
            });

        const contacts = this.state.contacts.filter(c => c.id !== contactId);
        this.setState({contacts});
    }

    getContacts(searchTerm='') {

        let placeHolderText = searchTerm !== '' ? 'No results' : 'You don\'t have any contacts yet.';
        Ajax.get('/contacts?search=' + searchTerm)
            .then(res => {
                let obj = {contacts: res.contacts};
                obj['placeholderText'] = res.contacts.length > 0 ? '' : placeHolderText;
                this.setState(obj);
            })
            .catch(err => {
                console.error(err);
            });
    }

    componentDidMount() {
        if (window.localStorage.getItem('success')) {
            this.setState({success: window.localStorage.getItem('success')});
            window.localStorage.removeItem('success');
        }
        this.getContacts();
    }

    render() {
        return (
            <div className="page-content-container">
                <div className="bread-crumbs-container">
                    <ul>
                        <li><NavLink to="/contacts"><span>Contacts</span></NavLink></li>
                    </ul>
                </div>
                <div className="content">
                    { this.state.success !== '' ? <h2 style={{color: 'green'}}>{this.state.success}</h2> : '' }

                    <li><NavLink to="/contacts/create"><span>New Contact</span></NavLink></li>

                    <input type="text" name="search" onChange={this.search} />
                    {
                        this.state.contacts.length > 0
                            ?
                                <div>
                                    <ContactsTable contacts={this.state.contacts} delete={this.deleteContact} />
                                </div>
                            :
                                <h2>{this.state.placeholderText}</h2>
                    }

                </div>
            </div>
        );
    }
}
