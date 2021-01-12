import React from 'react';
import css from './i.module.css'
import join from 'classnames'

const SimpleBtn = ({children, style, iclass, onClick}) => {
    return <div className={join(css.w, iclass)} style={style} onClick={onClick}>
        {children}
    </div>
}

export default SimpleBtn