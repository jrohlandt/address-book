import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FiEye, FiEdit, FiTrash } from 'react-icons/fi';

const ContactsTable = (props) => (
    <div>
        <table className="contacts-table">
            <thead>
                <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {
                props.contacts.map((c, i) => {
                    return (
                        <tr key={c.id}>
                            <td>{c.first_name}</td>
                            <td>{c.last_name}</td>
                            <td>
                                <FiTrash onClick={() => props.delete(c.id)} style={{float: 'right', marginLeft: '5px'}}/>
                                <Link to={`/contacts/${c.id}/edit`} style={{float: 'right'}}><FiEdit/></Link>
                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    </div>
);

export default withRouter(ContactsTable);