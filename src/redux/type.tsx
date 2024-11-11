import {EntityId, EntityState} from "@reduxjs/toolkit";

export const QUESTION_TYPE = {
    SHORT_TEXT: 'short-text',
    LONG_TEXT: 'long-text',
    RADIO_BUTTON: 'radio-button',
    CHECKBOX: 'checkbox',
    SELECT: 'select',
} as const;

export type QuestionType = typeof QUESTION_TYPE[keyof typeof QUESTION_TYPE];

export type QuestionCommonType = {
    id: EntityId;
    type: QuestionType;
    question: string;
    isShowDescription: boolean;
    description?: string;
    answer?: string;
    isRequired: boolean;
    order: number;
}

export type QuestionOptionType = {
    id: number;
    label: string;
}

export type QuestionShortTextType = QuestionCommonType & {
}

export type QuestionLongTextType = QuestionCommonType & {
}

export type QuestionRadioButtonType = QuestionCommonType & {
    options: QuestionOptionType[];
}

export type QuestionCheckboxType = QuestionCommonType & {
    options: QuestionOptionType[];
}

export type QuestionSelectType = QuestionCommonType & {
    options: QuestionOptionType[];
}

export type QuestionEntity = QuestionShortTextType | QuestionLongTextType | QuestionRadioButtonType | QuestionCheckboxType | QuestionSelectType;

export type SectionEntity = {
    id: EntityId;
    title: string;
    description: string;
    questions: EntityState<QuestionEntity, EntityId>;
}

export type SectionType = {
    id: EntityId;
    title: string;
    description: string;
    questions: QuestionEntity[];
}

export type SurveyRedux = {
    sections: EntityState<SectionEntity, EntityId>;
}
