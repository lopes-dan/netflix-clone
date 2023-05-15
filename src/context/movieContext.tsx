import { createContext } from "react";


interface MovieTypes{
  title: string;
  setTitle: (title: string) => void;
}

export const MovieContext = createContext<MovieTypes>({
  title: "",
  setTitle: () => {}
});


