import React from 'react';
import styleP from './preloader.module.css';

let Preloader = (props) => {
    return <div className={styleP.preloader}>
        <div className={styleP.cssload_container}>
            <div className={styleP.cssload_whirlpool}/>
        </div>
    </div>
}

export default Preloader;