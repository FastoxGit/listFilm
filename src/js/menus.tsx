import * as React from "react";
import Home from "./pages/home.tsx";
import FilmList from "./pages/filmList.tsx";
import FilmAdd from "./pages/filmAdd.tsx";
import FilmSearch from "./pages/filmSearch.tsx";
import UniqueMovie from "./pages/uniqueMovie.tsx";

const Menus = [
    {
        title: "",
        path: "/",
        component: <Home />
    },
    {
        title: "Liste des films",
        path: "/list",
        component: <FilmList />,
    },
    {
        title: "Rechercher un film",
        path: "/search",
        component: <FilmSearch />,
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