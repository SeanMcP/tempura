import { h } from "preact";
import { Link } from "preact-router";
import { ROUTES } from "../../constants";
import View from "../../components/view";

export default function Setup({ game }) {
  const [gameState, gameActions] = game;
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");

    if (!name) {
      alert("Error!");
      return;
    }

    gameActions.addPlayer(name);
    event.target.reset();
  }
  const numberOfPlayers = Object.keys(gameState).length;
  return (
    <View title="Setup">
      <form onSubmit={handleSubmit}>
        <h2 id="add-player">Add a player</h2>
        <input
          aria-label="Player name"
          name="name"
          placeholder="Add a player"
          required
        />
      </form>
      <ul>
        {Object.keys(gameState).map((name) => (
          <li
            key={name}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {name}{" "}
            <button onClick={() => gameActions.removePlayer(name)}>
              Remove <span class="visually-hidden">{name}</span>
            </button>
          </li>
        ))}
      </ul>
      {numberOfPlayers > 1 && numberOfPlayers < 6 && (
        <Link href={ROUTES.play}>Play!</Link>
      )}
    </View>
  );
}
