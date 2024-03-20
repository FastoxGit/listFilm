import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
// AXIOS
import Axios from "axios";

function UniqueMovie() {

    const location = useLocation();
    const movie_id = location.state.id;
    const [uniqueData, setUniqueData] = useState({});

    const config = {
        params: {
            language: 'fr-FR'
        },
        headers: { 
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjA4MjhlN2VlYmQ2Yjg5OWY2OTM0ZTA5MDk2NDgwYyIsInN1YiI6IjY1ZjQ1Y2M2NTk1YTU2MDE2MzA1ZDFlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7Jpb3It9OXnXgFAxbbbnF90a6sadSzoW_BC71Zw8Nzs` 
        }
    };

    const getUniqueMovie = async () => {
        try {
            const response = await Axios.get('https://api.themoviedb.org/3/movie/' + movie_id, config);
            console.log("Succès : ", response.data);
            setUniqueData(response.data)
        } catch (error) {
            console.log("Erreur : " + error);
        }
    }

    useEffect(() => {
        getUniqueMovie();
    }, [movie_id])

    return (
        <div 
            className="d-flex"
            style={{
                backgroundImage: `url("https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${uniqueData.backdrop_path}")`,
                backgroundSize: "cover"
            }}
        >
            <img src={'https://media.themoviedb.org/t/p/w220_and_h330_face' + uniqueData.poster_path} />
            <h3>{uniqueData.title}</h3>
        </div>
    )
}

export default UniqueMovie;