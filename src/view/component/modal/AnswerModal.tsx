import React from 'react';
import Modal from "../../component-library/modal/Modal";
import {useSelector} from "react-redux";
import {selectAllSections} from "../../../redux/survey";
import './AnswerModal.scss';
import {IoMdCloseCircle} from "react-icons/io";

function AnswerModal({isOpen, onClose}: {isOpen: boolean, onClose: () => void}) {

    const sections = useSelector(selectAllSections);

    return (
        <Modal isOpen={isOpen} onClose={onClose} className={"answer-modal"}>
            <h1>답변 보기</h1>
            <div className={"answer-modal-body"}>
                {sections.map(section => (
                    <div key={section.id} className={"answer-modal-section"}>
                        <h2 className={"answer-modal-section-title"}>{section.title}</h2>
                        {section.questions.map(question => (
                            <div key={question.id} className={"answer-modal-question"}>
                                <h3 className={"answer-modal-question-title"}>{question.question ? question.question : "질문"}</h3>
                                <p className={"answer-modal-question-answer"}>{question.answer ? question.answer.replaceAll(" | ", ", ") : "답변 없음"}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <button className={"answer-modal-close"} onClick={onClose}>
                <IoMdCloseCircle />
            </button>
        </Modal>
    );
}

export default AnswerModal;
