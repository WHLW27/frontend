import axios from "axios";

const handler = (req, res) => {
    if (req.method == "POST") {
        // Get data submitted in request's body.
        const body = req.body
        // const json = JSON.parse(body)
        // const body = JSON.parse(req.body)
        console.log(body)
        // Guard clause checks for first and last name,
        // and returns early if they are not found
        if (!body.calcData.investAmount || !body.calcData.investPeriod || !body.calcData.growthPercentage) {
            console.log("error")
            // Sends a HTTP bad request error code
            return res.status(400).json({ data: 'Form is not complete, please fill in missing fields.' })
        }
        console.log("good -1")
        const periodArray = [];
        const returnArray = [];
        var investValue = parseInt(body.calcData.investAmount);
        var duplicateValue = investValue;
        const growthPercent = body.calcData.growthPercentage / 100
        console.log(growthPercent)
        const growthValue = investValue * (1 + (growthPercent / 1));
        const periodValue = body.calcData.investPeriod;

        var principal = investValue;
        const n = 1;
        for (var i = 0; i <= (periodValue - 1); i++) {
            console.log("good 2")
            periodArray.push(i);
            const amount = principal * (Math.pow((1 + (growthPercent / n)), 1));
            const interest = amount - principal;
            var investValue = investValue + interest;
            var roundToTwo = Math.round(investValue * 100) / 100;
            returnArray.push(roundToTwo);
            principal = investValue;
        }

        const returnFront = {
            returnArray,
        }

        const returnData = {
            year0: duplicateValue,
            year1: returnArray[0],
            year2: returnArray[1],
            year3: returnArray[2],
            year4: returnArray[3],
            year5: returnArray[4]
        }


        saveFormData(returnData)
        return res.status(201).json({ returnFront })
    }
    else {
        return res.status(400).json({ data: 'Form is not complete, please fill in missing fields.' })
    }
    // res.status(200).json({ data: `${periodArray} ${body.investAmount} ${body.growthPercentage} ${body.investPeriod}` })
}

async function saveFormData(data) {
    axios.post("http://localhost:4000/api/v1/calculations", data)
    .then((response) => {
    //   var end_value = response.data.returnData.returnArray.slice(-1)[0]
      alert(`Is this your data: ${response}`)
    //   var find_window = document.getElementById("result-display")
    //   find_window.innerText = end_value
    });
  }

export default handler;