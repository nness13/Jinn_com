import React from 'react';
import join from 'classnames';
import mainCss from '../../../../../styles/Main.module.css';
import {Field} from 'redux-form';
import Switcher from '../../../../common/Switcher/Switcher';
import About from '../../../../common/AboutHolder/AboutHolder';


const AreaSwitch = ({propsSwitch, title, about}) => {
    return <div className={join(mainCss.row, mainCss.between)} style={{padding: "0 5px"}}>
        <div className={join(mainCss.row)}>
            <Field {...propsSwitch} component={Switcher}/>
            <div style={{padding: 10, cursor: "pointer", color: "var(--linkColor)"}}>{title}</div>
        </div>
        <About>{about}</About>
    </div>
}

export default AreaSwitch