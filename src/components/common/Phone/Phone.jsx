import React from 'react';
import css from './i.module.css';
import ReactPlayer from 'react-player';
import {useInView} from 'react-intersection-observer';

const Phone = ({videoUrl, videoEnd}) => {
    const [ref, inView] = useInView({
        threshold: 0.1,
    })

    return <div ref={ref} className={css.phone_demo}>
        <div className={css.wrapper}>
            <div className={css.demo_div}>
                {inView && <ReactPlayer className={css.demo_video} url={videoUrl} playsinline playing muted onEnded={videoEnd}/>}
            </div>
            <img className={css.phone} src="/assets/image/ramka-min.png"/>
        </div>
    </div>
}

export default Phone