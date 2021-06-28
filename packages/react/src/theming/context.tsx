import React from "react";
import { ThemeContextType } from "./types";

export const ThemeContext = React.createContext<ThemeContextType>(undefined);

export const useThemeContext = () => React.useContext(ThemeContext);
