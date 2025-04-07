import { Routes } from "./Routes";

type ExtractRouteParams<T> = T extends { path: infer P; args: infer A }
  ? P extends string
    ? { [K in P]: A }
    : never
  : never;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

export type RootStackParamList = UnionToIntersection<
  ExtractRouteParams<(typeof Routes)[number]>
>;
