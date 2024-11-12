import React, {useCallback, useContext} from 'react';
import {useDispatch} from "react-redux";
import './QuestionFooter.scss';
import {MdDeleteOutline, MdOutlineContentCopy} from "react-icons/md";
import {HiDotsVertical} from "react-icons/hi";
import Toggle from "react-toggle";
import "react-toggle/style.css"
import {copyQuestion, removeQuestion, updateQuestion} from "../../../redux/survey";
import useClickOutside from "../../../hook/useClickOutside";
import {questionContext} from "./Question";

function QuestionFooter() {

    const dispatch = useDispatch();

    const {sectionId, question} = useContext(questionContext);

    const [isShowMenu, setIsShowMenu] = React.useState(false);

    const onCopy = useCallback(() => {
        dispatch(copyQuestion({sectionId, question}));
    }, [dispatch, question, sectionId]);

    const onDelete = useCallback(() => {
        dispatch(removeQuestion({sectionId, questionId: question.id}));
    }, [dispatch, question.id, sectionId]);

    const onToggle = useCallback(() => {
        dispatch(updateQuestion({
            sectionId,
            question: {
                ...question,
                isRequired: !question.isRequired
            }
        }))

    }, [dispatch, question, sectionId]);

    const onMore = useCallback(() => {
        setIsShowMenu(true);
    }, []);

    const onToggleDescription = useCallback(() => {
        dispatch(updateQuestion({
            sectionId,
            question: {
                ...question,
                isShowDescription: !question.isShowDescription
            }
        }))
    }, [dispatch, question, sectionId]);

    const menuRef = useClickOutside({
        handler: () => setIsShowMenu(false)
    })

    return (
        <div className={"question-footer"} ref={menuRef}>
            <button className={"question-footer-button"} onClick={onCopy}>
                <MdOutlineContentCopy/>
            </button>
            <button className={"question-footer-button"} onClick={onDelete}>
                <MdDeleteOutline/>
            </button>
            <div className={"question-footer-divide"}/>
            <span className={"question-footer-toggle-label"}>필수</span>
            <Toggle
                checked={question.isRequired}
                icons={false}
                onChange={onToggle}/>
            <button className={"question-footer-button"} onClick={onMore}>
                <HiDotsVertical />
            </button>
            {isShowMenu && <div className={"question-footer-menu"}>
                <button className={"question-footer-menu-button"} onClick={onToggleDescription}>{question.isShowDescription ? "설명 끄기" : "설명 켜기"}</button>
            </div>}
        </div>
    );
}

export default QuestionFooter;
