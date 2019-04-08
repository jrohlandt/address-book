import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Ajax from '../../Helpers/AjaxHelper';
import { FaChalkboard } from "../../app";
import { NavLink, Link } from "react-router-dom";
import ContactsTable from "./partials/contacts-table.js";
import LoadingAnimation from "../loadingAnimation.js";

export default class ContactList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contacts: [],
            placeholderText: 'Loading...',
            success: '',
            searching: false,
            fetching: true,
            showDeleteConfirmation: false,
            deleteContact: {first_name: '', last_name: ''},
        };

        this.deleteContact = this.deleteContact.bind(this);
        this.cancelDelete = this.cancelDelete.bind(this);
        this.search = this.search.bind(this);
    }

    search(e) {
        if (e.target.value < 1) {
            if (this.state.searching === false) {
                return;
            } else {
                // if user clears out the search input field, then reset the search by getting all contacts again.
                this.setState({searching: false});
                this.getContacts();
                return;
            }
        }

        this.setState({searching: true});
        this.getContacts(e.target.value);
    }

    deleteContact(contact, confirmed=false) {

        if (confirmed !== true) {
            this.setState({showDeleteConfirmation: true, deleteContact: contact, success: ''});
            return;
        }

        Ajax.delete('/contacts/'+contact.id)
            .then(res => {
                const contacts = this.state.contacts.filter(c => c.id !== contact.id);
                this.setState({
                    contacts,
                    success: 'Contact deleted',
                    showDeleteConfirmation: false,
                    deleteContact: {first_name: '', last_name: ''}
                });
            })
            .catch(err => {
                this.setState({showDeleteConfirmation: false, deleteContact: {first_name: '', last_name: ''}});
                console.error(err);
            });
    }

    cancelDelete() {
        this.setState({showDeleteConfirmation: false, deleteContact: {first_name: '', last_name: ''}, success: ''});
    }

    getContacts(searchTerm='') {

        let newState = {fetching: true};
        if (searchTerm !== '') {
            newState['success'] = ''; // clear success notification.
        }
        this.setState(newState);
        let placeHolderText = searchTerm !== '' ? 'No results' : 'You don\'t have any contacts yet.';
        Ajax.get('/contacts?search=' + searchTerm)
            .then(res => {
                let obj = {contacts: res.contacts};
                obj['placeholderText'] = res.contacts.length > 0 ? '' : placeHolderText;
                obj['fetching'] = false;
                this.setState(obj);
            })
            .catch(err => {
                this.setState({fetching: false});
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
        // if (this.state.fetching) {
        //     return (<LoadingAnimation/>);
        // }
        return (
            <div className="wrapper">

                { this.state.success !== '' ? <div className="contact-success-notification show">{this.state.success}</div> : '' }

                <div className="content">

                    <div>
                        <input
                            type="search"
                            name="search"
                            onChange={this.search}
                            placeholder="Search by first or last name"
                            className="search-field"
                        />
                        <Link to="/contacts/create" className="btn btn-green">New Contact</Link>
                    </div>
                    {
                        this.state.fetching
                            ?
                                <LoadingAnimation/>
                            :
                                this.state.showDeleteConfirmation
                                    ?
                                        <div className="delete-overlay">
                                            <p>Are you sure you want to delete contact {this.state.deleteContact.first_name} {this.state.deleteContact.last_name}?</p>
                                            <div className="delete-button-row">
                                                <div className="btn btn-default" onClick={this.cancelDelete}>Cancel</div>
                                                <div
                                                    className="btn btn-red"
                                                    onClick={() => this.deleteContact(this.state.deleteContact, true)}
                                                    style={{marginLeft: '5px'}}
                                                >
                                                    Delete
                                                </div>
                                            </div>
                                        </div>
                                    :
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
