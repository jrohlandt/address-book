import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Ajax from '../../Helpers/AjaxHelper';

export default class ContactList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contacts: [],
            placeholderText: 'Loading...',
        }
    }

    componentWillMount() {
        Ajax.get('/contacts')
            .then(res => {
                console.log('contacts: ', res.contacts);
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
                        <li><a href="/contacts">contacts / </a></li>
                    </ul>
                </div>
                <div className="content">
                    <li><a href="/contacts/create">New Contact</a></li>

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
