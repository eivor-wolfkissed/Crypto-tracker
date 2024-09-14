import axios from "axios";

export const getCoinPrices = async (id, days, priceType) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily&precision=5&x_cg_demo_api_key=CG-nNwiPf5fnZ49UJv9ig3rChjv`
      );
  
      // List of valid price types
      const validPriceTypes = ["prices", "market_caps", "total_volumes"];
  
      // Log response data for debugging
      console.log("Response data:", response.data);
  
      if (response.data && validPriceTypes.includes(priceType)) {
        console.log("Prices>>>>", response.data[priceType]);
        return response.data[priceType];
      } else {
        console.error(`Price type "${priceType}" not found in response. Available types: ${validPriceTypes.join(", ")}`);
        return []; // Return an empty array as a fallback
      }
    } catch (error) {
      console.error("Error fetching coin prices:", error);
      return []; // Return an empty array if there’s an error
    }
  };
  