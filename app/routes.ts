import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
  index("routes/Home.tsx"),
  {
    path: "/game",
    file: "./routes/game.tsx",
  },
  {
    path: "/end",
    file: "./routes/end.tsx",
  },
] satisfies RouteConfig;
