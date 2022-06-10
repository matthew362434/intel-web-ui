/*
##############################################################################
#
# Copyright (C) 2022 Intel Corporation
# 
# This software and the related documents are Intel copyrighted materials,
# and your use of them is governed by the express license under which they
# were provided to you ("License"). Unless the License provides otherwise,
# you may not use, modify, copy, publish, distribute, disclose or transmit
# this software or the related documents without Intel's prior written
# permission.
#
# This software and the related documents are provided as is, with no
# express or implied warranties, other than those that are expressly stated
# in the License.
#
##############################################################################
*/

import React, { ReactNode } from "react";

const getInitialTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("color-theme");
    if (typeof storedPrefs === "string") {
      return storedPrefs;
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) {
      return "dark";
    }
  }

  return "dark";
};

export interface ThemeContextProps {
  theme: string;
  setTheme(theme: string): void;
}

export interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = React.createContext<ThemeContextProps | undefined>(
  undefined
);

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = React.useState<string>(getInitialTheme);

  const rawSetTheme = (_theme: string) => {
    const root = window.document.documentElement;
    const isDark = _theme === "dark";

    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(_theme);

    localStorage.setItem("color-theme", _theme);
  };

  React.useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
