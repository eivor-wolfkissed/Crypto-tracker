import axios from "axios"

export const getCoinPrices = (id, priceType) => {
    const prices = axios
    .get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=365&interval=daily&precision=5&x_cg_demo_api_key=CG-nNwiPf5fnZ49UJv9ig3rChjv`
        )
        .then((response) => {
            console.log("Prices>>>>", response.data.prices)
            return response.data[priceType]
        })
        .catch((error) => {
            console.log("ERROR>>>", error)
            
        }
    )
    return prices
}