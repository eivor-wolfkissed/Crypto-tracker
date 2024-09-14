import React, { useEffect, useState } from "react";
import { get100Coins } from "../../../functions/get100Coins";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./styles.css";

function SelectCoins({ crypto1, crypto2, handleCoinChange }) {
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  const styles = {
    height: "2.5rem",
    color: "var(--white)",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--white)",
    },
    "& .MuiSvgIcon-root": {
      color: "var(--white)",
    },
    "&:hover": {
      "&& fieldset": {
        borderColor: "#3a80e9",
      },
    },
  };

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const myCoins = await get100Coins();
      setAllCoins(myCoins);
    } catch (error) {
      console.error("Error fetching coins: ", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  }

  // Render a loading message or skeleton while data is being fetched
  if (loading) {
    return <p>Loading coins...</p>;
  }

  return (
    <div className="coins-flex">
      <p>Crypto 1</p>
      <Select
        onChange={(event) => handleCoinChange(event, false)}
        sx={styles}
        value={crypto1}
        label="Crypto 1"
      >
        {allCoins.map((coin, i) => (
          <MenuItem key={i} value={coin.id}>
            {coin.name}
          </MenuItem>
        ))}
      </Select>

      <p>Crypto 2</p>
      <Select
        onChange={(event) => handleCoinChange(event, true)}
        sx={styles}
        value={crypto2}
        label="Crypto 2"
      >
        {allCoins.map((coin, i) => (
          <MenuItem key={i} value={coin.id}>
            {coin.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

export default SelectCoins;
