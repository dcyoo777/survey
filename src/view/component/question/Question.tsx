import React, {createContext, useEffect} from 'react';
import {EntityId} from "@reduxjs/toolkit";
import {QuestionEntity, SURVEY_MODE} from "../../../redux/type";
import QuestionHeader from "./QuestionHeader";
import QuestionBody from "./QuestionBody";
import QuestionFooter from "./QuestionFooter";
import './Question.scss';
import {
    defaultQuestion,
    reorderQuestions,
    selectMode,
    selectSectionById,
} from "../../../redux/survey";
import useClickOutside from "../../../hook/useClickOutside";
import cn from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import {RootState} from "../../../redux";
import {MdDragHandle} from "react-icons/md";

// @ts-ignore
export const questionContext:React.Context<{
    sectionId: EntityId,
    question: QuestionEntity,
    isFocus: boolean
}> = createContext({
    sectionId: 0 as EntityId,
    question: defaultQuestion,
    isFocus: false
});

type QuestionProps = {
    sectionId: EntityId;
    question: QuestionEntity;
}

function Question({sectionId, question}: QuestionProps) {

    const dispatch = useDispatch();

    const mode = useSelector(selectMode);
    const section = useSelector((state: RootState) => selectSectionById(state, sectionId));

    const [isHover, setIsHover] = React.useState<boolean>(false);
    const [isFocus, setIsFocus] = React.useState<boolean>(false);

    const [{isOver}, drop] = useDrop({
        accept: ["question"],
        hover: async (item: {question: QuestionEntity}) => {
            if (question.id !== item.question.id) {
                let reorderedQuestions = [...section.questions.filter(q => q.id !== item.question.id)]
                const len = reorderedQuestions.length
                const index = reorderedQuestions.findIndex(q => q.id === question.id) + (question.order > item.question.order ? 1 : 0)

                reorderedQuestions = [
                    ...reorderedQuestions.slice(0, index),
                    item.question,
                    ...reorderedQuestions.slice(index, len)
                ].map((q, i) => ({...q, order: i + 1}))

                dispatch(reorderQuestions({
                    sectionId,
                    questions: reorderedQuestions
                }))
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    })

    const [{isDragging}, drag, preview] = useDrag(
        () => ({
            type: "question",
            item: {question},
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [question],
    );

    const questionRef = useClickOutside({
        handler: () => {
            setIsFocus(false);
        }
    })

    useEffect(() => {
        if (mode === SURVEY_MODE.VIEW) {
            setIsFocus(false);
        }
    }, [mode]);

    return (
        <questionContext.Provider value={{question, sectionId, isFocus}}>
            <div ref={drop} className={"question-drop"}
                 onMouseEnter={() => setIsHover(true)}
                 onMouseLeave={() => setIsHover(false)}
            >
                <div ref={preview} className={"question-drag"}>
                    {mode === SURVEY_MODE.EDIT && isHover && <div ref={drag} className={"question-handle"}>
                        <MdDragHandle />
                    </div>}
                    {isDragging && <div className={"question-dragging"}>
                    </div>}
                    {!isDragging && <div className={cn("question", {focus: isFocus})}
                         ref={questionRef}
                         onMouseDown={(e) => {
                             if (mode === SURVEY_MODE.EDIT) {
                                 setIsFocus(true);
                             }
                         }}
                    >
                        <QuestionHeader/>
                        <QuestionBody/>
                        {isFocus && <QuestionFooter/>}
                    </div>}
                </div>
            </div>
        </questionContext.Provider>
);
}

export default Question;
