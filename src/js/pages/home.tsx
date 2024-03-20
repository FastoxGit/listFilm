import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
// AXIOS
import Axios from "axios";

// MUI
import { Paper } from '@mui/material';

function Home() {

    const [data, setData] = useState({});
    const navigate = useNavigate();

    const config = {
        headers: { 
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjA4MjhlN2VlYmQ2Yjg5OWY2OTM0ZTA5MDk2NDgwYyIsInN1YiI6IjY1ZjQ1Y2M2NTk1YTU2MDE2MzA1ZDFlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7Jpb3It9OXnXgFAxbbbnF90a6sadSzoW_BC71Zw8Nzs` 
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

    const handleOpenMovieUnique = (id) => {
        console.log("je clique sur " + id);
        navigate('/movie/unique', {
            state: {
                id: id
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
                        <Paper key={i} className='col-3 bg-white m-2 justify-content-center text-center' style={{ height: "15rem", width: "15rem" }}>
                            {movie.poster_path !== null ? (
                                <img 
                                    className='mt-3' 
                                    style={{ height: "70%", cursor: "pointer" }} 
                                    src={'https://media.themoviedb.org/t/p/w220_and_h330_face' + movie.poster_path} 
                                    alt={movie.title} 
                                    onClick={() => handleOpenMovieUnique(movie.id)}
                                />
                            ) : (
                                <p>Nous n'avons pas d'image pour ce film</p>
                            )}
                            <p className='text-dark mt-2'>{movie.title}</p>
                        </Paper>
                    )
                )}
        </div>
    )
}

export default Home;