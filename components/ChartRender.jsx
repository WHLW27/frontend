import React from "react";
import Chart from "./Chart";


// This component will render the chart via a toggle button
class ChartRenderer extends React.Component {
    // set the initial state
    state = {
        visible: false,
        text: "View the chart" // "Hide the chart"
    };

    render() {
        return (
            <div id="toggler">
                <button id="toggler" className="custom-tip-input btn-orange" onClick={() => this.setState({ visible: !this.state.visible, text: !this.state.text })}> {this.state.text} </button>
                {this.state.visible && <Chart />}
            </div>
        );
    }
}

export default ChartRenderer;
