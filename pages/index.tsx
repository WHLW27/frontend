import Form from "../components/Form";
import Result from "../components/Result";
import { useState } from "react";

export default function Calc() {
  const [state, setState] = useState({
    investAmount: 100,
    growthPercentage: 10,
    investPeriod: 5,
  });

  const updateValues = (newState) => {
    setState({
      ...state,
      ...newState,
    });
  };

  return (
    <div className="container">
      <img src="./ningi_logo.webp"></img>
      <h1>Investment Forecast Calculator</h1>
      <div className="wrapper">
        <Form state={state} updateValues={updateValues} />
        <Result state={state} />
      </div>
    </div>
  );
}

