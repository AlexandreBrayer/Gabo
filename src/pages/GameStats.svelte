<script>
  // @ts-nocheck
  import { token } from "../stores/userStore";
  import { onMount } from "svelte";
  import moment from "moment";
  import Chart from "svelte-frappe-charts";
  import Loader from "../lib/Loader.svelte";
  import GameTab from "../lib/GameTab.svelte";
  export let params;
  const id = params.id;
  let game;

  let dataChart = null;
  let barChart = null;

  let highestRound = 0;
  let highestRoundScore = 0;

  let indivStat = "Gabo";

  const STAT_KEY_VALUES = {
    Gabo: "gabo",
    "Petite Redescente": "lowDownhill",
    "Grande Redescente": "highDownhill",
    "Grande Péna": "highpen",
    "Petite Péna": "lowpen",
  };

  function retrivePlayerName(id, players) {
    for (let i = 0; i < players.length; i++) {
      if (players[i]._id == id) {
        return players[i].name;
      }
    }
  }

  function genScoreChart() {
    let scores = [];
    game.scores.forEach((round) => {
      Object.keys(round).forEach((player) => {
        let playerIndex = scores.findIndex((score) => score.name === player);
        if (playerIndex === -1) {
          scores.push({
            name: player,
            values: [round[player]],
          });
        } else {
          scores[playerIndex].values.push(round[player]);
        }
      });
    });
    scores.forEach((p) => {
      p.name = retrivePlayerName(p.name, game.players);
    });
    dataChart = {
      labels: Array.from({ length: game.rounds.length }, (_, i) => i + 1),
      datasets: scores,
    };
  }

  function genBarChart(e = { target: { value: "Gabo" } }) {
    indivStat = e.target.value;
    let stat = STAT_KEY_VALUES[indivStat];
    let labels = game.players.map((p) => p.id);
    let datasets = [
      {
        name: indivStat,
        values: new Array(labels.length).fill(0),
      },
    ];
    game.rounds.forEach((round) => {
      let values = [];
      let roundStats = round[stat];
      labels.forEach((id, index) => {
        if (roundStats.includes(id)) {
          datasets[0].values[index] += 1;
        }
      });
    });
    labels.forEach((id, index) => {
      labels[index] = retrivePlayerName(id, game.players);
    });
    barChart = {
      labels: labels,
      datasets: datasets,
    };
  }

  function findHigestRound() {
    highestRound = 0;
    highestRoundScore = 0;
    game.rounds.forEach((round, index) => {
      let roundScore = 0;
      Object.keys(round.scores).forEach((player) => {
        roundScore += round.scores[player];
      });
      if (roundScore > highestRoundScore) {
        highestRoundScore = roundScore;
        highestRound = index + 1;
      }
    });
  }

  function getStats() {
    fetch(import.meta.env.VITE_API + "/game/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: $token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          game = data.game;
          console.log(game);
          genScoreChart();
          genBarChart();
          findHigestRound();
        }
      });
  }
  onMount(() => {
    getStats();
  });
</script>

<svelte:head>
  <title>GameStats</title>
</svelte:head>

{#if game}
  <h3 class="title is-3 mt-4 ml-4">Stats</h3>
  <span class="ml-4">
    Partie du {moment(game.timestamp).format("DD/MM/YYYY")}
  </span>
  {#if dataChart}
    <Chart data={dataChart} type="line" />
  {/if}
  <div class="select ml-4">
    <select on:change={genBarChart} bind:value={indivStat}>
      <option value="Gabo">Gabo</option>
      <option value="Petite Redescente">Petite Redescente</option>
      <option value="Grande Redescente">Grande Redescente</option>
      <option value="Grande Péna">Grande Péna</option>
      <option value="Petite Péna">Petite Péna</option>
    </select>
  </div>
  {#if barChart}
    <Chart data={barChart} type="bar" />
  {/if}
  <div class="ml-4">
    Le round le plus sanglant est le {highestRound} avec {highestRoundScore} points
    au total
  </div>
  <div class="m-4">
    <GameTab scores={game.scores} players={game.players} />
  </div>
{:else}
  <Loader />
{/if}
