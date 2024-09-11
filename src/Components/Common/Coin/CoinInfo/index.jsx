import React, { useState } from "react";
import "./styles.css"

export default function CoinInfo({heading, desc = ""}) {

    const longDesc = desc
    const shortDesc = desc.slice(0,350) + "<span style='color:var(--grey)>Read More...</span>"

    const[flag, setFlag] = useState(false)

    return(
        <div className="grey-wrapper" style={{padding: "0rrem 1rem"}}>
            <h2 className="coin-info-heading">{heading}</h2>

            {desc.length > 350 ? (
                <p 
                    onClick = {() =>setFlag(!flag)}
                    className="coin-info-desc" dangerouslySetInnerHTML={{__html:!flag ? shortDesc : longDesc}} />
            ) : (
                <p dangerouslySetInnerHTML={{__html:desc}} />
            )
                    }
        </div>
    )
}