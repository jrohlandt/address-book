import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Ajax from '../../Helpers/AjaxHelper';
import {FaChalkboard} from "../../app";
import {NavLink} from "react-router-dom";

export default class ContactList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contacts: [],
            placeholderText: 'Loading...',
            success: '',
        }
    }

    componentWillMount() {
        if (window.localStorage.getItem('success')) {
            this.setState({success: window.localStorage.getItem('success')});
            window.localStorage.removeItem('success');
        }
        Ajax.get('/contacts')
            .then(res => {
                let obj = {contacts: res.contacts};
                obj['placeholderText'] = res.contacts.length > 0 ? '' : 'You don\'t have any contacts yet.';
                this.setState(obj);
            })
            .catch(err => {
                console.error(err);
            })
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

                    {
                        this.state.contacts.length > 0
                            ?
                                <ul>
                                    { this.state.contacts.map( c => <li key={c.id}>{c.first_name} {c.last_name}</li>)}
                                </ul>
                            :
                                <h2>{this.state.placeholderText}</h2>
                    }

                </div>
            </div>
        );
    }
}
