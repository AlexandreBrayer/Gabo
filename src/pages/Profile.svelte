<script>
  import { onMount } from "svelte";
  import { token } from "../stores/userStore.js";
  import UserCard from "../lib/UserCard.svelte";

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
{/if}
