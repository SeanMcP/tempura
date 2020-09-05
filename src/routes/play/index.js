import { h } from "preact";
import { Link } from "preact-router";
import { ROUTES } from "../../constants";
import View from "../../components/view";

const ROUNDS = [1, 2, 3];

function selectTextOnFocus(event) {
  event.target.select();
}

export default function Play({ game }) {
  const [gameState, gameActions] = game;
  return (
    <View title="Play">
      {Object.entries(gameState).map(([name, data]) => (
        <article>
          <b>{name}</b>
          {ROUNDS.map((round) => (
            <input
              aria-label={`${name} round ${round} score`}
              value={data[round]}
              onChange={(event) =>
                gameActions.setScore(name, round, parseInt(event.target.value))
              }
              onFocus={selectTextOnFocus}
              type="number"
            />
          ))}
          <b>
            {ROUNDS.reduce((acc, round) => {
              acc += data[round];
              return acc;
            }, 0)}
          </b>
        </article>
      ))}
      <Link href={ROUTES.pudding}>Next</Link>
    </View>
  );
}
