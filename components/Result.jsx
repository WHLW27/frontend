import React from "react";

const Result = ({ state }) => {
    const { billAmount, tipPercentage, noOfPerson } = state;
    const totalTip = Number((state.billAmount * tipPercentage) / 100).toFixed(2);
    return (
        <div className="input-group">
            {/* <div className="warning-container">
                <div className="warning-group">
                    <p className="">Note:</p>
                    <p className="">It is important to understand that this calculator generates an estimate.
                    Values are provided by yourself, the user and are not guarunteed.
                    Values such as the Growth Percentage my flucuate throughout the term of your invesment.</p>
                </div>
            </div> */}
        </div>
    );
};

export default Result;