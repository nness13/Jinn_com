import React, {useState} from "react";
import css from './NextCircle.module.css';

const NextCircle = ({next}) => {
    const [action, setAction] = useState(false)
    const actionF = () => {
        if(next){
            setAction(true)
            next()
            setTimeout(() => {
                setAction(false)
            } ,2000)
        }
    };
    return (
        <div className={css.nextContainer} action={action ? "active" : "false"}>
            <div className={css.Shadow} onClick={actionF}>
                <div className={css.next}>
                    <div className={css.Arrow}/>
                </div>
            </div>
        </div>
    );
};

export default NextCircle;