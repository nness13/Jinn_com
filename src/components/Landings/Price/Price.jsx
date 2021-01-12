import React, {useState} from "react";
import css from './Price.module.css';

const Page = (props) => {
    let [current, setCurrent] = useState(0);
    let time = {
            name: "Час до перших результатів",
            units: "днів",
            current: "1",
            max: "10",
        },
        users = {
            name: "Середні результати по користувачам",
            units: "переходів",
            current: "3000",
            max: "10000",
        },
        balance = {
            name: "Необхідний бюджет",
            units: "доларів",
            current: "2",
            max: "1000",
        },
        locality = {
            name: "Кращі результати направленої на місце реклами",
            units: "переходів",
            current: "800",
            max: "1000",
        }


    const cardData = [
        {
            title: "Стандартний",
            price: "50€",
            Content: props => {
                return <div>Налаштування рекламної компанії Facebook
                    <p>Працюєм на результат!</p>
                </div>
            },
            bars: [
                {...time, current: "1"},
                {...users, current: "3000"},
                {...balance, current: "200"},
                {...locality, current: "700"},
            ]
        }, {
            title: "Арбітраж",
            price: "100€",
            Content: props => {
                return <div>
                    Налаштовуєм рекламну компанію на нашому власному проекті по арбітражу<br/><br/>
                    (Хороший альтернативний метод показує прекрасні результати)
                </div>
            },
            bars: [
                {...time, current: "5"},
                {...users, current: "3000"},
                {...balance, current: "100"},
                {...locality, current: "800"},
            ]
        }, {
            title: "Альтернативні",
            price: "200€",
            Content: props => {
                return <div>
                    <ul>
                        <li>Реклама у блогерів</li>
                        <li>Розсилки</li>
                        <li>Масфоловінг</li>
                        <li>Маслайкінг</li>
                    </ul>
                </div>
            },
            bars: [
                {...time, current: "3"},
                {...users, current: "5000"},
                {...balance, current: "300"},
                {...locality, current: "100"},
            ]
        }]
    return <div className={css.wrapper}>
        <div className={css.frame}>
            {cardData.map((el, k) => {
                const {Content} = el
                return <div className={css.card} key={k} onMouseOver={() => setCurrent(k)}>
                    <div className={css.cardTop}>{el.title}</div>
                    <div className={css.cardInfo}>
                        <div className={css.cardCost}/>
                        {<Content/>}
                    </div>
                </div>
            })}

            <div className={css.bars}>
                <div>{cardData[current].title}</div>
                {cardData[current].bars.map((el, k) =>
                    <div className={css.stat} key={k}>
                        <div className={css.statInfo}>
                            <div>{el.name}: {el.current} {el.units}</div>
                            <div>{el.max} {el.units}</div>
                        </div>
                        <div className={css.statBar}>
                            <span style={{width: el.current / (el.max / 100) + '%'}}/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
};

export default Page;