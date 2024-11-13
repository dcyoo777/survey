import React, {useCallback, useContext} from 'react';
import {questionContext} from "../Question";
import {useDispatch, useSelector} from "react-redux";
import {selectMode, updateQuestion} from "../../../../redux/survey";
import {
    QuestionRadioButtonType,
    SURVEY_MODE
} from "../../../../redux/type";
import './QuestionCheckbox.scss';
import {EntityId} from "@reduxjs/toolkit";
import {IoMdClose} from "react-icons/io";
import cn from "classnames";
import {clearContext} from "../../layout/RootLayout";
import QuestionOptionDrop from "./QuestionOptionDrop";
import QuestionOptionDrag from "./QuestionOptionDrag";

function QuestionCheckbox() {

    const dispatch = useDispatch();

    const {state: clearState} = useContext(clearContext);
    const {sectionId, question, isFocus} = useContext(questionContext) as {
        sectionId: EntityId,
        question: QuestionRadioButtonType,
        isFocus: boolean
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
        const checkbox = document.getElementById(`${sectionId}-${question.id}-0`) as HTMLInputElement;
        if (!checkbox.checked) {
            checkbox.click();
        }
    }, [dispatch, question, sectionId]);

    const onChangeCheckbox = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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
        const newId = Math.max(...question.options.map(option => option.id), 0) + 1;
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
        <div className={"question-checkbox"}>
            {question.options.map((option, index) => {
                return <QuestionOptionDrop type={"checkbox"} questionKey={`${sectionId}-${question.id}`} option={option}>
                    <QuestionOptionDrag type={"checkbox"} questionKey={`${sectionId}-${question.id}`} option={option}>
                        <div className={"question-checkbox-row"} key={`${sectionId}-${question.id}-${index}`}>
                            {clearState && <input id={`${sectionId}-${question.id}-${option.id}`} type={"checkbox"}
                                                  {...(mode === SURVEY_MODE.EDIT && {checked: false})}
                                                  name={`${sectionId}-${question.id}-answer`}
                                                  onChange={onChangeCheckbox}
                                                  disabled={mode !== SURVEY_MODE.VIEW}/>}
                            {mode === SURVEY_MODE.VIEW && <label className={"question-checkbox-label"}
                                                                 htmlFor={`${sectionId}-${question.id}-${option.id}`}>
                                {option.label}
                            </label>}
                            {mode === SURVEY_MODE.EDIT &&
                                <input className={"question-checkbox-label edit"} name={option.id.toString()}
                                       value={option.label}
                                       onChange={onChangeOptionLabel} placeholder={"옵션"}
                                       onBlur={(e) => {
                                           if (e.target.value === "") {
                                               removeOption(option.id);
                                           }
                                       }}
                                       disabled={mode !== SURVEY_MODE.EDIT}/>}
                            {mode === SURVEY_MODE.EDIT && isFocus &&
                                <button className={"question-checkbox-delete"} onClick={() => {
                                    removeOption(option.id)
                                }}>
                                    <IoMdClose/>
                                </button>}
                        </div>
                    </QuestionOptionDrag>
                </QuestionOptionDrop>
            })}
            {question.isEtc && <div className={"question-checkbox-row"}>
                {clearState && <input id={`${sectionId}-${question.id}-0`} type={"checkbox"}
                                      {...(mode === SURVEY_MODE.EDIT && {checked: false})}
                                      name={`${sectionId}-${question.id}-answer`}
                                      onChange={onChangeCheckbox}
                                      disabled={mode !== SURVEY_MODE.VIEW}/>}
                {mode === SURVEY_MODE.EDIT && <div className={cn("question-checkbox-label VIEW")}>기타</div>}
                {mode === SURVEY_MODE.VIEW && clearState && <input id={`${sectionId}-${question.id}-etc`}
                                                                   className={cn("question-checkbox-label etc")}
                                                                   onChange={onChangeEtc} placeholder={"기타"}/>}
                {mode === SURVEY_MODE.EDIT && isFocus &&
                    <button className={"question-checkbox-delete"} onClick={toggleEtc}>
                        <IoMdClose/>
                    </button>}
            </div>}
            {mode === SURVEY_MODE.EDIT && isFocus && <div className={"question-checkbox-row"}>
                <button className={"question-checkbox-add"} onClick={addOption}>
                    <input type={"checkbox"} disabled={true}/>
                    <span className={"question-checkbox-add-label"}>옵션 추가</span>
                </button>
                {!question.isEtc && <>
                    <span className={"question-checkbox-or"}>또는</span>
                    <button className={"question-checkbox-add-etc"} onClick={toggleEtc}>기타 추가</button>
                </>}
            </div>}

        </div>
    );
}

export default QuestionCheckbox;
