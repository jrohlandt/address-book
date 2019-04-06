import React from "react";


class PhoneInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: {type: '', phone_number: ''},
        };

        this.handleChange = this.handleChange.bind(this);
        this.changeLabel = this.changeLabel.bind(this);
        this.addPhoneNumber = this.addPhoneNumber.bind(this);
    }

    changeLabel(label) {
        let phoneNumber = {...this.state.phoneNumber};
        phoneNumber.type = label;
        this.setState({phoneNumber});
    }

    handleChange(e) {
        let phoneNumber = {...this.state.phoneNumber};
        if (e.target.name === 'phone_number') {
            phoneNumber.phone_number = e.target.value;
        }

        this.setState({phoneNumber});
    }

    addPhoneNumber() {
        const phoneNumber = this.state.phoneNumber;
        if (phoneNumber.type === '' || phoneNumber.phone_number === '') {
            return;
        }
        // todo check that phone number is valid
        this.props.addPhoneNumber(this.state.phoneNumber);
        this.setState({phoneNumber: {type: '', phone_number: ''}});
    }

    render() {
        let activeLabel = this.state.phoneNumber.type;
        return (
            <div className="form-row">
                <div>
                    <label>Label:</label>
                    <ul>
                        <li>label</li>
                        <li className={activeLabel === 'mobile' ? 'phone-label-active' : ''} onClick={() => this.changeLabel('mobile')}>mobile</li>
                        <li className={activeLabel === 'home' ? 'phone-label-active' : ''} onClick={() => this.changeLabel('home')}>home</li>
                        <li className={activeLabel === 'office' ? 'phone-label-active' : ''} onClick={() => this.changeLabel('office')}>office</li>
                    </ul>
                </div>
                <label>Phone number:</label>
                <input
                    type="text"
                    name="phone_number"
                    onChange={this.handleChange}
                    value={this.state.phoneNumber.phone_number}
                    placeholder="e.g. +27 82 555 5555"
                />
                <button onClick={this.addPhoneNumber}>Add</button>
            </div>
        );
    }
}

export default PhoneInput;