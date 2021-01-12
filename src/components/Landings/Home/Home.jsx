import React from 'react';
import css from './Home.module.css';
import mainCss from '../../../styles/Main.module.css';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import Phone from '../../common/Phone/Phone';
import join from 'classnames';

const Home = () => {
    return <div className={join(css.Container, mainCss.rowToColumn)}>
        <div className={join(css.block, mainCss.center)}>
            <div style={{display: 'flex',flexDirection: 'column', alignItems: 'center'}}>
                <h1>
                    Чат-бот увеличит твои продажи на 67%
                </h1>
                <div className={css.btn} onClick={() => window.runChat({autorun: true, miniView: false})}>Опробовать Jinn</div>
                <div className={css.f_btn}>Узнать больше</div>
            </div>
        </div>
        <div className={css.block}>
            <Phone videoUrl={"/assets/image/materials/param_bot.mp4"}/>
        </div>
    </div>
};

export default compose(
    withRouter
)(Home);