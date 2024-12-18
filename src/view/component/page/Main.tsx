import React, {useCallback, useEffect} from 'react';
import './Main.scss';
import {useDispatch, useSelector} from "react-redux";
import {createQuestion, createSection, selectMode, selectSectionIds} from "../../../redux/survey";
import Section from "../section/Section";
import {SURVEY_MODE} from "../../../redux/type";
import {MdOutlineAddCircleOutline} from "react-icons/md";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

function Main() {

    const dispatch = useDispatch();

    const mode = useSelector(selectMode);
    const sectionIds = useSelector(selectSectionIds);

    const onCreateQuestion = useCallback(() => {
        dispatch(createQuestion({sectionId: sectionIds[0]}));
    }, [dispatch, sectionIds]);

    useEffect(() => {
        if (sectionIds.length === 0) {
            // @ts-ignore
            dispatch(createSection())
        }
    }, [dispatch, sectionIds.length]);

    return (
        <DndProvider backend={HTML5Backend}>
            <main>
                {mode === SURVEY_MODE.EDIT && <div className={"controller"}>
                    <div className={"controller-body"}>
                        <button className={"controller-button"} onClick={onCreateQuestion}>
                            <MdOutlineAddCircleOutline/>
                        </button>
                    </div>
                </div>}
                {sectionIds.map((sectionId) => <Section key={`section_${sectionId}`} sectionId={sectionId}/>)}
            </main>
        </DndProvider>
    );
}

export default Main;
