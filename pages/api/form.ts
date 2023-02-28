export default function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body
    // const data = JSON.parse(body)

    // Optional logging to see the responses
    // in the command line where next.js app is running.
    console.log('body: ', body)

    // Guard clause checks for first and last name,
    // and returns early if they are not found
    if (!body.investAmount || !body.growthPercentage || !body.investPeriod) {
        // Sends a HTTP bad request error code
        return res.status(400).json({ data: 'Form is not complete, please fill in missing fields.' })
    }

    const periodArray = [];
    const returnArray = [];
    var investValue = parseInt(body.investAmount);
    const growthPercent = body.growthPercentage / 100
    const growthValue = investValue * (1 + (growthPercent / 1));
    const periodValue = body.investPeriod;

    var principal = investValue;
    const n = 1;
    for (var i = 0; i <= (periodValue - 1); i++) {
        periodArray.push(i);
        const amount = principal * (Math.pow((1 + (growthPercent / n)), 1));
        const interest = amount - principal;
        investValue = investValue + interest;
        var roundToTwo = Math.round(investValue * 100) / 100;
        returnArray.push(roundToTwo);
        principal = investValue;
    }

    // const amount = principal * (Math.pow((1 + (growthPercent / n)), (n * periodValue)));
    // const interest = amount - principal;
    // return interest;

    const returnJson = JSON.stringify(returnArray);
    const periodJson = JSON.stringify(periodArray);


    // Found the name.
    // Sends a HTTP success code
    res.status(200).json(returnJson)
    // res.status(200).json({ data: `${periodArray} ${body.investAmount} ${body.growthPercentage} ${body.investPeriod}` })
}