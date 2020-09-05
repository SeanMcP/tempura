import { h } from "preact";
import { Router } from "preact-router";
import useGame from "../stores/game";

import { ROUTES } from "../constants";
// Code-splitting is automated for routes
import Home from "../routes/home";
import Play from "../routes/play";
import Pudding from "../routes/pudding";
import Score from "../routes/score";
import Setup from "../routes/setup";

export default function App() {
  const game = useGame();

  return (
    <div id="app">
      <Router>
        <Home path={ROUTES.home} />
        <Setup path={ROUTES.setup} game={game} />
        <Play path={ROUTES.play} game={game} />
        <Pudding path={ROUTES.pudding} game={game} />
        <Score path={ROUTES.score} game={game} />
      </Router>
    </div>
  );
}
