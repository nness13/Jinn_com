import React from 'react';
import css from './i.module.css'

const JinnGridTwoBlockContainer = ({children, style, rows, columns, autoRows, autoColumns, gap}) => {
    rows = rows || "1fr";
    columns = columns || "1fr";
    gap = gap ? gap+"px" : "20px"

    style = {...style,
        "--templateColumns": columns,
        "--templateRows": rows,
        "--autoColumns": autoRows || rows,
        "--autoRows": autoColumns || columns,
        "--gap": gap,
    }

    return <div className={css.w} style={style}>
        {children}
    </div>
}

export default JinnGridTwoBlockContainer