import React, { useEffect, useState } from "react";
import CoinInfo from "../Components/Common/Coin/CoinInfo";
import LineChart from "../Components/Common/Coin/LineChart";
import SelectDays from "../Components/Common/Coin/SelectDays";
import Loader from "../Components/Common/Loader";
import SelectCoins from "../Components/Compare/SelectCoins";
import Header from "../Components/Header";
import { coinObject } from "../functions/convertObject";
import getCoinData from "../functions/getCoinData";
import { getCoinPrices } from "../functions/getCoinPrices";
import settingChartData from "../functions/settingChartData";
import TogglePrices from "../Components/Common/Coin/PriceToggle";
import get100Coins from "../functions/get100Coins";

export default function ComparePage() {

    const[crypto1, setCrypto1] = useState("bitcoin")
    const[crypto2, setCrypto2] = useState("ethereum")
    const[crypto1Data, setCrypto1Data] = useState({})
    const[crypto2Data, setCrypto2Data] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const[days, setDays] = useState(365)
    const[priceType, setPriceType] = useState("prices")
    const[chartData, setChartData] = useState([])
    const [allCoins, setAllCoins] = useState([]);

    

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        setIsLoading(true);
        const coins = await get100Coins();
        if (coins) {
            setAllCoins(coins);
            const data1 = await getCoinData(crypto1);
            const data2 = await getCoinData(crypto2);
            setCrypto1Data(data1);
            setCrypto2Data(data2);
            if (data1 && data2) {
                // getPrices
                const prices1 = await getCoinPrices(crypto1, days, priceType);
                const prices2 = await getCoinPrices(crypto2, days, priceType);
                settingChartData(setChartData, prices1, prices2);
                setIsLoading(false);
            }
            }
        };

        useEffect(() => {
            // Perform an action after Crypto1Data is updated
            if (crypto1Data) {
                console.log('Crypto1Data has been updated:', crypto1Data);
            }
        }, [crypto1Data]);
    
        useEffect(() => {
            // Perform an action after Crypto2Data is updated
            if (crypto2Data) {
                console.log('Crypto2Data has been updated:', crypto2Data);
            }
        }, [crypto2Data]);

    async function handleDaysChange(event) {
        setIsLoading(true)
        setDays(event.target.value)
        const prices1 = await getCoinPrices(crypto1, days, priceType)
                const prices2 = await getCoinPrices(crypto2, days, priceType)
                settingChartData(setChartData, prices1, prices2)
                setIsLoading(false)
            }
    }

    const handlePriceTypeChange = async (event, newType) => {
        setIsLoading(true);
        setPriceType(event.target.value);
        const prices1 = await getCoinPrices(crypto1, days, newType)
        const prices2 = await getCoinPrices(crypto2, days, newType)
        settingChartData(setChartData, prices);
        setIsLoading(false);
        
    };


    const handleCoinChange = async (event, isCoin2) => {
        if(isCoin2){
            setCrypto2(event.target.value)
            const data = await getCoinData(event.target.value);
                coinObject(setCrypto2Data, data);
                const prices1 = await getCoinPrices(crypto1, days, priceType)

                const prices2 = await getCoinPrices(crypto2, days, priceType)
        
                settingChartData(setChartData, prices1, prices2)
                    setIsLoading(false)
                
        }
        else{
            setCrypto1(event.target.value)
            const data = await getCoinData(event.target.value);
                coinObject(setCrypto1Data, data)
        }

        return(
            <div>
                    <Header />
                    {isLoading ? (
                        <Loader />
                    ): (
                    <div className="coins-days-flex">
                    <SelectCoins
                    handleCoinChange={handleCoinChange}
                    crypto1={crypto1}  
                    crypto2={crypto2} />
                    <SelectDays days={days} handleDaysChange={handleDaysChange} noPTag={true}/>
                    </div>
        )}
        
        <div className="grey-wrapper" style={{padding: "0rem 1rem"}}>
                            <List coin={crypto1Data} />
                        </div>
        
        <div className="grey-wrapper" style={{padding: "0rem 1rem"}}>
                            <List coin={crypto2Data} />
                        </div>
        
                        <div className="grey-wrapper">
                        <TogglePrices 
                                priceType={priceType} 
                                handlePriceTypeChange={handlePriceTypeChange}
                            />
                    <LineChart chartData={chartData}
                    priceType={priceType}
                    multiAxis={true}/>
                </div>
        
                        <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc}/>
                        <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc}/>
                </div>
        )
        
        
        
    }






    

