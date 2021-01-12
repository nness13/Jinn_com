import React, {useState} from 'react'
import css from "./FieldPassword.module.css";

function FieldPassword(props) {
    const [hide, setHide] = useState(true)
    let input;
    function typePass () {
        setHide(true)
        input.setAttribute("type", "password")
    }
    function typeText (){
        setHide(false);
        input.setAttribute("type", "text")
    }

    return <div className={css.wrap}>
        <input type="password"
               ref={el => input = el}
               placeholder={props.hasOwnProperty("placeholder") ? props.placeholder : "Пароль"}
               {...props.input}
               name="password"/>
        <div className={css.hide} onClick={() => {hide ? typeText() : typePass()}}>
            {hide
                ? <ion-icon name="eye-off-sharp"/>
                : <ion-icon name="eye-sharp"/>
            }
        </div>
    </div>
}

export default FieldPassword