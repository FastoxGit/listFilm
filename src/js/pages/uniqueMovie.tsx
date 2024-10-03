import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router";
// AXIOS
import Axios from "axios";
// MATERIAL UI
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// MOMENT
import moment from "moment";
// TOKEN
import token from "../token";

import noImage from "../../css/images/no-image.png";

function UniqueMovie() {
  moment.locale("fr");
  const location = useLocation();
  const movie_id = location.state.id;
  const [uniqueData, setUniqueData] = useState({});
  const [genreMovie, setGenreMovie] = useState([]);
  const [productionCountries, setProductionCountries] = useState([]);
  const [credits, setCredits] = useState([]);
  const [loadCredits, setLoadCredits] = useState(true);
  const [videos, setVideos] = useState([]);
  const [loadVideos, setLoadVideos] = useState(true);
  const [releaseDate, setReleaseDate] = useState("");

  const ref = useRef();

  const config = {
    params: {
      language: "fr-FR",
    },
    headers: {
      Authorization: token,
    },
  };

  const getUniqueMovie = async () => {
    try {
      const response = await Axios.get(
        "https://api.themoviedb.org/3/movie/" + movie_id,
        config
      );
      // console.log("getUniqueMovie : ", response.data);
      setUniqueData(response.data);
      setGenreMovie(response.data.genres.map((genre) => genre.name));
      setProductionCountries(
        response.data.production_countries.map((country) => country.name)
      );
    } catch (error) {
      console.log("Erreur : " + error);
    }
  };

  const getDate = async () => {
    try {
      const response = await Axios.get(
        `https://api.themoviedb.org/3/movie/${movie_id}/release_dates`,
        config
      );
      // console.log("getDate : ", response.data)
      response.data.results.map((dates) => {
        if (dates.iso_3166_1 === "FR") {
          if (dates.release_dates.length === 1) {
            setReleaseDate(
              moment(dates.release_dates[0].release_date).format("DD/MM/YYYY")
            );
          } else {
            dates.release_dates.map((date, i) => {
              if (date.certification === "" && date.note === "") {
                setReleaseDate(moment(date.release_date).format("DD/MM/YYYY"));
              }
            });
          }
        }
      });
    } catch (error) {
      console.log("Erreur : " + error);
    }
  };

  const getCredits = async () => {
    try {
      const response = await Axios.get(
        "https://api.themoviedb.org/3/movie/" +
          movie_id +
          "/credits?language=en-US",
        config
      );
      // console.log("getCredits : ", response.data);
      setCredits(response.data.cast);
      setLoadCredits(false);
    } catch (error) {
      console.log("Erreur : " + error);
    }
  };

  const getVideos = async () => {
    try {
      const response = await Axios.get(
        "https://api.themoviedb.org/3/movie/" +
          movie_id +
          "/videos?language=en-US",
        config
      );
      console.log("getVideos : ", response.data);
      setVideos(response.data.results);
      setLoadVideos(false);
    } catch (error) {
      console.log("Erreur : " + error);
    }
  };

  useEffect(() => {
    getUniqueMovie();
    getDate();
    getCredits();
    getVideos();
  }, [movie_id]);

  console.log(videos);

  return (
    <>
      <div
        className="d-flex"
        style={{
          backgroundImage: `url("https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${uniqueData.backdrop_path}")`,
          backgroundSize: "cover",
        }}
      >
        <div className="d-flex opacityBackground align-items-center w-100">
          <div className="d-flex p-5">
            <img
              className="rounded"
              src={
                "https://media.themoviedb.org/t/p/w220_and_h330_face" +
                uniqueData.poster_path
              }
              alt={uniqueData.title}
            />
            <section className="d-flex flex-column justify-content-center p-4 text-white">
              <div>
                <h3 className="text-white">{uniqueData.title}</h3>
                <div>
                  <p>
                    {releaseDate.length >= 1
                      ? releaseDate
                      : "Pas de date dispo"}{" "}
                    (FR)
                  </p>
                  <p>{" " + genreMovie.join(", ")}</p>
                  <p>{" " + productionCountries.join(" / ")}</p>
                  <p>{uniqueData.overview}</p>
                  <p>
                    <a
                      style={{
                        textDecoration: "underline",
                        color: "white",
                      }}
                      href={
                        "https://www.imdb.com/title/" + uniqueData.imdb_id + "/"
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      Consulter la page IMDB
                    </a>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="px-5 py-4">
        <h5 className="mb-4" style={{ fontWeight: "600" }}>
          TETES D'AFFICHES
        </h5>
        <ul ref={ref}>
          {!loadCredits ? (
            credits.map((credit, i) => (
              <li className="card" style={{ paddingBottom: "10px" }} key={i}>
                {credit.profile_path === null ? (
                  <img
                    className="rounded w-100"
                    style={{ maxHeight: "200px" }}
                    src={noImage}
                    alt={credit.original_name}
                  />
                ) : (
                  <img
                    style={{
                      borderTopLeftRadius: "5px",
                      borderTopRightRadius: "5px",
                    }}
                    src={
                      "https://media.themoviedb.org/t/p/w138_and_h175_face/" +
                      credit.profile_path
                    }
                    alt={credit.original_name}
                  />
                )}
                <div className="d-flex flex-column p-2">
                  <p style={{ fontSize: "0.9em" }} className="fw-bold m-0">
                    {credit.original_name}
                  </p>
                  <p style={{ fontSize: "0.8em" }} className="m-0">
                    {credit.character}
                  </p>
                </div>
              </li>
            ))
          ) : (
            <p>CA CHARGE</p>
          )}
        </ul>
        <h5 className="mt-4" style={{ fontWeight: "600" }}>
          MEDIAS
        </h5>
        <div>
          <ul>
            {!loadVideos && videos.length >= 1 ? (
              videos.map(
                (video, i) =>
                  video.site === "YouTube" && (
                    <li>
                      <iframe
                        className="mt-2 p-2"
                        width="500"
                        height="350"
                        src={"https://www.youtube.com/embed/" + video?.key}
                      ></iframe>
                    </li>
                  )
              )
            ) : (
              <p>Nous n'avons pas de vidéos disponible.</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default UniqueMovie;
