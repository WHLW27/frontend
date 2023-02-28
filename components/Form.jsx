import React from "react";

export default function PageWithJSbasedForm({state, updateValues}) {
    const { investAmount, growthPercentage, investPeriod } = state;
    // Handles the submit event on form submit.
    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Get data from the form.
        const data = {
            investAmount: event.target.investAmount.value,
            growthPercentage: event.target.growthPercentage.value,
            investPeriod: event.target.investPeriod.value,
        }

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)

        // API endpoint where we send form data.
        const endpoint = '/api/form'

        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options)

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json()
        alert(`Is this your data: ${result.data}`)
    }
    return (
        // We pass the event to the handleSubmit() function on submit.
        <form action="/api/form" method="post" className="form-center">
            <div className="input-container">
                <div className="form-container">
                    <label htmlFor="investAmount">Initial Investment Value:</label>
                    <div className="spliter"></div>
                    <input
                        className="custom-tip-input"
                        onChange={(e) => {
                            updateValues({
                                investAmount: e.target.value,
                            });
                        }}
                        value={investAmount}
                        type="number"
                        id="investAmount"
                        name="investAmount"
                        placeholder="£10,000"
                        required
                    />
                </div>

                <div className="form-container">
                    <label htmlFor="investPeriod">Expected Growth (percentage):</label>
                    <div className="spliter"></div>
                    <input
                        className="custom-tip-input reduce"
                        onChange={(e) => {
                            updateValues({
                                growthPercentage:
                                    e.target.value < 0
                                        ? 0
                                        : e.target.value > 100
                                            ? 100
                                            : e.target.value,
                            });
                        }}
                        value={growthPercentage}
                        max={100.00}
                        min={0.00}
                        step={0.01}
                        type="number"
                        id="growthPercentage"
                        name="growthPercentage"
                        placeholder="4%"
                        required
                    />
                </div>

                <div className="form-container">
                    <label htmlFor="investPeriod">Investment Period (in years):</label>
                    <div className="spliter"></div>
                    <input
                        className="custom-tip-input reduce"
                        onChange={(e) => {
                            updateValues({
                                investPeriod: e.target.value,
                            });
                        }}
                        value={investPeriod}
                        max={100}
                        min={1}
                        type="number"
                        placeholder="1 year"
                        id="investPeriod"
                        name="investPeriod"
                        required
                    />
                </div>
                <div className="verical-spliter"></div>

                <div className="form-container">
                    <div className="spliter"></div>
                    <button
                        type="submit"
                        className="custom-tip-input btn-green"
                    >Generate Forecast</button>
                </div>
            </div>

            <div className="warning-container">
                <div className="warning-group">
                    <p><strong>Note:</strong></p>
                    <p className="muted">It is important to understand that this calculator generates an estimate.
                        Values are provided by yourself, the user and are not guarunteed.
                        Values such as the Growth Percentage my flucuate throughout the term of your invesment.</p>
                </div>
            </div>
        </form>
    )
}



