import React from "react";
import Xarrow from "react-xarrows";
import css from "./ConnectArrow.module.css";

const ConnectArrow = ({active, start, end}) => {
    return <div style={active ? {zIndex: 100} : {}} className={css.wrap}>
        <Xarrow start={start} end={end}
                path={'grid'} monitorDOMchanges={false}
                strokeWidth={1.5} headSize={5}
                startAnchor={"right"} endAnchor={"left"}
                color={active ? "var(--mainBlueLight)" : "var(--textColor)"}/>
    </div>
}

export default ConnectArrow