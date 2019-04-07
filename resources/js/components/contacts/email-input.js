import React from "react";

import { FiChevronDown } from 'react-icons/fi';

class EmailInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {type: 'work', email_address: ''},
            showLabels: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.changeLabel = this.changeLabel.bind(this);
        this.toggleShowLabels = this.toggleShowLabels.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    changeLabel(label) {
        let item = {...this.state.item};
        item.type = label;
        this.setState({item, showLabels: false});
    }

    toggleShowLabels() {
        this.setState({showLabels: !this.state.showLabels});
    }

    handleChange(e) {
        let item = {...this.state.item};
        if (e.target.name === 'item_input') {
            item.email_address = e.target.value;
        }

        this.setState({item});
    }

    addItem() {
        const item = this.state.item;
        if (item.type === '' || item.email_address === '') {
            return;
        }
        this.props.addItem(this.state.item);

        if (item.email_address.length > 256 || item.email_address.indexOf('@') < 1) {
            return;
        }
        this.setState({item: {type: 'work', email_address: ''}});
    }

    render() {
        const activeLabel = this.state.item.type;
        return (
            <div className="custom-select">
                <div>
                    <div
                        className="custom-select-label"
                        onClick={this.toggleShowLabels}
                    >
                        {activeLabel}
                        <span><FiChevronDown /></span>
                        {
                            this.state.showLabels
                                ?   <ul className="custom-select-label-list">
                                    <li className={activeLabel === 'home' ? 'custom-select-active' : ''} onClick={() => this.changeLabel('home')}>home</li>
                                    <li className={activeLabel === 'work' ? 'custom-select-active' : ''} onClick={() => this.changeLabel('work')}>work</li>
                                    <li className={activeLabel === 'other' ? 'custom-select-active' : ''} onClick={() => this.changeLabel('other')}>other</li>
                                </ul>
                                : ''
                        }
                    </div>

                    <input
                        type="text"
                        name="item_input"
                        onChange={this.handleChange}
                        value={this.state.item.email_address}
                        placeholder="name@example.com"
                    />
                </div>
                <div className="custom-select-done" onClick={this.addItem}>done</div>
            </div>

        );
    }
}

export default EmailInput;