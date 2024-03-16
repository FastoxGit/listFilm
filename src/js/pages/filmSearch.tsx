import * as React from 'react';
import { useState } from 'react';

function FilmSearch() {

    const [homePage, setHomePage] = useState("Bienvenue sur la recherche de film !");

    return (
        <div>
            <p className='text-white mt-2'>{homePage}</p>
        </div>
    )
}

export default FilmSearch;