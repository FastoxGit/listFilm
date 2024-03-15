import * as React from 'react';
import { useState } from 'react';

function Home() {

    const [homePage, setHomePage] = useState("Bienvenue sur la page d'accueil !");

    return (
        <div>
            <p className='text-white mt-2'>{homePage}</p>
        </div>
    )
}

export default Home;