import {
    createEntityAdapter,
    createSelector,
    createSlice,
    EntityId,
    PayloadAction,
    Slice
} from "@reduxjs/toolkit";
import {QUESTION_TYPE, QuestionEntity, SectionEntity, SURVEY_MODE, SurveyMode, SurveyRedux} from "./type";
import {RootState} from "./index";


// Define adapters and selectors

const sectionAdapter = createEntityAdapter<SectionEntity>({
    sortComparer: (a, b) => a.id.toString().localeCompare(b.id.toString())
});

export const {
    selectAll: selectAllSectionOriginal,
    selectIds: selectSectionIds,
    selectById: selectSectionByIdOriginal,
} = sectionAdapter.getSelectors<RootState>((state: RootState) => state.survey.sections);

const questionAdapter = createEntityAdapter<QuestionEntity>({
    sortComparer: (a, b) => a.order - b.order
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

// Default values

export const defaultSection: SectionEntity = {
    id: 0,
    title: '',
    description: '',
    questions: questionAdapter.getInitialState({})
};

export const defaultQuestion: QuestionEntity = {
    id: 0,
    type: QUESTION_TYPE.RADIO_BUTTON,
    question: '',
    isShowDescription: false,
    description: '',
    answer: '',
    isRequired: false,
    options: [{id: 1, label: '옵션 1'}],
    isEtc: false,
    order: 0
};

const INITIAL_SURVEY_STATE: SurveyRedux = {
    sections: sectionAdapter.getInitialState({}),
    mode: SURVEY_MODE.EDIT
};


// Define slice and actions

const surveySlice: Slice<SurveyRedux> = createSlice({
    name: 'survey',
    initialState: INITIAL_SURVEY_STATE,
    reducers: {
        loadSurvey: (state, action: PayloadAction<SurveyRedux>) => {
            return action.payload;
        },
        createSection: (state) => {
            const newSection: SectionEntity = {
                ...defaultSection,
                id: state.sections.ids.length + 1,
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
        createQuestion: (state, action: PayloadAction<{ sectionId: EntityId }>) => {
            const {sectionId} = action.payload;
            const newQuestion: QuestionEntity = {
                ...defaultQuestion,
                id: state.sections.entities[sectionId].questions.ids.length + 1,
                order: state.sections.entities[sectionId].questions.ids.length
            }
            questionAdapter.addOne(state.sections.entities[sectionId].questions, newQuestion);
        },
        copyQuestion: (state, action: PayloadAction<{ sectionId: EntityId, question: QuestionEntity, order: number }>) => {
            const { sectionId, question, order } = action.payload;
            const newQuestion: QuestionEntity = {
                ...question,
                id: state.sections.entities[sectionId].questions.ids.length + 1,
                order
            }
            questionAdapter.addOne(state.sections.entities[sectionId].questions, newQuestion);
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
        },
        clearAnswers: (state) => {
            state.sections.ids.forEach((sectionId) => {
                state.sections.entities[sectionId].questions.ids.forEach((questionId) => {
                    state.sections.entities[sectionId].questions.entities[questionId].answer = '';
                });
            });
        },
        setMode: (state, action: PayloadAction<{ mode: SurveyMode }>) => {
            const {mode} = action.payload;
            state.mode = mode
        }
    },
});

export const {
    loadSurvey,
    createSection,
    updateSection,
    reorderSections,
    removeSection,
    createQuestion,
    updateQuestion,
    copyQuestion,
    reorderQuestions,
    removeQuestion,
    clearAnswers,
    setMode
} = surveySlice.actions;

export const selectSurvey = (state: RootState) => state.survey;
export const selectMode = (state: RootState) => state.survey.mode;

export default surveySlice;
