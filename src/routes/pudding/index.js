import { h } from "preact";
import { Link } from "preact-router";
import { ROUTES } from "../../constants";
import View from "../../components/view";

function Option({ name }) {
  return (
    <label style={{ display: "block" }}>
      <input
        name="option"
        style={{ marginRight: "0.5rem" }}
        type="checkbox"
        value={name}
      />
      {name}
    </label>
  );
}

export default function Pudding({ game }) {
  const [gameState, gameActions] = game;
  const options = Object.keys(gameState).map((name) => <Option name={name} />);

  function handleFewestSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const options = formData.getAll("option");

    gameActions.setFewestPudding(options);
  }

  function handleMostSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const options = formData.getAll("option");

    gameActions.setMostPudding(options);
  }

  return (
    <View title="Dessert!">
      <form onSubmit={handleMostSubmit}>
        <h2>
          Who had the <em>most</em> pudding?
        </h2>
        {options}
        <button type="submit">Next</button>
      </form>
      <form onSubmit={handleFewestSubmit}>
        <h2>
          Who had the <em>fewest</em> pudding?
        </h2>
        {options}
        <button type="submit">Next</button>
      </form>
      <Link href={ROUTES.score}>Next</Link>
    </View>
  );
}
