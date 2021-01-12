import React, {useRef} from 'react';
import css from './ToolsLine.module.css';
import cssCL from '../StoryView.module.css';
import Button from '../../../../common/Buttons/Button';
import Modal from '../../../../common/Modal/Modal';
import modalCss from '../../../../common/Modal/Modal.module.css';
import mainCss from '../../../../../styles/Main.module.css';


const ToolsLine = ({createContext}) => {
    let modalAddBot = false;
    const inputName = useRef(null)

    return <div className={cssCL.container}>
        <div className={css.tools}>
            <Button onClick={() => modalAddBot(true)}>Создать контекст</Button>
            <Modal title={"Контекст"} callback={(view, setView) => {modalAddBot = setView}}>
                <div className={modalCss.content}>
                    <input ref={inputName} className={mainCss.whiteBtn} placeholder={"Введите имя контекста"}/>
                </div>
                <div className={modalCss.bottomPanel}>
                    <div className={mainCss.btn} onClick={() => {
                        createContext(inputName.current.value)
                        modalAddBot(false)
                    }}>Создать</div>
                </div>
            </Modal>
        </div>
    </div>
}


export default ToolsLine