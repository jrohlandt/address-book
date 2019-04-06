import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import Dashboard from './components/dashboard.js';

import ContactList from './components/contacts/list.js';
import ContactCreate from './components/contacts/create.js';


import { FaClock, FaChalkboard } from 'react-icons/fa/';

const logout = () => window.location = '/logout';

const App = () => (
    <Router>
        <div className="main-wrapper">
            <aside className="left-nav">
                <div>
                    <h3>Address Book</h3>
                </div>
                <nav>
                    <ul>
                        <li>
                            <NavLink
                                exact
                                to="/dashboard"
                                activeClassName="left-nav-active"
                            >
                                <FaClock size={20} style={{marginBottom: '5px'}}/>
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/contacts"
                                activeClassName="left-nav-active"
                            >
                                <FaChalkboard size={20} style={{marginBottom: '5px'}}/>
                                <span>Contacts</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main>
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/contacts" component={ContactList} />
                <Route path="/contacts/create" component={ContactCreate} />
                <Route path="/contacts/:contactId/edit" component={ContactCreate} />
            </main>
        </div>
    </Router>
);


render(<App />, document.getElementById('app'));
