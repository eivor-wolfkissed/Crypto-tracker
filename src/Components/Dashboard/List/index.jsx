import React from "react";
import "./styles.css"
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Tooltip } from "@mui/material";
import { convertNumbers } from "../../../functions/convertNumbers";
import { Link } from "react-router-dom";

function List({coin}){

    if (!coin) {
        return null; // or return some placeholder UI
    }

    return (
        <Link to = {`/coin/${coin.id}`}>
        <tbody>
    <tr className="list-row">
        <Tooltip title="Coin image">
        <td className="td-image">
            <Link to={`/coin/${coin.id}`}>
            <img src={coin.image} className="coin-logo" />
            </Link>
        </td>
        </Tooltip>

        <Tooltip title="Coin Info" placement="bottom-start">
        <td>
            <Link to={`/coin/${coin.id}`}>
            <div className="name-col">
                <p className="coin-symbol">{coin.symbol}</p>
                <p className="coin-name">{coin.name}</p>
            </div>
            </Link>
        </td>
        </Tooltip>


            <Tooltip 
                title="Coin Price % Change in 24 hrs"
                placement="bottom-start"
            >
            {coin.price_change_percentage_24h >= 0 ? (
                <td>
                <div className="chip-flex">
                    <div className="price-chip">
                    {coin.price_change_percentage_24h.toFixed(2)}%
                    </div>
                    <div className="chip-icon td-chip-icon">
                    <TrendingUpRoundedIcon />
                    </div>
                </div>
                </td>
            ) : (
                <td>
                <div className="chip-flex">
                    <div className="price-chip red">
                    {coin.price_change_percentage_24h.toFixed(2)}%
                    </div>
                    <div className="chip-icon td-chip-icon red">
                    <TrendingDownRoundedIcon />
                    </div>
                </div>
                </td>
            )}
            </Tooltip>
            <Tooltip title="Current price in USD" placement="bottom-end" >
            <td>
                <h3 
                className="coin-price td-center-align"  
                    style={{
                        color:
                            coin.price_change_percentage_24h<0
                            ? "#ce2525"
                            : "var(--green)",
                    }}
                >
                ${coin.current_price.toLocaleString()}
                </h3>
            </td>
            </Tooltip>

            <Tooltip title="Coin Total Volume" placement="bottom-end" >
            <td>
                <p className="total-volume td-right-align">{coin.total_volume.toLocaleString()}</p>
            </td>
            </Tooltip>

            <Tooltip title="Coin Market Capital" placement="bottom-end" >
            <td>
                <p className="marketcap td-right-align">{coin.market_cap.toLocaleString()}</p>
    
            </td>
            </Tooltip>

            <Tooltip title="Coin Market Capital">
            <td className = "mobile-td-mkt">
                <p className="marketcap td-right-align">{convertNumbers(coin.market_cap)}</p>
    
            </td>
            </Tooltip>
        </tr>
    </tbody>
    </Link>
    )
}

export default List