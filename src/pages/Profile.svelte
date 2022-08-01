<script>
  import { onMount } from "svelte";
  import { token } from "../stores/userStore.js";
  import UserCard from "../lib/UserCard.svelte";
  import { navigate } from "svelte-routing";
  function logout() {
    $token = null;
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  }

  let userInfos = null;
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
  });
</script>

{#if userInfos}
  <UserCard user={userInfos} />
  <button class="button is-danger m-4" on:click={logout}>Logout</button>
{/if}
