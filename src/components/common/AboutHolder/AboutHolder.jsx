import React from "react";
import css from "./AboutHolder.module.css";

const About = props => {
    const {children} = props
    return <div className={css.placeholder} message={children}>
        <ion-icon name="help-circle-outline"/>
    </div>

}

export default About