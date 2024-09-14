import axios from "axios"
import React, {useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import CoinInfo from "../Components/Common/Coin/CoinInfo"
import LineChart from "../Components/Common/Coin/LineChart"
import TogglePrices from "../Components/Common/Coin/PriceToggle"
import SelectDays from "../Components/Common/Coin/SelectDays"
import Header from "../Components/Header"
import Loader from "../Components/Common/Loader"
import List from "../Components/Dashboard/List"
import { convertDate } from "../functions/convertDate" 
import { coinObject } from "../functions/convertObject"
import { getCoinData } from "../functions/getCoinData"
import { getCoinPrices } from "../functions/getCoinPrices"
import { settingChartData } from "../functions/settingChartData"

function CoinPage() {
  const {id} = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [coinData, setCoinData] = useState()
  const [days, setDays] = useState(60)
  const [chartData, setChartData] = useState({})
  const [priceType, setPriceType] = useState("prices")

  useEffect(() => {
    if (id) {
      getData()
    }
  }, [id])

  async function getData() {
    const data = await getCoinData(id)
    if(data) {
      coinObject(setCoinData, data)
      const prices = await getCoinPrices(id, days, priceType)
      if(prices.length > 0){
        settingChartData(setChartData, prices)
        setIsLoading(false)
      }
    }
  }

  const handleDaysChange = async (event) => {
    setIsLoading(true)
    setDays(event.target.value)
    const prices = await getCoinPrices(id, event.target.value, priceType)
    if(prices.length > 0) {
      settingChartData(setChartData, prices)
      setIsLoading(false)
    }
  }

  const handlePriceTypeChange = async (event, newType) => {
    setIsLoading(true)
    setPriceType(newType)
    const prices = await getCoinPrices(id, days, newType)
    if( prices.length > 0){
      settingChartData(setChartData, prices)
      setIsLoading(false)
    }
  }

  return(
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
        <div className="grey-wrapper" style={{padding: "0rem 1rem"}}>
          <List coin={coinData} />
        </div>
        <div className="grey-wrapper">
          <SelectDays days={days} handleDaysChange={handleDaysChange} />
          <TogglePrices
          priceType={priceType} 
          handlePriceTypeChange={handlePriceTypeChange}
          />
          <LineChart chartData={chartData} priceType={priceType} />
        </div>
        <CoinInfo heading={coinData.name} desc={coinData.desc} />
        </>
      )}
    </div>
  )
}

export default CoinPage