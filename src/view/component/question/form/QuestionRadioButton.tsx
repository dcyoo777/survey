import React, {useCallback, useContext, useEffect} from 'react';
import {questionContext} from "../Question";
import {useDispatch, useSelector} from "react-redux";
import {selectMode, updateQuestion} from "../../../../redux/survey";
import {QuestionRadioButtonType, SURVEY_MODE} from "../../../../redux/type";
import './QuestionRadioButton.scss';
import {EntityId} from "@reduxjs/toolkit";
import {IoMdClose} from "react-icons/io";
import cn from "classnames";

function QuestionRadioButton() {

    const dispatch = useDispatch();

    const {sectionId, question} = useContext(questionContext) as {
        sectionId: EntityId,
        question: QuestionRadioButtonType
    };

    const mode = useSelector(selectMode);

    const onChangeEtc = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateQuestion({
            sectionId,
            question: {
                ...question,
                answer: e.target.value
            }
        }));
        document.getElementById(`${sectionId}-${question.id}-0`)?.click();
    }, [dispatch, question, sectionId]);

    const onChangeRadioButton = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const {id} = e.target;
        const optionId = parseInt(id.split("-")[2])
        dispatch(updateQuestion({
            sectionId,
            question: {
                ...question,
                answer: question.options.find(option => option.id === optionId)?.label ?? ""
            }
        }));
    }, [dispatch, question, sectionId]);

    const onChangeOptionLabel = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        const options = question.options.map(option => {
            if (option.id === parseInt(name)) {
                return {
                    ...option,
                    label: value
                }
            }
            return option;
        })

        dispatch(updateQuestion({
            sectionId,
            question: {
                ...question,
                options
            }
        }));
    }, [dispatch, question, sectionId]);

    const addOption = useCallback(() => {
        const newId = (question.options?.slice(-1)[0]?.id ?? 0) + 1;
        dispatch(updateQuestion({
            sectionId,
            question: {
                ...question,
                options: [...question.options, {
                    id: newId,
                    label: `옵션 ${newId}`
                }]
            }
        }));
    }, [dispatch, question, sectionId]);

    const removeOption = useCallback((optionId: number) => {
        dispatch(updateQuestion({
            sectionId,
            question: {
                ...question,
                options: question.options.filter(option => option.id !== optionId)
            }
        }));
    }, [dispatch, question, sectionId]);

    const toggleEtc = useCallback(() => {
        dispatch(updateQuestion({
            sectionId,
            question: {
                ...question,
                isEtc: !question.isEtc
            }
        }));
    }, [dispatch, question, sectionId]);

    return (
        <div className={"question-radio-button"}>
            {question.options.map((option, index) => {
                return <div className={"question-radio-button-row"} key={`${sectionId}-${question.id}-${index}`}>
                    <input id={`${sectionId}-${question.id}-${option.id}`} type={"radio"}
                           {...(mode === SURVEY_MODE.EDIT && {checked: false})}
                           name={`${sectionId}-${question.id}-answer`}
                           onChange={onChangeRadioButton}
                           disabled={mode !== SURVEY_MODE.VIEW}/>
                    {mode === SURVEY_MODE.VIEW && <label className={"question-radio-button-label"}
                                                         htmlFor={`${sectionId}-${question.id}-${option.id}`}>
                        {option.label}
                    </label>}
                    {mode === SURVEY_MODE.EDIT &&
                        <input className={"question-radio-button-label edit"} name={option.id.toString()}
                               value={option.label}
                               onChange={onChangeOptionLabel} placeholder={"짧은 답변을 입력해주세요."}
                               disabled={mode !== SURVEY_MODE.EDIT}/>}
                    {mode === SURVEY_MODE.EDIT && <button className={"question-radio-button-delete"} onClick={() => {
                        removeOption(option.id)
                    }}>
                        <IoMdClose/>
                    </button>}
                </div>
            })}
            {question.isEtc && <div className={"question-radio-button-row"}>
                <input id={`${sectionId}-${question.id}-0`} type={"radio"}
                       name={`${sectionId}-${question.id}-answer`}
                       onChange={onChangeRadioButton}
                       disabled={mode !== SURVEY_MODE.VIEW}/>
                {mode === SURVEY_MODE.EDIT && <div className={cn("question-radio-button-label VIEW")}>기타</div>}
                {mode === SURVEY_MODE.VIEW && <input id={`${sectionId}-${question.id}-etc`}
                                                     className={cn("question-radio-button-label etc")}
                                                     onChange={onChangeEtc} placeholder={"기타"}/>}
                {mode === SURVEY_MODE.EDIT && <button className={"question-radio-button-delete"} onClick={toggleEtc}>
                    <IoMdClose/>
                </button>}
            </div>}
            {mode === SURVEY_MODE.EDIT && <div className={"question-radio-button-row"}>
                <button className={"question-radio-button-add"} onClick={addOption}>
                    <input type={"radio"} disabled={true}/>
                    <span className={"question-radio-button-add-label"}>옵션 추가</span>
                </button>
                {!question.isEtc && <>
                    <span className={"question-radio-button-or"}>또는</span>
                    <button className={"question-radio-button-add-etc"} onClick={toggleEtc}>기타 추가</button>
                </>}
            </div>}

        </div>
    );
}

export default QuestionRadioButton;
