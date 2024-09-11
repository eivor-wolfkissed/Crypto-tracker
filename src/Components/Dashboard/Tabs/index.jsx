import React, {useState} from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { createTheme, ThemeProvider } from '@mui/material';
import "./styles.css";
import Grid from "../Grid";
//import Button from '../../Common/Button';
import List from '../List';

export default function LabTabs({coins}) {
    const [value, setValue] = useState('grid');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const style = {
        color: "var(--white)",
        width: "50vw",
        fontWeight: 600,
        fontFamily: "Inter",
        textTransform: "capitalize"
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: "#3a80e9",
            },
        },
    })

    return (
        <ThemeProvider theme={theme}>
        <TabContext value={value}>
            <div>
            <TabList onChange={handleChange} aria-label="lab API tabs example" variant='fullWidth'>
                <Tab label="Grid" value="grid" sx={style}/>
                <Tab label="List" value="list" sx={style}/>
            </TabList>
            </div>
            <TabPanel value="grid">
                    <div className='grid-flex'>
                        {coins.map((coin,i) => {
                            return <Grid coin={coin} key={i} />
                        })}
                    </div>
            </TabPanel>
            <TabPanel value="list">
                <table className='list-table'>
                    {coins.map((item,i)=>{
                        return (
                            <List coin={item} key={i} />
                        )
                    })}</table>
            </TabPanel>
        </TabContext>
        </ThemeProvider>
    );
}
