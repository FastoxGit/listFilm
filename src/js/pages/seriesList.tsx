import * as React from 'react';
import { useState } from 'react';

function SeriesList() {

    const [homePage, setHomePage] = useState("Bienvenue sur la liste des séries !");

    return (
        <div>
            <p className='text-dark mt-2'>{homePage}</p>
        </div>
    )
}

export default SeriesList;