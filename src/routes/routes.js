import { createBrowserRouter } from "react-router-dom";
import App from "../App";
// import PokemonList from "../components/Pokemon/PokemonList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // children: [
    //   {
    //     path: "/",
    //     element: <PokemonList />,
    //   },
    // ],
  },
]);

export default router;
