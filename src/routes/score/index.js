import { h } from "preact";
import { Link } from "preact-router";
import View from "../../components/view";
import { ROUTES } from "../../constants";

export default function Score({ game }) {
  const [, gameActions] = game;
  const scores = gameActions.getScores();

  return (
    <View title="Score!">
      <ol>
        {scores.map(({ name, score }) => (
          <li key={name}>
            <span>{name}</span>
            <span>
              {score} point{score !== 1 && "s"}
            </span>
          </li>
        ))}
      </ol>
      <Link href={ROUTES.play} onClick={gameActions.resetGame}>
        Play again
      </Link>
      <Link href={ROUTES.setup} onClick={gameActions.clearAll}>
        Start over
      </Link>
    </View>
  );
}
