import * as React from 'react';
import { useState } from 'react';

function FilmAdd() {

    const [homePage, setHomePage] = useState("Bienvenue sur l'ajout de film !");

    return (
        <div>
            <p className='text-white mt-2'>{homePage}</p>
        </div>
    )
}

export default FilmAdd;