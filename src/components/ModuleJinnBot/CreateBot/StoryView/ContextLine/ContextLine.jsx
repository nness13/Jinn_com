import React from 'react';
import css from './ContextLine.module.css';
import cssCL from '../StoryView.module.css';

const ContextLine = ({contexts}) => {

    return <div className={cssCL.container}>
        <div className={css.tools}>
            {contexts?.map(c => <div key={c.id}>{c.name}</div>)}
        </div>
    </div>
}


export default ContextLine