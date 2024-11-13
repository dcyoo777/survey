import {QuestionCheckboxType, QuestionOptionType} from "../../../../redux/type";
import React, {useContext} from "react";
import {useDispatch} from "react-redux";
import {questionContext} from "../Question";
import {EntityId} from "@reduxjs/toolkit";
import {useDrop} from "react-dnd";
import {updateQuestion} from "../../../../redux/survey";
import cn from "classnames";
import './QuestionOption.scss';


const QuestionOptionDrop = ({type, questionKey, option, children}: {type: string, questionKey: string, option: QuestionOptionType, children: React.ReactNode}) => {

    const dispatch = useDispatch();

    const {sectionId, question} = useContext(questionContext) as {sectionId: EntityId, question: QuestionCheckboxType};

    const [{isOver}, drop] = useDrop({
        accept: [`${questionKey}-${type}`],
        hover: async (item: {option: QuestionOptionType}) => {
            if (option.id !== item.option.id) {
                const dragIndex = question.options.findIndex(o => o.id === item.option.id)
                const dropIndex = question.options.findIndex(o => o.id === option.id)

                const reorderedOptions: QuestionOptionType[] = [...question.options];
                [reorderedOptions[dragIndex], reorderedOptions[dropIndex]] = [reorderedOptions[dropIndex], reorderedOptions[dragIndex]]

                dispatch(updateQuestion({
                    sectionId,
                    question: {
                        ...question,
                        options: reorderedOptions
                    }
                }))
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    })

    return (
        <div ref={drop} className={cn("question-option-drop", {over: isOver})}>
            {children}
        </div>
    )
}

export default QuestionOptionDrop;
