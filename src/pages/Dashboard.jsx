import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import LabTabs from "../Components/Dashboard/Tabs";
import axios from "axios"
import Search from "../Components/Dashboard/Search";
import PaginationComponent from "../Components/Dashboard/Pagination";
import Loader from "../Components/Common/Loader"
import BackToTop from "../Components/Common/BackToTop";
import { get100Coins } from "../functions/get100Coins";

function DashboardPage (){

    const [page, setPage] = useState(1)
    const handlePageChange = (event, value) => {
        setPage(value);
        var previousIndex = (value-1)*10
        setPaginatedCoins(coins.slice(previousIndex, previousIndex + 10))
    }
    const [paginatedCoins, setPaginatedCoins] = useState([])
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("")

    const OnSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const[isLoading , setIsLoading] = useState(false)

    var filteredCoins = coins.filter((item) => 
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.symbol.toLowerCase().includes(search.toLowerCase())

)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const myCoins = await get100Coins()
        if(myCoins){
            setCoins(myCoins)
            setPaginatedCoins(myCoins.slice(0,30))
            setIsLoading(false)
        }
    }

    return(
        
    <>
    <Header />
    <BackToTop />
    {isLoading ?
        <Loader /> :
            <div>
                <Search search={search} onSearchChange={OnSearchChange}
                coins = {filteredCoins}
                />
                <LabTabs coins={search ? filteredCoins : paginatedCoins}
                />
                <PaginationComponent  page={page} handlePageChange={handlePageChange}/>
            </div>}
        </>
    )
}

export default DashboardPage