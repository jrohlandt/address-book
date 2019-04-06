import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FiEye, FiEdit, FiTrash } from 'react-icons/fi';

const ContactsTable = (props) => (
    <div>
        <table>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Actions</td>
                </tr>
            </thead>
            <tbody>
            {
                props.contacts.map((c, i) => {
                    return (
                        <tr key={c.id}>
                            <td>{c.first_name} {c.last_name}</td>
                            <td>
                                <Link to={`/contacts/${c.id}/edit`}><FiEdit/></Link>
                                {/*<FiEdit onClick={() => props.history.push(`/contacts/${c.id}/edit`)}/>*/}
                                <FiTrash onClick={() => props.delete(c.id)}/>
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