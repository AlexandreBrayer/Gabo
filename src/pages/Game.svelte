<script>
  import GamerCard from "../lib/GamerCard.svelte";
  import { groupStore, roundsStore, gameStore } from "../stores/gameStore.js";
  import ScoreSummary from "../lib/ScoreSummary.svelte";
  import {navigate} from "svelte-routing";
  let gamers = [];
  let game = {
    players: $groupStore.map((player) => player._id),
    scores: $groupStore.reduce((acc, player) => {
      acc[player._id] = 0;
      return acc;
    }, {}),
  };
  let scoreSummary = $groupStore.reduce((acc, player) => {
    acc[player.name] = 0;
    return acc;
  }, {});
  let rounds = [];
  function newRound() {
    let gamerInfos = [];
    for (let i = 0; i < gamers.length; i++) {
      gamerInfos.push(gamers[i].dumpScore());
      gamers[i].reset();
    }
    let scores = gamerInfos.reduce((acc, cur) => {
      acc[cur.user._id] = cur.roundScore;
      return acc;
    }, {});
    let gabos = gamerInfos.reduce((acc, cur) => {
      if (cur.gabo) {
        acc.push(cur.user._id);
      }
      return acc;
    }, []);
    let lowpens = gamerInfos.reduce((acc, cur) => {
      if (cur.lowpen) {
        acc.push(cur.user._id);
      }
      return acc;
    }, []);
    let highpens = gamerInfos.reduce((acc, cur) => {
      if (cur.highpen) {
        acc.push(cur.user._id);
      }
      return acc;
    }, []);

    for (let i = 0; i < gamers.length; i++) {
      game.scores[gamerInfos[i].user._id] += gamerInfos[i].roundScore;
      scoreSummary[gamerInfos[i].user.name] += gamerInfos[i].roundScore;
    }
    let lowDownhills = gamerInfos.reduce((acc, cur) => {
      if (!cur.lowpen && !cur.highpen && game.scores[cur.user._id] == 50 && gabos.indexOf(cur.user._id) == -1) {
        acc.push(cur.user._id);
        scoreSummary[cur.user.name] /= 2;
        game.scores[cur.user._id] /= 2;
      }
      return acc;
    }, []);

    let highDownhills = gamerInfos.reduce((acc, cur) => {
      if (!cur.lowpen && !cur.highpen && game.scores[cur.user._id] == 100) {
        acc.push(cur.user._id);
        scoreSummary[cur.user.name] /= 2;
        game.scores[cur.user._id] /= 2;
      }
      return acc;
    }, []);

    let round = {
      players: $groupStore.map((player) => player._id),
      scores: scores,
      gabo: gabos,
      lowpen: lowpens,
      highpen: highpens,
      lowDownhill: lowDownhills,
      highDownhill: highDownhills,
    };
    rounds.push(round);
    $roundsStore = rounds;
    $gameStore = game

    for (let i = 0; i < $groupStore.length; i++) {
      if (scoreSummary[$groupStore[i].name] >= 120) {
        navigate("/gameover");
      }
    }
  }
</script>

<svelte:head>
  <title>Game</title>
</svelte:head>

<div class="game-container mt-4 p-4">
  {#each $groupStore as user, i}
    <GamerCard {user} bind:this={gamers[i]} />
  {/each}
  <button on:click={newRound} class="button is-info">Next round</button>
  <ScoreSummary {scoreSummary} />
</div>
