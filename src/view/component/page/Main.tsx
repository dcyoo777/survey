import React, {useEffect} from 'react';
import './Main.scss';
import {useDispatch, useSelector} from "react-redux";
import {createSection, selectAllSections, selectSectionIds} from "../../../redux/survey";
import Section from "../section/Section";

function Main() {

    const dispatch = useDispatch();

    const sectionIds = useSelector(selectSectionIds);

    console.log(sectionIds);

    useEffect(() => {
        if (sectionIds.length === 0) {
            // @ts-ignore
            dispatch(createSection())
        }
    }, []);

    return (
        <main>
            {sectionIds.map((sectionId) => <Section key={`section_${sectionId}`} sectionId={sectionId}/>)}
        </main>
    );
}

export default Main;
