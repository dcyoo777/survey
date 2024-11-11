import React, {useCallback} from 'react';
import SectionHeader from "./SectionHeader";
import {useDispatch, useSelector} from "react-redux";
import {createQuestion, selectQuestionIds, selectSectionById} from "../../../redux/survey";
import {RootState} from "../../../redux";
import {EntityId} from "@reduxjs/toolkit";
import Question from "../question/Question";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import './Section.scss'

type SectionProps = {
    sectionId: EntityId;
}

function Section({sectionId}: SectionProps) {

    const dispatch = useDispatch();

    const section = useSelector((state: RootState) => selectSectionById(state, sectionId));

    const onCreateQuestion = useCallback(() => {
        dispatch(createQuestion({sectionId}));
    }, [dispatch, sectionId]);

    return (
        <div className={"section"}>
            <SectionHeader section={section} />
            <div className={"section-controller"}>
                <button className={"section-controller-add"} onClick={onCreateQuestion}>
                    <MdOutlineAddCircleOutline />
                </button>
            </div>
            {section.questions.map((question) =>
                <Question key={`section-${sectionId}_question-${question.id}`}
                          sectionId={sectionId}
                          question={question}
                />
            )}
        </div>
    );
}

export default Section;
