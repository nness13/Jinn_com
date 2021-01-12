import React from 'react';
import css from './i.module.css'
import join from 'classnames'
import SimpleBtn from '../common/SimpleBtn/SimpleBtn';
import TargetCircle from '../common/TargetCircle/TargetCircle';
import AboutMeBlocks from '../common/AboutMeBlocks/AboutMeBlocks';
import LightBeacon from '../common/LightBeacon/LightBeacon';
import NextCircle from '../../../../common/NextCircle/NextCircle';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {staticLinks} from '../../data';
import {to} from '../../../../../util';

const I = ({title, subTitle}) => {
    const isMobile = window.innerWidth < 780
    const me = {
        name: "Андрий Нестер",
//        img: "/assets/",
        img: "https://i.ibb.co/sRXGVBL/Photo-1604594520185-Processed1.png",
    }

    return <div className={css.w} id={'Preview'}>
        <div className={css.r_to_c}>
            <div className={css.box}>
                <div className={css.t_t}>
                    <div className={css.t_preset}>
                        <SimpleBtn iclass={css.btn}>{title}</SimpleBtn>
                        <div className={css.line}/>
                        <div>{subTitle}</div>
                    </div>
                    <div className={css.about}>
                        <div>Експерт в нишах маркетинга и WEB&#8209;разработки</div>
                        <div className={css.about_sub_t}>
                            <div>Основал digital&#8209;агенство</div>
                            <a>Media Jinn</a>
                        </div>
                    </div>
                    <div className={css.about_b_l}>
                        {/*<div>dsa</div>*/}
                        <div style={{fontSize: 15, textAlign: "center", fontWeight: "normal", marginRight: 150}}>
                            <div style={{marginBottom: 10}}>
                                <NextCircle next={() => to('Services')}/>
                            </div>
                            <div>Услуги</div>
                        </div>
                    </div>
                </div>

            </div>
            <div className={css.box}>
                <div className={css.img}>
                    <TargetCircle size={isMobile ? window.innerWidth*1.35 : 700}/>
                    <LightBeacon/>
                    <div className={css.lazyImg}>
                        <LazyLoadImage alt="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                       effect="blur"
                                       src={me.img} />
                    </div>
                    <AboutMeBlocks/>
                </div>
            </div>
        </div>
    </div>
}

export default I