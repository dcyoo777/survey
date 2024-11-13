import React, {useCallback, useContext} from 'react';
import {questionContext} from "../Question";
import {useDispatch, useSelector} from "react-redux";
import {selectMode, updateQuestion} from "../../../../redux/survey";
import {QuestionRadioButtonType, SURVEY_MODE} from "../../../../redux/type";
import './QuestionSelect.scss';
import {EntityId} from "@reduxjs/toolkit";
import {IoMdClose} from "react-icons/io";
import Select, {SelectOptionId} from "../../../component-library/select/Select";
import QuestionOptionDrop from "./QuestionOptionDrop";
import QuestionOptionDrag from "./QuestionOptionDrag";

function QuestionSelect() {

    const dispatch = useDispatch();

    const {sectionId, question, isFocus} = useContext(questionContext) as {
        sectionId: EntityId,
        question: QuestionRadioButtonType,
        isFocus: boolean
    };

    const mode = useSelector(selectMode);

    const onSelectOption = useCallback((optionId: SelectOptionId) => {
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

    return (
        <div className={"question-radio-button"}>
            {mode === SURVEY_MODE.EDIT && <>
                {question.options.map((option, index) => {
                    return <QuestionOptionDrop type={"select"} questionKey={`${sectionId}-${question.id}`}
                                               option={option}>
                        <QuestionOptionDrag type={"select"} questionKey={`${sectionId}-${question.id}`}
                                            option={option}>
                            <div className={"question-radio-button-row"} key={`${sectionId}-${question.id}-${index}`}>
                                <span>{index + 1}</span>
                                <input className={"question-radio-button-label edit"} name={option.id.toString()}
                                       value={option.label}
                                       onChange={onChangeOptionLabel} placeholder={"옵션"}
                                       onBlur={(e) => {
                                           if (e.target.value === "") {
                                               removeOption(option.id);
                                           }
                                       }}/>
                                {isFocus && <button className={"question-radio-button-delete"} onClick={() => {
                                    removeOption(option.id)
                                }}>
                                    <IoMdClose/>
                                </button>}
                            </div>
                        </QuestionOptionDrag>
                    </QuestionOptionDrop>
                })}
                {isFocus && <div className={"question-radio-button-row"}>
                    <button className={"question-radio-button-add"} onClick={addOption}>
                        <span>{question.options.length + 1}</span>
                        <span className={"question-radio-button-add-label"}>옵션 추가</span>
                    </button>
                </div>}
            </>}
            {mode === SURVEY_MODE.VIEW &&
                <Select selectedOptionId={question.options.find(option => option.label === question.answer)?.id ?? ""}
                        setSelectedOptionId={onSelectOption}
                        options={[{id: "", label: "선택"}, ...question.options]}/>}

        </div>
    );
}

export default QuestionSelect;
