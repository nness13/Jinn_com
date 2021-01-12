import React, {createRef, useEffect, useState} from 'react';
import {Field} from 'redux-form';
import join from 'classnames';
import mainCss from '../../../../../styles/Main.module.css';
import css from './InputTags.module.css';
import Switcher from '../../../../common/Switcher/Switcher';
import About from '../../../../common/AboutHolder/AboutHolder';


const InputTags = props => {
    const {title, about, propsSwitch, propsInput} = props;
    const [edit, setEdit] = useState(false);
    const input = createRef()

    useEffect(() => {
        const submit = e => {
            if(e.keyCode === 13){
                e.preventDefault()

                const value = input?.current?.value
                if(value){
                    input.current.value = ""
                    propsInput.formArrMethod.push(propsInput.name, value);
                }
            }
        }
        document.addEventListener('keydown', submit);
        return () => document.removeEventListener('keydown', submit);
    })

    return <div>
        <div className={join(css.title, edit && css.active)}>
            <div className={join(mainCss.row)}>
                <Field {...propsSwitch} callback={setEdit} component={Switcher}/>
                <div className={css.titleText} onClick={() => propsSwitch.change(propsSwitch.name, !edit)}>
                    {title}
                    <ion-icon name="chevron-down-outline" style={{fontSize: 14, marginLeft: 10}}/>
                </div>
            </div>
            <About>{about}</About>
        </div>
        {edit && <div className={css.area}>
            <div className={css.values}>
                <Field name={propsInput.name} component={props => <>
                    {props.input.value && props.input.value.map((el, k) =>
                        <div className={css.item} key={k}>
                            <div className={css.itemP}>
                                {el}
                                <div onClick={() => propsInput.formArrMethod.remove(propsInput.name, k)}>
                                    <ion-icon name="close-outline" style={{marginLeft:10, fontSize:14}}/>
                                </div>
                            </div>
                        </div>
                    )}
                </>}/>

            </div>
            <div className={css.form}>
                <input type="text" name="text" autoComplete="off" placeholder={"..."}
                       style={{background: "white", fontSize: "16px"}}
                       ref={input}
                />
            </div>
        </div>
        }

    </div>
};


export default InputTags;