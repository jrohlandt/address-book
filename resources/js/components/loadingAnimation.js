import React from 'react';

const LoadingAnimation = (props) => {
    return (
        <div className="loading-overlay">
            <div className="loading-container">
                <div>Loading</div>
                <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingAnimation;