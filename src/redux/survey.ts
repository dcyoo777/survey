import {
    createEntityAdapter,
    createSelector,
    createSlice,
    EntityId,
    PayloadAction,
    Slice
} from "@reduxjs/toolkit";
import {QUESTION_TYPE, QuestionEntity, SectionEntity, SurveyRedux} from "./type";
import {RootState} from "./index";
import section from "../view/component/section/Section";

const sectionAdapter = createEntityAdapter<SectionEntity>({
    sortComparer: (a, b) => a.id.toString().localeCompare(b.id.toString())
});

export const {
    selectAll: selectAllSectionOriginal,
    selectIds: selectSectionIds,
    selectById: selectSectionByIdOriginal,
} = sectionAdapter.getSelectors<RootState>((state: RootState) => state.survey.sections);

const questionAdapter = createEntityAdapter<QuestionEntity>({
    sortComparer: (a, b) => a.id.toString().localeCompare(b.id.toString())
});

export const {
    selectAll: selectAllQuestion,
    selectIds: selectQuestionIds,
    selectById: selectQuestionById,
} = questionAdapter.getSelectors<SectionEntity>((section) => section.questions);

export const selectAllSections = createSelector(selectAllSectionOriginal, (sections) => {
    return sections.map((section) => {
        return {
            ...section,
            questions: selectAllQuestion(section)
        };
    });
});

export const selectSectionById = createSelector(selectSectionByIdOriginal, (section) => {
    return {
        ...section,
        questions: selectAllQuestion(section)
    };
});

const INITIAL_SURVEY_STATE: SurveyRedux = {
    sections: sectionAdapter.getInitialState({}),
};

const surveySlice: Slice<SurveyRedux> = createSlice({
    name: 'survey',
    initialState: INITIAL_SURVEY_STATE,
    reducers: {
        createSection: (state) => {
            const newSection: SectionEntity = {
                id: state.sections.ids.length + 1,
                title: '',
                description: '',
                questions: questionAdapter.getInitialState({})
            };
            sectionAdapter.addOne(state.sections, newSection);
        },
        updateSection: (state, action: PayloadAction<SectionEntity>) => {
            sectionAdapter.updateOne(state.sections, {
                id: action.payload.id,
                changes: {
                    title: action.payload.title,
                    description: action.payload.description,
                }
            });
        },
        reorderSections: (state, action: PayloadAction<SectionEntity[]>) => {
            sectionAdapter.updateMany(state.sections, action.payload.map((section) => {
                const {id, ...changes} = section
                return {id, changes}
            }));
        },
        removeSection: (state, action: PayloadAction<EntityId>) => {
            sectionAdapter.removeOne(state.sections, action.payload);
        },
        createQuestion: (state, action: PayloadAction<EntityId>) => {
            const newQuestion: QuestionEntity = {
                id: state.sections.entities[action.payload].questions.ids.length + 1,
                type: QUESTION_TYPE.RADIO_BUTTON,
                question: '',
                description: '',
                answer: '',
                isRequired: false,
                options: [{id: 1, label: '옵션 1'}]
            }
            questionAdapter.addOne(state.sections.entities[action.payload].questions, newQuestion);
        },
        updateQuestion: (state, action: PayloadAction<{sectionId: EntityId, question: QuestionEntity}>) => {
            const {sectionId, question} = action.payload;
            const {id, ...changes} = question;
            questionAdapter.updateOne(state.sections.entities[sectionId].questions, {id, changes});
        },
        reorderQuestions: (state, action: PayloadAction<{sectionId: EntityId, questions: QuestionEntity[]}>) => {
            const {sectionId, questions} = action.payload;
            questionAdapter.updateMany(state.sections.entities[sectionId].questions, questions.map((question) => {
                const {id, ...changes} = question;
                return {id, changes};
            }));
        },
        removeQuestion: (state, action: PayloadAction<{sectionId: EntityId, questionId: EntityId}>) => {
            questionAdapter.removeOne(state.sections.entities[action.payload.sectionId].questions, action.payload.questionId);
        }
    },
});

export const {
    createSection,
    updateSection,
    reorderSections,
    removeSection,
    createQuestion,
    updateQuestion,
    reorderQuestions,
    removeQuestion
} = surveySlice.actions;

export default surveySlice;
