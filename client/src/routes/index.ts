import { Route } from "../types/routes";

import deckBuild from "./deckBuild";

export function getRoute(): Route {
  return deckBuild();
}
