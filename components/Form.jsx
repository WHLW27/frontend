import axios from "axios";
import ChartRender from "./ChartRender";

// api url for the backend
const API_URL = "http://localhost:4000/api/v1/calculations";

// primary form component for the calculator page.
// This component is responsible for sending the data to the backend and rendering the chart
function Form({ state, updateValues }) {
  // set the initial state
  const { investAmount, growthPercentage, investPeriod, annualContribution, monthlyContribution } = state;


  // builds the data object to be sent to the backend
  async function onSubmit(event) {
    const calcData = {
      investAmount: Number(event.target.investAmount.value),
      growthPercentage: Number(event.target.growthPercentage.value),
      investPeriod: Number(event.target.investPeriod.value),
      annualContribution: Number(event.target.annualContribution.value),
      monthlyContribution: Number(event.target.monthlyContribution.value),
    };
    // prevent default form submission behaviour
    event.preventDefault();

    // send the data to the backend
    await saveFormData(calcData);
  }

  // reset button functionality
  function reloadPage() {
    window.location.reload();
  }

  // toggle display of contribution inputs
  function switchBasis() {
    var switchToggle = document.getElementById("cont-toggle");
    var labContToggle = document.getElementById("toggle-label");
    if (switchToggle.checked) {
      labContToggle.innerText = "Contribution Basis: Monthly";
      var monthly = document.getElementById("monthly_container");
      updateValues({
        annualContribution: '',
      })
      monthly.style.display = "flex";
      var annual = document.getElementById("annual_container");
      annual.style.display = "none";
    } else {
      labContToggle.innerText = "Contribution Basis: Annual";
      var monthly = document.getElementById("monthly_container");
      updateValues({
        monthlyContribution: '',
      })
      monthly.style.display = "none";
      var annual = document.getElementById("annual_container");
      annual.style.display = "flex";
    }
  }

  // enabled contribution inputs
  function enableConts() {
    let contCheck = document.getElementById("cont-check");
    let contToggle = document.getElementById("contribution-area");
    if (contCheck.innerText == "Add Contributions") {
      contCheck.innerText = "Remove Contributions";
      contToggle.style.display = "block";
      updateValues({
        monthlyContribution: '',
        annualContribution: '',
      })
    } else {
      contToggle.style.display = "none";
      contCheck.innerText = "Add Contributions";
    }

  }

  return (
    <form onSubmit={onSubmit}>
      <div className="input-container">
        <div className="form-container">
          <label htmlFor="investAmount">Initial Investment Value:</label>
          <div className="spliter"></div>
          <div className='input-box'>
            <span class="prefix">£</span>
            <input
              className="custom-tip-input"
              onChange={(e) => {
                updateValues({
                  investAmount: e.target.value,
                });
              }}
              value={investAmount}
              min={0.01}
              step={0.01}
              type="number"
              id="investAmount"
              name="investAmount"
              required />
          </div>

        </div>

        {/* <div className="form-container">
          <div className="spliter"></div>
          <button type="button" id="cont-check" onClick={enableConts}>Add Contributions</button>
        </div> */}

        <div id="contribution-area">

          <div className="form-container" id="btn-cont-toggle">
            <label htmlFor="cont-toggle" id="toggle-label">Contribution Basis: Annual</label>
            <div className="spliter"></div>
            <label className="switch">
              <input id="cont-toggle" type="checkbox" onClick={switchBasis} />
              <span className="slider round"></span>
            </label>

          </div>

          <div id="cont-input">
            <div className="form-container" id="annual_container">
              <label htmlFor="annualContribution">Annual Contributions:</label>
              <div className="spliter"></div>
              <div className='input-box'>
                <span class="prefix">£</span>
                <input
                  className="custom-tip-input"
                  onChange={(e) => {
                    updateValues({
                      annualContribution: e.target.value,
                    });
                  }}
                  value={annualContribution}
                  min={0.01}
                  step={0.01}
                  type="number"
                  id="annualContribution"
                  name="annualContribution" />
              </div>

            </div>

            <div className="form-container" id="monthly_container">
              <label htmlFor="monthlyContribution">Monthly Contributions:</label>
              <div className="spliter"></div>
              <div className='input-box'>
                <span class="prefix">£</span>
                <input
                  className="custom-tip-input"
                  onChange={(e) => {
                    updateValues({
                      monthlyContribution: e.target.value,
                    });
                  }}
                  value={monthlyContribution}
                  min={0.01}
                  step={0.01}
                  type="number"
                  id="monthlyContribution"
                  name="monthlyContribution" />
              </div>
            </div>
          </div>

        </div>

        <div className="form-container">
          <label htmlFor="investPeriod">Expected Growth (percentage):</label>
          <div className="spliter"></div>
          <div className='input-box'>

            <input
              className="custom-tip-input reduce"
              onChange={(e) => {
                updateValues({
                  growthPercentage: e.target.value < 0
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
              required />
            <span class="prefix">%</span>
          </div>

        </div>

        <div className="form-container">
          <label htmlFor="investPeriod">Investment Period (in years):</label>
          <div className="spliter"></div>
          <div className='input-box'>

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
              id="investPeriod"
              name="investPeriod"
              required />
            <span class="prefix">years</span>
          </div>

        </div>
        <div className="verical-spliter"></div>

        <div className="form-container">
          <div className="spliter"></div>
          <button id="submit-btn"
            type="submit"
            className="custom-tip-input btn-green"
          >Generate Forecast</button>

        </div>
        <button
          id="reset-btn"
          className="custom-tip-input btn-green"
          onClick={reloadPage}>
          Reset
        </button>
      </div>

      <div className="warning-container">
        <div className="warning-group">
          <p><strong>Note:</strong></p>
          <p className="muted">It is important to understand that this calculator generates an estimate.
            Values are provided by yourself, the user and are not guarunteed.
            Values such as the Growth Percentage my flucuate throughout the term of your invesment.</p>
          <div id="result-display">
            <p id="result-header"><strong>Final Value:</strong></p>
            <p id="result-value"></p>
            <ChartRender />
          </div>
        </div>
      </div>
    </form>
  );


  // sends form data to backend
  async function saveFormData(data) {
    var submit_button = document.getElementById("submit-btn");
    var reset_button = document.getElementById("reset-btn");
    var result_window = document.getElementById("result-display");
    var result_value = document.getElementById("result-value");
    result_window.style.display = "none";
    axios.post("http://localhost:4000/api/v2/calculation_data", data)
      .then((response) => {
        console.log(response);
        result_value.innerHTML = "£" + response.data.slice(-1)[0];

        submit_button.style.display = "none";
        reset_button.style.display = "block";
        result_window.style.display = "block";
        var end_value = response.data.slice(-1)[0];
        var start_value = response.data[0];
      });
  }
}

export default Form

