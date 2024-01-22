



export const getCurrency = async (req, res) => {
 

  const result = await fetch(`http://api.exchangerate.host/list?access_key=${process.env.EXCHANGE_RATE_KEY}`);

  const data = await result.json();


  res.json(data)
}

export const convertCurrency = async (req, res) =>{
    const {fromCurrency, toCurrency, amount} = req.body;

    const result = await fetch(`http://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}&access_key=${process.env.EXCHANGE_RATE_KEY}`);

    console.log("convert", result)

    const data = await result.json();

    res.json(data)

}