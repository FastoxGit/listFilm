import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router";
// AXIOS
import Axios from "axios";
// MOMENT
import moment from "moment";
// TOKEN
import token from "../token";

function UniqueMovie() {
    moment.locale("fr");
    const location = useLocation();
    const movie_id = location.state.id;
    const [uniqueData, setUniqueData] = useState({});
    const [genreMovie, setGenreMovie] = useState([]);
    const [releaseDate, setReleaseDate] = useState("");

    const config = {
        params: {
            language: 'fr-FR'
        },
        headers: { 
            Authorization: token
        }
    };

    const getUniqueMovie = async () => {
        try {
            const response = await Axios.get('https://api.themoviedb.org/3/movie/' + movie_id, config);
            console.log("Succès : ", response.data);
            setUniqueData(response.data);
            setGenreMovie(response.data.genres.map((genre) => genre.name));
        } catch (error) {
            console.log("Erreur : " + error);
        }
    }

    const getDate = async () => {
        try {
            const response = await Axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/release_dates`, config)
            console.log("getDate : ", response.data)
            response.data.results.map((dates) => {
                if (dates.iso_3166_1 === "FR") {
                    setReleaseDate(dates.release_dates.map((date) => moment(date.release_date).format('DD/MM/YYYY')));
                }
            })
        } catch (error) {
            console.log("Erreur : " + error);
        }
    }

    useEffect(() => {
        getUniqueMovie();
        getDate();
    }, [movie_id])

    return (
        <>
        <div 
            className="d-flex"
            style={{
                backgroundImage: `url("https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${uniqueData.backdrop_path}")`,
                backgroundSize: "cover"
            }}
        >
            <div className="d-flex opacityBackground align-items-center w-100">
                <div className="d-flex p-5">
                    <img className="w-100 rounded" src={'https://media.themoviedb.org/t/p/w220_and_h330_face' + uniqueData.poster_path} alt={uniqueData.title} />
                    <section className="d-flex flex-column justify-content-center p-4 text-white">
                        <div>
                            <h3 className="text-white">{uniqueData.title}</h3>
                            <div>
                                <span>
                                    {releaseDate.length >=1 ? releaseDate : 'Pas de date dispo'} (FR)
                                </span> / 
                                <span>
                                    {genreMovie.join()}
                                </span>
                            </div>
                        </div>
                        <p>TEST</p>
                        <p>TEST</p>
                        <p>TEST Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum ut magna vel laoreet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis facilisis auctor dui quis placerat. Praesent augue enim, elementum vitae nibh eget, eleifend maximus augue. Maecenas congue nisi non justo mattis, non imperdiet sapien pulvinar. Donec et nisi non enim imperdiet pellentesque eget in tortor. Nulla condimentum aliquet finibus. Nunc id blandit dolor.</p>
                        <p>TEST</p>
                    </section>
                </div>
            </div>
        </div>
        </>
    )
}

export default UniqueMovie;