import React, {useCallback, useEffect} from 'react';
import './Main.scss';
import {useDispatch, useSelector} from "react-redux";
import {createQuestion, createSection, selectMode, selectSectionIds} from "../../../redux/survey";
import Section from "../section/Section";
import {SURVEY_MODE} from "../../../redux/type";
import {MdOutlineAddCircleOutline} from "react-icons/md";
import {CiGrid2H} from "react-icons/ci";

function Main() {

    const dispatch = useDispatch();

    const mode = useSelector(selectMode);
    const sectionIds = useSelector(selectSectionIds);

    const onCreateSection = useCallback(() => {
        // @ts-ignore
        dispatch(createSection());
    }, [dispatch]);

    const onCreateQuestion = useCallback(() => {
    //     dispatch(createQuestion({sectionId}));
    // }, [dispatch, sectionId]);
    }, [dispatch]);

    useEffect(() => {
        if (sectionIds.length === 0) {
            // @ts-ignore
            dispatch(createSection())
        }
    }, [dispatch, sectionIds.length]);

    return (
        <main>
            {mode === SURVEY_MODE.EDIT && <div className={"controller"}>
                <div className={"controller-body"}>
                    <button className={"controller-button"} onClick={onCreateQuestion}>
                        <MdOutlineAddCircleOutline />
                    </button>
                    <button className={"controller-button"} onClick={onCreateSection}>
                        <CiGrid2H />
                    </button>
                </div>
            </div>}
            {sectionIds.map((sectionId) => <Section key={`section_${sectionId}`} sectionId={sectionId}/>)}
        </main>
    );
}

export default Main;
