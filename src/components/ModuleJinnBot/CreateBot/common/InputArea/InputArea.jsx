import React, {useState} from 'react';
import {Field} from 'redux-form';
import join from 'classnames';
import mainCss from '../../../../../styles/Main.module.css';
import css from './InputArea.module.css';
import Switcher from '../../../../common/Switcher/Switcher';
import About from '../../../../common/AboutHolder/AboutHolder';


const InputArea = props => {
    const {title, about, propsSwitch, propsInput} = props;
    const [edit, setEdit] = useState(false);

    return <div>
        <div className={join(css.title, edit && css.active)}>
            <div className={join(mainCss.row)}>
                <Field {...propsSwitch} component={props => {
                    setEdit(props.input.value);
                    return <Switcher input={{...props.input}}/>
                }}/>
                <div className={css.titleText} onClick={() => propsSwitch.change(propsSwitch.name, !edit)}>
                    {title}
                    <ion-icon name="chevron-down-outline" style={{fontSize: 14, marginLeft: 10}}/>
                </div>
            </div>
            <About>{about}</About>
        </div>
        {edit && <div className={css.area}>
            <div className={css.form}>
                <Field {...propsInput} component={"textarea"}
                       style={{background: "white", fontSize: "16px", height: "100px", resize: "vertical", ...propsInput.style}}/>
            </div>
        </div>
        }

    </div>
};


export default InputArea;