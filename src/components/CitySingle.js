import React from 'react';
import { useParams } from 'react-router';
import CitySingleMain from './CitySingleMain';

function CitySingle() {

    const { wData } = useParams(); // catch parsed data in the url

    return (
        <div>

            <CitySingleMain />

        </div>
    )
}

export default CitySingle