import React, { useState, useEffect } from "react";
import "./styles.css";
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { convertNumbers } from "../../../functions/convertNumbers"; // Importing convertNumbers

function List({ coin }) {

  const [formattedMarketCap, setFormattedMarketCap] = useState(coin.market_cap);
  const [formattedTotalVolume, setFormattedTotalVolume] = useState(coin.total_volume);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1100);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setFormattedMarketCap(convertNumbers(coin.market_cap));
      setFormattedTotalVolume(convertNumbers(coin.total_volume));
    } else {
      setFormattedMarketCap(coin.market_cap.toLocaleString());
      setFormattedTotalVolume(coin.total_volume.toLocaleString());
    }
  }, [coin.market_cap, coin.total_volume, isMobile]);

  if (!coin) {
    return null; // or return some placeholder UI
  }

  return (
    <table>
      <tbody>
        <tr className="list-row">
          <Tooltip title="Coin image">
            <td className="td-image">
              <Link to={`/coin/${coin.id}`}>
                <img src={coin.image} className="coin-logo" alt={coin.name} />
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

          <Tooltip title="Coin Price % Change in 24 hrs" placement="bottom-start">
            {coin.price_change_percentage_24h >= 0 ? (
              <td>
                <div className="chip-flex">
                  <div className="price-chip">
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </div>
                  <div className="icon-chip">
                    <TrendingUpRoundedIcon />
                  </div>
                </div>
              </td>
            ) : (
              <td>
                <div className="chip-flex">
                  <div className="price-chip chip-red">
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </div>
                  <div className="icon-chip-red">
                    <TrendingDownRoundedIcon />
                  </div>
                </div>
              </td>
            )}
          </Tooltip>

          <Tooltip title="Current price in USD" placement="bottom-end">
            <td>
              <h3
                className="coin-price td-center-align"
                style={{
                  color: coin.price_change_percentage_24h < 0 ? "#ce2525" : "var(--green)",
                }}
              >
                ${coin.current_price.toLocaleString()}
              </h3>
            </td>
          </Tooltip>

          <Tooltip title="Coin Total Volume" placement="bottom-end">
            <td>
              <p className="total-volume td-right-align">
                {formattedTotalVolume}
              </p>
            </td>
          </Tooltip>

          <Tooltip title="Coin Market Capital" placement="bottom-end">
            <td>
              <p className="marketcap td-right-align">
                {formattedMarketCap}
              </p>
            </td>
          </Tooltip>
        </tr>
      </tbody>
    </table>
  );
}

export default List;
