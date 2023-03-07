import Form from "../components/Form";
import HeroImage from "../components/HeroImage";
import { SetStateAction, useState } from "react";


// function to show and hide the chart
function showChart(): void {
  var caclChart = document.getElementById("chart-body");
  if (caclChart.style.display == "none") {
    caclChart.style.display = "block";
  } else {
    caclChart.style.display = "none";
  }
}

// this is the parent component that holds the form and the chart
export default function Home(): JSX.Element {
  // state to hold the values from the form
  const [state, setState] = useState({
    investAmount: '£' + 0,
    growthPercentage: 0.00 + '%',
    investPeriod: 0 + ' years',
    annualContribution: '£' + 0,
    monthlyContribution: '£' + 0,
  });

  // function to update the state
  function updateValues(newState: SetStateAction<{ investAmount: string; growthPercentage: string; investPeriod: string; }>): void {
    setState({
      ...state,
      ...newState,
    });
  }

  return (
    <div className="container">
      <HeroImage />
      <h1>Investment Forecast Calculator</h1>
      <div className="wrapper">
        <Form state={state} updateValues={updateValues} />
      </div>

    </div>
  );
}
