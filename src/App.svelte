<script lang="ts">
  import { token, userId, userName } from "./stores/userStore.js";
  import { Router, Route, Link } from "svelte-routing";
  import Regles from "./pages/Regles.svelte";
  import Profile from "./pages/Profile.svelte";
  import Game from "./pages/Game.svelte";
  import Register from "./pages/Register.svelte";
  import CreateGame from "./pages/CreateGame.svelte";
  import GameOver from "./pages/GameOver.svelte";
  import Login from "./pages/Login.svelte";
  import { onMount } from "svelte";
  export let url = "";
  function tokenLogin() {
    let mytoken = localStorage.getItem("token");
    $token = mytoken;

    fetch(import.meta.env.VITE_API + "/user/tokenLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: mytoken,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          $token = data.token;
          $userName = data.name;
          $userId = data.userId;
          console.log(data);
        } else {
          $token = null;
        }
      });
  }
  onMount(() => {
    tokenLogin();
  });
</script>

<Router {url}>
  <nav class="topnav">
    <Link class="active" to="/">Jouer</Link>
    <div id="myLinks">
      <Link class="not-active" to="/regles">Regles</Link>
      {#if $token}
        <Link class="not-active" to="/profile">Profil</Link>
      {:else}
        <Link class="not-active" to="/login">Login</Link>
        <Link class="not-active" to="/register">Register</Link>
      {/if}
    </div>
  </nav>
  <div>
    <Route path="/"><CreateGame /></Route>
    <Route path="/regles"><Regles /></Route>
    <Route path="/register"><Register /></Route>
    <Route path="/login"><Login /></Route>
    <Route path="/profile"><Profile /></Route>
    <Route path="/game"><Game /></Route>  
    <Route path="/gameover"><GameOver /></Route>
  </div>
</Router>
