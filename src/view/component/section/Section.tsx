import React from 'react';
import SectionHeader from "./SectionHeader";
import {useSelector} from "react-redux";
import {selectSectionById} from "../../../redux/survey";
import {RootState} from "../../../redux";
import {EntityId} from "@reduxjs/toolkit";
import Question from "../question/Question";
import './Section.scss';

type SectionProps = {
    sectionId: EntityId;
}

function Section({sectionId}: SectionProps) {

    const section = useSelector((state: RootState) => selectSectionById(state, sectionId));

    return (
        <div className={"section"}>
            <SectionHeader section={section} />
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
