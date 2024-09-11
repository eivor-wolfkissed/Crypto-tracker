import axios from "axios";

export const get100Coins = () => {
    const myCoins =
    axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ids&category=layer-1&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h&locale=en&precision=5&x_cg_demo_api_key=	CG-nNwiPf5fnZ49UJv9ig3rChjv"
        )
.then((response) => {
    console.log("RESPONSE>>>", response)
    return response.data
})
.catch((error) => {
    console.log("ERROR>>>", error)
})

return myCoins
}

export default get100Coins
