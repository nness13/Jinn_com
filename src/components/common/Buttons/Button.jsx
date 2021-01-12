import React from "react";

const Button = props => {
    const {children} = props
    return <button className={"btn_buy"} {...props}>
        {children}
    </button>
}

export default Button