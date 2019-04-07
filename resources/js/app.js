import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import ContactList from './components/contacts/list.js';
import ContactCreate from './components/contacts/create.js';

// const logout = () => window.location = '/logout';

const App = () => (
    <Router>
        <main>
            <header><h1>Address Book</h1></header>
            <Route exact path="/contacts" component={ContactList} />
            <Route path="/contacts/create" component={ContactCreate} />
            <Route path="/contacts/:contactId/edit" component={ContactCreate} />
        </main>
    </Router>
);

render(<App />, document.getElementById('app'));
