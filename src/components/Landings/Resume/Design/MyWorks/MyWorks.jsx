import React from 'react';
import css from './i.module.css'
import CaseBlock from '../common/MyCaseBlock/MyCaseBlock';
import JinnGridTwoBlockContainer from '../common/JinnGridTwoBlockContainer/JinnGridTwoBlockContainer';
import SimpleBtn from '../common/SimpleBtn/SimpleBtn';

const MyWorks = ({title, subTitle, data = []}) => {
    return <div className={css.w} id={'Example'}>
        <div className={css.t_preset}>
            <SimpleBtn iclass={css.btn}>{title}</SimpleBtn>
            <div className={css.line}/>
            <div>{subTitle}</div>
        </div>
        <JinnGridTwoBlockContainer columns={"1fr 1fr"}>
            {data?.map(el => <CaseBlock data={el} key={el.title}/>)}
        </JinnGridTwoBlockContainer>
    </div>
}

export default MyWorks