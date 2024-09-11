import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../Components/Header";
import Loader from "../Components/Common/Loader";
import { coinObject } from "../functions/convertObject";
import  List  from "../Components/Dashboard/List";
import CoinInfo from "../Components/Common/Coin/CoinInfo"
import { getCoinPrices } from "../functions/getCoinPrices";
import LineChart from "../Components/Common/Coin/LineChart";
import { convertDate } from "../functions/convertDate";
import SelectDays from "../Components/Common/Coin/SelectDays";
import settingChartData from "../functions/settingChartData";
import TogglePrices from "../Components/Common/Coin/PriceToggle";
import getCoinData from "../functions/getCoinData";


function Coin() {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState({ labels: [], datasets: [{}] });
  const [coin, setCoin] = useState({});
  const [days, setDays] = useState(30);
  const [priceType, setPriceType] = useState("prices");

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    setIsLoading(false);
    let coinData = await getCoinData(id, setError);
    console.log("Coin DATA>>>>", coinData);
    //settingCoinObject(coinData, setCoin);
    if (coinData) {
      const prices = await getCoinPrices(id, days, priceType, setError);
      if (prices) {
        settingChartData(setChartData, prices);
        setIsLoading(false);
      }
    }
  };

  const handleDaysChange = async (event) => {
    setIsLoading(false);
    setDays(event.target.value);
    const prices = await getCoinPrices(id, event.target.value, priceType, setError);
    if (prices) {
      settingChartData(setChartData, prices);
      setIsLoading(false);
    }
  };

  const handlePriceTypeChange = async (event) => {
    setIsLoading(false);
    setPriceType(event.target.value);
    const prices = await getCoinPrices(id, days, event.target.value, setError);
    if (prices) {
      settingChartData(setChartData, prices);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      {!error && !isloading && coin.id ? (
        <>
          <div className="grey-wrapper">
            <List coin={coin} delay={0.5} />
          </div>
          <div className="grey-wrapper">
            <SelectDays handleDaysChange={handleDaysChange} days={days} />
            <ToggleComponents
              priceType={priceType}
              handlePriceTypeChange={handlePriceTypeChange}
            />
            <LineChart chartData={chartData} />
          </div>
          <Info title={coin.name} desc={coin.desc} />
        </>
      ) : error ? (
        <div>
          <h1 style={{ textAlign: "center" }}>
            Sorry, Couldn't find the coin you're looking for 😞
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2rem",
            }}
          >
            <a href="/dashboard">
              <Button text="Dashboard" />
            </a>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Coin;




