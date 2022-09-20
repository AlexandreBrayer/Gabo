<script>
  import GamerCard from "../lib/GamerCard.svelte";
  import {
    groupStore,
    roundsStore,
    gameStore,
    scoreboardStore,
  } from "../stores/gameStore.js";
  import ScoreSummary from "../lib/ScoreSummary.svelte";
  import { navigate } from "svelte-routing";
  import { onMount } from "svelte";
  import { FontAwesomeIcon } from "fontawesome-svelte";
  import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
  import { toasts, ToastContainer, FlatToast } from "svelte-toasts";
  const showToast = (title, description, succes) => {
    toasts.add({
      title: title,
      description: description,
      duration: 1000,
      placement: "bottom-right",
      type: succes ? "success" : "error",
      theme: "dark",
    });
  };
  let gamers = [];
  let scoreBoard;
  let reloadIsDisabled = true;
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

  function correctLastScore() {
    let lastround = rounds[rounds.length - 1];
    rounds.pop();
    if (lastround) {
      for (let i = 0; i < gamers.length; i++) {
        gamers[i].setScore(lastround);
      }
    }
    for (let i = 0; i < gamers.length; i++) {
      let player = gamers[i].getUser();
      if (lastround.lowDownhill.includes(player._id)) {
        scoreSummary[player.name] = 50 - lastround.scores[player._id];
        game.scores[player._id] = 50 - lastround.scores[player._id];
      } else if (lastround.highDownhill.includes(player._id)) {
        scoreSummary[player.name] = 100 - lastround.scores[player._id];
        game.scores[player._id] = 100 - lastround.scores[player._id];
      } else {
        scoreSummary[player.name] -= lastround.scores[player._id];
        game.scores[player._id] -= lastround.scores[player._id];
      }
    }
    calcScoreBoard();
    reloadIsDisabled = true;
  }

  function calcScoreBoard() {
    let scoreSummaryAsArray = Object.entries(scoreSummary).map(
      ([name, score]) => {
        return { name, score };
      }
    );
    scoreSummaryAsArray.sort((a, b) => a.score - b.score);
    scoreBoard.updateScore(scoreSummaryAsArray);
  }

  function newRound() {
    let gamerInfos = [];
    for (let i = 0; i < gamers.length; i++) {
      let check = gamers[i].dumpScore();
      if (check.roundScore === null || check.roundScore === undefined) {
        showToast("Error", "Please fill in all scores", false);
        return;
      }
    }
    for (let i = 0; i < gamers.length; i++) {
      gamerInfos.push(gamers[i].dumpScore());
      gamers[i].reset();
    }
    reloadIsDisabled = false;
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
      if (
        !cur.lowpen &&
        !cur.highpen &&
        game.scores[cur.user._id] == 50 &&
        gabos.indexOf(cur.user._id) == -1
      ) {
        acc.push(cur.user._id);
        scoreSummary[cur.user.name] /= 2;
        game.scores[cur.user._id] /= 2;
      }
      return acc;
    }, []);

    let highDownhills = gamerInfos.reduce((acc, cur) => {
      if (
        !cur.lowpen &&
        !cur.highpen &&
        game.scores[cur.user._id] == 100 &&
        gabos.indexOf(cur.user._id) == -1
      ) {
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
    $gameStore = game;
    calcScoreBoard();
    let scoreBoard = Object.entries(scoreSummary).reduce((acc, cur) => {
      let id = $groupStore.find((player) => player.name == cur[0])._id;
      acc[id] = cur[1];
      return acc;
    }, {});
    $scoreboardStore.push(scoreBoard);

    for (let i = 0; i < $groupStore.length; i++) {
      if (scoreSummary[$groupStore[i].name] >= 120) {
        navigate("/gameover");
      }
    }
  }
  onMount(() => {
    calcScoreBoard();
  });
</script>

<svelte:head>
  <title>Game</title>
</svelte:head>

<div class="game-container mt-4 p-4">
  {#each $groupStore as user, i}
    <GamerCard {user} bind:this={gamers[i]} />
  {/each}
  <button on:click={newRound} class="button is-info">Next round</button>
  <ScoreSummary bind:this={scoreBoard} />
  <button
    disabled={reloadIsDisabled}
    class="button is-info"
    on:click={correctLastScore}
  >
    <FontAwesomeIcon icon={faArrowRotateLeft} />
  </button>
</div>

<ToastContainer placement="bottom-right" let:data>
  <FlatToast {data} />
</ToastContainer>