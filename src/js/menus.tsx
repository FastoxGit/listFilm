import * as React from "react";
import Home from "./pages/home.tsx";
import FilmList from "./pages/filmList.tsx";
import FilmAdd from "./pages/filmAdd.tsx";
import SeriesList from "./pages/seriesList.tsx";
import UniqueMovie from "./pages/uniqueMovie.tsx";

const Menus = [
    {
        title: "",
        path: "/",
        component: <Home />
    },
    {
        title: "Films",
        path: "/films",
        component: <FilmList />,
    },
    {
        title: "Séries",
        path: "/series",
        component: <SeriesList />,
    },
    {
        title: "Ajouter un film",
        path: "/add",
        component: <FilmAdd />,
    },
    {
        title: "",
        path: "/movie/unique",
        component: <UniqueMovie />
    },
]

export default Menus;