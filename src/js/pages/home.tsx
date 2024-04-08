import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
// AXIOS
import Axios from "axios";
// MOMENT
import moment from 'moment';

// TOKEN
import token from "../token";
// MUI

function Home() {
    moment.locale("fr");
    const [data, setData] = useState({});
    const navigate = useNavigate();

    const config = {
        headers: { 
            Authorization: token 
        }
    };

    const getMovies = async () => {
        try {
            const response = await Axios.get('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', config)
            console.log("Succès : ", response.data);
            setData(response.data);
        } catch (error) {
            console.log("Erreur : " + error);
        }
    }

    const handleOpenMovieUnique = (id, overview) => {
        navigate('/movie/unique', {
            state: {
                id: id,
                overview: overview
            }
        });
    }

    useEffect(() => {
        getMovies();
    }, [])

    console.log(data);

    return (
        <div className='row mx-0 justify-content-center'>
                {Object.keys(data).length > 0 && (
                    data.results.map((movie, i) => 
                        <div key={i} className='col-2 m-2 justify-content-center' style={{ border: "1px solid black", borderRadius: "10px" }}>
                            {movie.poster_path !== null ? (
                                <img 
                                    className='mt-3 d-block m-auto rounded' 
                                    style={{ height: "60%", cursor: "pointer" }} 
                                    src={'https://media.themoviedb.org/t/p/w220_and_h330_face' + movie.poster_path} 
                                    alt={movie.title} 
                                    onClick={() => handleOpenMovieUnique(movie.id, movie.overview)}
                                />
                            ) : (
                                <p>Nous n'avons pas d'image pour ce film</p>
                            )}
                            <div style={{ fontSize: "14px" }} className='mt-2'>
                                <p className='m-0 text-dark fw-bold'>{movie.title}</p>
                                <span>Note moyenne : {movie.vote_average.toFixed(2)} / 10</span><br/>
                                <span>Date de sortie : {moment(movie.release_date).format('DD/MM/YYYY')}</span>
                            </div>
                        </div>
                    )
                )}
        </div>
    )
}

export default Home;