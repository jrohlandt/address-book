import React from "react";


class PhoneInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: {type: 'mobile', phone_number: ''},
            showLabels: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.changeLabel = this.changeLabel.bind(this);
        this.toggleShowLabels = this.toggleShowLabels.bind(this);
        this.addPhoneNumber = this.addPhoneNumber.bind(this);
    }

    changeLabel(label) {
        let phoneNumber = {...this.state.phoneNumber};
        phoneNumber.type = label;
        this.setState({phoneNumber, showLabels: false});
    }

    toggleShowLabels() {
        this.setState({showLabels: !this.state.showLabels});
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
        this.setState({phoneNumber: {type: 'mobile', phone_number: ''}});
    }

    render() {
        const activeLabel = this.state.phoneNumber.type;
        return (
            <div className="form-row">
                <div className="custom-select">
                    <div
                        className="custom-select-label"
                        onClick={this.toggleShowLabels}
                    >
                        {activeLabel}
                        {
                            this.state.showLabels
                                ?   <ul className="custom-select-label-list">
                                        <li className={activeLabel === 'mobile' ? 'custom-select-active' : ''} onClick={() => this.changeLabel('mobile')}>mobile</li>
                                        <li className={activeLabel === 'home' ? 'custom-select-active' : ''} onClick={() => this.changeLabel('home')}>home</li>
                                        <li className={activeLabel === 'work' ? 'custom-select-active' : ''} onClick={() => this.changeLabel('work')}>work</li>
                                        <li className={activeLabel === 'other' ? 'custom-select-active' : ''} onClick={() => this.changeLabel('other')}>other</li>
                                    </ul>
                                : ''
                        }
                    </div>

                    <input
                        type="text"
                        name="phone_number"
                        onChange={this.handleChange}
                        value={this.state.phoneNumber.phone_number}
                        placeholder="e.g. +27 82 555 5555"
                    />
                    <button onClick={this.addPhoneNumber}>Add</button>
                </div>

            </div>
        );
    }
}

export default PhoneInput;