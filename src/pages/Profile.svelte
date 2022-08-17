<script>
  import { onMount } from "svelte";
  import { token } from "../stores/userStore.js";
  import ProfileGameCard from "../lib/ProfileGameCard.svelte";
  import UserCard from "../lib/UserCard.svelte";
  import { navigate } from "svelte-routing";
  import Loader from "../lib/Loader.svelte";
  function logout() {
    $token = null;
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  }

  let userInfos = null;
  let games = [];
  function getGames() {
    fetch(import.meta.env.VITE_API + "/game/mygames", {
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
        console.log(data);
        if (data.success) {
          userInfos = data.user;
          console.log(userInfos);
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
  <button class="button is-danger m-4" on:click={logout}>Logout</button>
{:else}
  <Loader />
{/if}
