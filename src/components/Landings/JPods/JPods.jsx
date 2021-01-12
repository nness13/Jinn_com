import React, {useEffect, useRef} from 'react';
import Preloader from '../../common/preloader/Preloader';
import {connect} from 'react-redux';
import NextCircle from '../../common/NextCircle/NextCircle';
import css from './JPods.module.css';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Phone from '../../common/Phone/Phone';

const JPods = ({isFetching}) => {
    useEffect(() => {
        const title = document.title
        document.title = "JPods"
        return () => document.title = title
    });


    return isFetching
        ? <div className={css.Container}><Preloader/></div>
        : <div id={"container"} className={css.Container}>
            <PreviewAppScreen/>
            <LastScreen/>
        </div>
}

export default connect(state => ({
    isFetching: false,
}), {})(JPods);


const PreviewAppScreen = props => {
    const nextScroll = () => {
        activeScroll = true;
        document.getElementById('container').scrollTo(
            {top: window.innerHeight - 40, behavior: "smooth"});
    }
    let activeScroll = false;

    return <div className={css.c_preview}>
        <div className={css.block}>
            <LazyLoadImage className={css.hand_pods}
                           alt="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                           effect="blur"
                           src="https://9to5mac.com/wp-content/uploads/sites/6/2016/09/airpods.png" />

            <div className={css.android_ok}>
                <LazyLoadImage alt="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                               effect="blur"
                               src="https://chastnik.ru/upload/iblock/bb2/bb2f96119c826d0179ce1c3edb8686a9.png" />
            </div>
            <a href="https://itclck.tk/53110128" className={`${css.load_app_btn} btn_buy`} download>Завантажити JPods</a>
        </div>
        <div className={`${css.block} ${css.phone_b}`}>
            <Phone videoUrl={"/assets/image/materials/connect.mp4"} videoEnd={() => {
                setTimeout(() => {if(!activeScroll) nextScroll()}, 1000)
            }}/>
        </div>
        <div style={{position: "absolute", bottom:"20px", width:"100vw", textAlign:"center"}}>
            <NextCircle next={() => {
                activeScroll = true
                setTimeout(nextScroll, 700)
            }}/>
            <div style={{paddingTop:"20px", color:"#c6c6c6"}}>Обрати</div>
        </div>
    </div>
}



const LastScreen = () => {
    const lScreen = useRef(null)
    useEffect(() => {
        setTimeout(() => {
            const el = document.getElementById("demo_p2");
            if(el) el.play();
        }, 2000)

        function handler(entries, observer) {
            for (let entry of entries) {
                if (entry.isIntersecting) window.runChat({botId: 1, autorun: true, miniView: false})
            }
        }
        let observer = new IntersectionObserver(handler, {threshold: 0.7});
        observer.observe(lScreen.current);
    },[])
    return <div className={`${css.c_preview} ${css.m_pab}`} ref={lScreen}>
        <div className={`${css.block}`}>
            <div className={css.decoration}>
                <div className={css.android2}>
                    <LazyLoadImage alt="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                   effect="blur"
                                   src="https://chastnik.ru/upload/iblock/bb2/bb2f96119c826d0179ce1c3edb8686a9.png" />
                </div>
                <div className={css.text2}>
                    Яблочна магія <br/> тепер на андроїд
                </div>
            </div>
            <Phone videoUrl={"/assets/image/materials/connect.mp4"}/>
        </div>
        <div className={`${css.block} ${css.jinn_div}`}>
            <div className={css.jinn}>
                <LazyLoadImage alt="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                               effect="blur"
                               style={window.innerWidth > 780 ? {transform: "scale(1.2)"} : {}}
                               src="/assets/main/jinnScholk.svg" />
            </div>
        </div>
    </div>
}