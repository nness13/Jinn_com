import React, {useEffect} from 'react';
import css from './i.module.css'
import Header from '../Header/Header'
import PreviewScreen from '../Preview/Preview'
import ServicesScreen from '../Services/Services'
import MyWorksScreen from '../MyWorks/MyWorks'

import {connect} from 'react-redux';
import {setNightModeAC} from '../../../../../redux/reducers/appReducer';
import {dataCaseSites, dataCaseFunnel} from '../../data'

const I = ({nightMode, setNightModeAC}) => {
    if(!nightMode) setNightModeAC(true)

    useEffect(() => {
        const title = document.title
        document.title = "NNESS"
        return () => document.title = title
    })

    useEffect(() => {
        return () => {if(nightMode) setNightModeAC(false)}
    }, [])

    return <div className={css.w} id={'scrollRoot'}>
        <Header/>
        <PreviewScreen title={"ЗНАКОМСТВО"} subTitle={"NNESS"}/>
        <ServicesScreen title={"УСЛУГИ"} subTitle={"ЧЕМ МОГУ ПОМОЧЬ"}/>
        <MyWorksScreen title={"МОИ РАБОТЫ"} subTitle={"ПРИМЕРЫ САЙТОВ"} data={dataCaseSites}/>

        {/*<Сonsultation/>*/}
    </div>
}

export default connect(null, {setNightModeAC})(I)