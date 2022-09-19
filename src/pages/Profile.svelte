<script>
  import { onMount } from "svelte";
  import { token, userId, userName } from "../stores/userStore.js";
  import ProfileGameCard from "../lib/ProfileGameCard.svelte";
  import UserCard from "../lib/UserCard.svelte";
  import { navigate } from "svelte-routing";
  import Loader from "../lib/Loader.svelte";
  import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "fontawesome-svelte";
  function logout() {
    $token = null;
    $userId = null;
    $userName = null;
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  }

  let userInfos = null;
  let page = 0;
  let games = [];

  function nextPage() {
    page++;
    getGames();
  }
  function previousPage() {
    page--;
    getGames();
  }

  function getGames() {
    fetch(import.meta.env.VITE_API + "/game/mygames?page=" + page, {
      headers: {
        Authorization: $token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        games = data.games;
      });
  }

  function getUserInfo() {
    fetch(import.meta.env.VITE_API + "/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: $token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          userInfos = data.user;
        } else {
          userInfos = null;
        }
      });
  }
  onMount(() => {
    getUserInfo();
    getGames();
  });
</script>

{#if userInfos}
  <UserCard user={userInfos} />
  <h5 class="title is-5 ml-4 mt-4">Mes parties</h5>
  {#each games as game}
    <ProfileGameCard {game} />
  {/each}
  <div class="navigator">
    <button on:click={previousPage} disabled={page < 1} class="button is-info">
      <FontAwesomeIcon icon={faAngleLeft} /></button
    >
    <button on:click={nextPage} class="button is-info">
      <FontAwesomeIcon icon={faAngleRight} /></button
    >
  </div>
  <button class="button is-danger m-4" on:click={logout}>Logout</button>
{:else}
  <Loader />
{/if}

<style>
  .navigator {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    width: 90%;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
