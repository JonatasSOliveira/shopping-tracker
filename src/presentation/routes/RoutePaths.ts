import { Routes } from "./Routes";

export type RoutePath = (typeof Routes)[number]["path"];

export const RoutePaths: Record<RoutePath, RoutePath> = Object.fromEntries(
  Routes.map((route) => [route.path, route.path]),
) as Record<RoutePath, RoutePath>;
