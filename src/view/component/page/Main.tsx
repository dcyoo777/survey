import React, {useEffect} from 'react';
import './Main.scss';
import {useDispatch, useSelector} from "react-redux";
import {createSection, selectSectionIds} from "../../../redux/survey";
import Section from "../section/Section";

function Main() {

    const dispatch = useDispatch();

    const sectionIds = useSelector(selectSectionIds);

    useEffect(() => {
        if (sectionIds.length === 0) {
            // @ts-ignore
            dispatch(createSection())
        }
    }, [dispatch, sectionIds.length]);

    return (
        <main>
            {sectionIds.map((sectionId) => <Section key={`section_${sectionId}`} sectionId={sectionId}/>)}
        </main>
    );
}

export default Main;
