import React from 'react';
import css from './i.module.css'
import ReactPlayer from 'react-player';

const MyCaseBlock = ({data, style}) => {
    return <div className={css.w} style={style}>
        {data.videoPreview
            ? <div>
                <ReactPlayer url={data.videoPreview} controls width={"inherit"}
                             light={data.imgPreview}
                             config={{file: {attributes: {controlsList: 'nodownload'}}}}
                             onContextMenu={e => e.preventDefault()}/>
                <a className={css.caseTitleVideo} href={data.link} target={"_blank"}>{data.title}</a>
            </div>
            : data.imgPreview && <>
            <img src={data.imgPreview}/>
            <a className={css.caseTitle} href={data.link} target={"_blank"}>{data.title}</a>
        </>
        }
    </div>
}

export default MyCaseBlock