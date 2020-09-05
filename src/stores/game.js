import { useState } from "preact/hooks";

const PUDDING = 6;

function getPlayerScore(data) {
  let score = 0;

  [1, 2, 3].forEach((round) => {
    score += data[round];
  });

  if (data.pudding.status === "most") {
    score += PUDDING * data.pudding.weight;
  }

  if (data.pudding.status === "fewest") {
    score -= PUDDING * data.pudding.weight;
  }

  return score;
}

const initialPlayerState = {
  1: 0,
  2: 0,
  3: 0,
  pudding: {
    status: "none",
    weight: 1,
  },
};
const initialGameState =
  process.env.NODE_ENV === "development"
    ? {
        Sean: {
          ...initialPlayerState,
          1: 7,
          pudding: { status: "fewest", weight: 1 },
        },
        Anne: {
          ...initialPlayerState,
          1: 10,
          pudding: { status: "most", weight: 1 },
        },
      }
    : {};

export default function useGame() {
  const [gameState, setGameState] = useState(initialGameState);

  function addPlayer(name) {
    setGameState({
      ...gameState,
      [name]: initialPlayerState,
    });
  }

  function removePlayer(name) {
    const nextState = Object.entries(gameState).reduce((acc, [key, value]) => {
      if (key !== name) {
        acc[key] = value;
      }
      return acc;
    }, {});
    setGameState(nextState);
  }

  function setScore(name, round, score) {
    const nextState = { ...gameState };
    nextState[name][round] = score;

    setGameState(nextState);
  }

  /**
   * @param {string[]} names
   */
  function setFewestPudding(names) {
    const weight = 1 / names.length;
    const nextState = { ...gameState };

    names.forEach((name) => {
      nextState[name].pudding = {
        status: "fewest",
        weight,
      };
    });

    setGameState(nextState);
  }

  /**
   * @param {string[]} names
   */
  function setMostPudding(names) {
    const weight = 1 / names.length;
    const nextState = { ...gameState };

    names.forEach((name) => {
      nextState[name].pudding = {
        status: "most",
        weight,
      };
    });

    setGameState(nextState);
  }

  function resetGame() {
    const nextState = Object.keys(gameState).reduce((acc, key) => {
      acc[key] = initialPlayerState;
      return acc;
    }, {});

    setGameState(nextState);
  }

  function clearAll() {
    setGameState(initialGameState);
  }

  function getScores() {
    const scores = Object.entries(gameState).map(([name, data]) => ({
      name,
      score: getPlayerScore(data),
    }));

    // TODO: Handle ties
    scores.sort((a, b) => b.score - a.score);

    return scores;
  }

  return [
    gameState,
    {
      addPlayer,
      removePlayer,
      setScore,
      setFewestPudding,
      setMostPudding,
      resetGame,
      clearAll,
      getScores,
    },
  ];
}
