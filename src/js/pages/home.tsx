import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
// AXIOS
import Axios from "axios";
// MOMENT
import moment from "moment";
// FORMIK
import { Formik, Field, Form, useFormik } from "formik";
// MATERIAL UI
import { TextField, Button, Input } from "@mui/material";
import { Gauge } from "@mui/x-charts/Gauge";
// FRAMER MOTION
import { motion, useScroll } from "framer-motion";

// TOKEN
import token from "../token";
// MUI

function Home() {
  moment.locale("fr");
  const [data, setData] = useState({});
  const [series, setSeries] = useState([]);
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: token,
    },
  };

  const getMovies = async () => {
    try {
      const response = await Axios.get(
        // "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc",
        "https://api.themoviedb.org/3/movie/now_playing?language=fr-FR&page=1",
        config
      );
      console.log("Succès : ", response.data);
      setData(response.data);
    } catch (error) {
      console.log("Erreur : " + error);
    }
  };

  const handleOpenMovieUnique = (id, overview) => {
    navigate("/movie/unique", {
      state: {
        id: id,
        overview: overview,
      },
    });
  };

  const getSeries = async () => {
    try {
      const response = await Axios.get(
        "https://api.themoviedb.org/3/tv/popular?language=fr-FR&page=1",
        config
      );
      setSeries(response.data.results);
      // console.log("getSeries : ", response.data);
    } catch (error) {
      console.log("Erreur : " + error);
    }
  };

  useEffect(() => {
    getMovies();
    getSeries();
  }, []);

  // console.log(data);

  const ref = useRef();

  const formik = useFormik({
    initialValues: {
      firstName: "",
    },
    onSubmit: (values) => {
      console.log(values);
      // alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center banner">
        <div className="title">
          <h1 className="text-light">Bienvenue sur Movie React !</h1>
        </div>

        <div className="search" style={{ width: "80%" }}>
          <form
            className="d-flex flex-column align-items-center"
            onSubmit={formik.handleSubmit}
          >
            <TextField
              className="mb-2"
              id="firstName"
              label="Recherchez un film, une série..."
              name="firstName"
              size="small"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              InputProps={{
                sx: { borderRadius: 25, backgroundColor: "white" },
              }}
              fullWidth
            />
            <Button variant="contained" type="submit">
              Rechercher
            </Button>
          </form>
        </div>
      </div>
      <div className="mt-4 p-3">
        <h5 className="ms-4" style={{ fontWeight: "600" }}>
          A L'AFFICHE AU CINEMA EN CE MOMENT
        </h5>
        <ul className="mt-4" ref={ref}>
          {Object.keys(data).length > 0 &&
            data?.results.map((movie, i) => (
              <li className="card" key={i}>
                <img
                  style={{
                    maxHeight: "200px",
                    cursor: "pointer",
                    borderTopLeftRadius: "0.375rem",
                    borderTopRightRadius: "0.375rem",
                  }}
                  src={
                    "https://media.themoviedb.org/t/p/w220_and_h330_face" +
                    movie.poster_path
                  }
                  alt={movie.title}
                  onClick={() =>
                    handleOpenMovieUnique(movie.id, movie.overview)
                  }
                />
                <div className="p-2">
                  <h2 className="m-0" style={{ fontSize: "1em" }}>
                    {movie.title}
                  </h2>
                  <span
                    style={{ color: "rgba(0, 0, 0, .6)", fontSize: "0.9em" }}
                  >
                    {moment(movie.release_date).format("DD/MM/YYYY")}
                  </span>
                </div>
              </li>
            ))}
        </ul>

        <h5 className="ms-4 mt-4" style={{ fontWeight: "600" }}>
          SERIES POPULAIRES DU MOMENT
        </h5>
        <ul className="mt-4" ref={ref}>
          {Object.keys(series).length > 0 &&
            series.map((serie, i) => (
              <li className="card" key={i}>
                <img
                  style={{
                    maxHeight: "200px",
                    cursor: "pointer",
                    borderTopLeftRadius: "0.375rem",
                    borderTopRightRadius: "0.375rem",
                  }}
                  src={
                    "https://media.themoviedb.org/t/p/w220_and_h330_face" +
                    serie.poster_path
                  }
                  alt={serie.name}
                  onClick={() =>
                    handleOpenMovieUnique(serie.id, serie.overview)
                  }
                />
                <div className="p-2">
                  <h2 className="m-0" style={{ fontSize: "1em" }}>
                    {serie.name}
                  </h2>
                  <span
                    style={{ color: "rgba(0, 0, 0, .6)", fontSize: "0.9em" }}
                  >
                    {moment(serie.release_date).format("DD/MM/YYYY")}
                  </span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default Home;
