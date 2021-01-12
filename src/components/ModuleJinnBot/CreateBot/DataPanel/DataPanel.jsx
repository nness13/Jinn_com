import React, {useRef} from 'react';
import join from 'classnames';
import cssDP from './DataPanel.module.css';
import mainCss from '../../../../styles/Main.module.css';
import cssText from '../../../../styles/Text.module.css';
import Select from 'react-select';
import Switcher from '../../../common/Switcher/Switcher';
import About from '../../../common/AboutHolder/AboutHolder';
import Modal from '../../../common/Modal/Modal';
import modalCss from '../../../common/Modal/Modal.module.css';


const DataPanel = ({bots, selectBot, saveBotStatus, selectBotAC, createBot, pushAlertAC}) => {
    const thisBot = bots.find(b => b.id === selectBot)
    const addBot = "addBot"
    const options = [...bots.map(el => ({label: el.name, value: el.id})), {label: "Додати...", value: addBot}]

    let modalAddBot = false;
    const inputName = useRef(null)

    let modalImport = false;

    return <div className={join(cssDP.dataPanel, mainCss.rowToColumn, mainCss.between)}>
        <div className={mainCss.column}>
            <div className={join(mainCss.easyBtn, mainCss.gradientText)}>Настрой своего Jinn</div>
            <div className={join(mainCss.rowToColumn)}>
                <div style={{width: 300}}>
                    <Select value={options.find(el => el.value === selectBot)}
                            onChange={e => {( e.value !== addBot) ? selectBotAC(e.value) : modalAddBot(true) }}
                            options={options}/>
                    <div className={mainCss.whiteBtn}>
                        <ion-icon name="settings-sharp"/>
                        <div>Настройки</div>
                    </div>
                    <Modal callback={(view, setView) => {modalAddBot = setView}}>
                        <div className={modalCss.content}>
                            <input ref={inputName} className={mainCss.whiteBtn} placeholder={"Введите имя бота"}/>
                        </div>
                        <div className={modalCss.bottomPanel}>
                            <div className={mainCss.btn} onClick={() => {
                                createBot(inputName.current.value)
                                modalAddBot(false)
                            }}>Создать</div>
                        </div>
                    </Modal>
                </div>
                <div className={mainCss.column}>
                    <div className={mainCss.rowToColumn}>
                        {options.length > 1
                            ? <div className={mainCss.row}>
                                <Switcher style={{paddingLeft: 10}}
                                          input={{
                                              value: thisBot?.status === "run",
                                              onClick: (e) => saveBotStatus(e.target.checked ? "run" : "default")
                                          }}/>
                                <div style={{padding: 10}}>Активировать?</div>
                                <About>Активирует бота</About>
                            </div>
                            : ""}
                        {thisBot?.status === "run" &&
                        <div style={{margin: "5px 10px", textAlign: "center"}}>
                            <div className={mainCss.whiteBtn}
                                 onClick={() => window.runChat({
                                     botId: selectBot,
                                     autorun: true,
                                     miniView: false
                                 })}>
                                <ion-icon name="chatbox-ellipses-outline"/>
                                <div>Открыть тестовый чат</div>
                            </div>
                            <div className={mainCss.whiteBtn} onClick={() => modalImport(true)}>
                                <ion-icon name="terminal-outline"/>
                                <div>Установить на сайт</div>
                            </div>
                            <Modal title={"Подключение на сайт"} callback={(view, setView) => {modalImport = setView}}>
                                <div className={modalCss.content}>
                                    <div>1. Скопируй строку</div>
                                    <div className={cssText.line} onClick={e => {
                                        let input = e.currentTarget.querySelector('input');
                                        input.select()
                                        input.setSelectionRange(0, 99999)
                                        document.execCommand("copy")
                                        pushAlertAC({text: "Текст скопировано"})
                                    }}>
                                        <input type="text" value={`<script async src=${"https://j-inn.com/api/get/cdn/"+selectBot+"/jinnchat.js"}></script>`}/>
                                        <ion-icon name="copy-outline"/>
                                    </div>
                                    <div>2. Установи на сайт</div>

                                </div>
                                <div className={modalCss.bottomPanel}>
                                    <div className={mainCss.btn} onClick={() => modalImport(false)}>Закрити</div>
                                </div>
                            </Modal>
                        </div>}
                    </div>
                </div>
            </div>
        </div>

        <div className={mainCss.column}>
            <div className={mainCss.whiteBtn}>
                <ion-icon name="play-outline"/>
                <div>Видео-инструкция</div>
            </div>
            <div className={mainCss.whiteBtn}>
                <ion-icon name="duplicate-outline"/>
                <div>Загрузить шаблон</div>
            </div>
        </div>

    </div>
}


export default DataPanel;