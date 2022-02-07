import { createCookie } from "remix";

import { DEFAULT_THEME } from "~/themes";

import type { ThemeNames } from "~/themes";

export const themeCookie = createCookie("theme");

const getThemeCookie = async (request: Request): Promise<any> => {
  return await themeCookie.parse(request.headers.get("Cookie"));
};

export const getUserTheme = async (request: Request): Promise<ThemeNames> => {
  const userPreferredTheme = await getThemeCookie(request);
  const systemPreferredTheme = request.headers.get(
    "Sec-CH-Prefers-Color-Scheme"
  );
  return userPreferredTheme ?? systemPreferredTheme ?? DEFAULT_THEME;
};
