import SelectDays from "../Components/Common/Coin/SelectDays";
import SelectCoins from "../Components/Compare/SelectCoins";
import Header from "../Components/Header";
import React, { useState, useEffect } from "react";
import { getCoinPrices } from "../functions/getCoinPrices";
import { getCoinData } from "../functions/getCoinData";
import { coinObject } from "../functions/convertObject";
import settingChartData from "../functions/settingChartData";
import Loader from "../Components/Common/Loader";
import LineChart from "../Components/Common/Coin/LineChart";
import List from "../Components/Dashboard/List";
import TogglePrices from "../Components/Common/Coin/PriceToggle";

function ComparePage() {
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  const [crypto1Data, setCrypto1Data] = useState({});
  const [crypto2Data, setCrypto2Data] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [days, setDays] = useState(30);
  const [priceType, setPriceType] = useState("prices");
  const [chartData, setChartData] = useState({ datasets: [] });

  function handleDaysChange(event) {
    setDays(event.target.value);
  }

  useEffect(() => {
    getData();
  }, [crypto1, crypto2, days, priceType]);

  async function getData() {
    setIsLoading(true);
    const data1 = await getCoinData(crypto1);
    const data2 = await getCoinData(crypto2);

    if (data1) {
      coinObject(setCrypto1Data, data1);
    }
    if (data2) {
      coinObject(setCrypto2Data, data2);
    }

    if (data1 && data2) {
      const prices1 = await getCoinPrices(crypto1, days, priceType);
      const prices2 = await getCoinPrices(crypto2, days, priceType);

      if (prices1.length > 0 && prices2.length > 0) {
        settingChartData(setChartData, prices1, prices2);
      }
    }
    setIsLoading(false);
  }

  const handleCoinChange = async (event, isCoin2) => {
    setIsLoading(true);
    if (isCoin2) {
      setCrypto2(event.target.value);
      const data = await getCoinData(event.target.value);
      coinObject(setCrypto2Data, data);
    } else {
      setCrypto1(event.target.value);
      const data = await getCoinData(event.target.value);
      coinObject(setCrypto1Data, data);
    }

    const prices1 = await getCoinPrices(crypto1, days, priceType);
    const prices2 = await getCoinPrices(crypto2, days, priceType);

    if (prices1.length > 0 && prices2.length > 0) {
      settingChartData(setChartData, prices1, prices2);
    }

    setIsLoading(false);
  };

  const handlePriceTypeChange = async (event, newType) => {
    setIsLoading(true)
    setPriceType(newType)
    const prices = await getCoinPrices(id, days, newType)
    if( prices.length > 0){
      settingChartData(setChartData, prices)
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="coins-days-flex">
            <SelectCoins
              crypto1={crypto1}
              crypto2={crypto2}
              handleCoinChange={handleCoinChange}
            />
            <SelectDays
              days={days}
              handleDaysChange={handleDaysChange}
              noPTag={true}
            />
          </div>

          {/* Render List only if data is available */}
          <div className="grey-wrapper" style={{ padding: "0rem 1rem" }}>
            {crypto1Data && Object.keys(crypto1Data).length > 0 ? (
              <List coin={crypto1Data} />
            ) : (
              <p>No data available for {crypto1}.</p>
            )}
          </div>

          <div className="grey-wrapper" style={{ padding: "0rem 1rem" }}>
            {crypto2Data && Object.keys(crypto2Data).length > 0 ? (
              <List coin={crypto2Data} />
            ) : (
              <p>No data available for {crypto2}.</p>
            )}
          </div>
          

          <TogglePrices
          priceType={priceType} 
          handlePriceTypeChange={handlePriceTypeChange}
          />

          <div className="grey-wrapper">
            {chartData && chartData.datasets.length > 0 ? (
              <LineChart chartData={chartData} priceType={"prices"} />
            ) : (
              <p>No data available for the selected coins.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ComparePage;
