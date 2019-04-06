import React from "react";


const PhoneInput = (props) =>  (
    <div className="form-row">
        <label htmlFor="contact-fname-input">First name:</label>
        <input
            id="contact-fname-input"
            type="text"
            name="first_name"
            onChange={props.addPhoneNumber}
            value={props.value}
            placeholder="e.g. +27 82 555 5555"
        />
    </div>
);

export default PhoneInput;
