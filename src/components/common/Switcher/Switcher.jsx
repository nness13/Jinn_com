import React, {useState} from "react";
import {generateRandomString} from "../../../util";
import css from './Switcher.module.css'
import join from 'classnames'

const Switcher = ({input, callback, loading, style}) => {
    const [id] = useState(generateRandomString())
    callback && callback(input.value)
    return <div style={style}>
        <input type="checkbox" id={id}
               className={css.checkbox}
               checked={input.value}
               {...input}
        />
        <label htmlFor={id} className={join(css.switch, loading && css.loading)}/>
    </div>
}

export default Switcher