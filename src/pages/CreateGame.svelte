<script>
  import MyGroup from "../lib/MyGroup.svelte";
  import UserList from "../lib/UserList.svelte";
  import { groupStore, scoreboardStore } from "../stores/gameStore";
  import { userId, userName } from "../stores/userStore";
  import { faSearch } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "fontawesome-svelte";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { toasts, ToastContainer, FlatToast } from "svelte-toasts";
  let users = [];
  let rawUsers = [];
  let group = [];
  $scoreboardStore = []
  userId.subscribe((id) => {
    if (id) {
      group = [
        {
          _id: $userId,
          name: $userName,
        },
      ];
    }
  });

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

  let search = "";
  function searchUsers() {
    fetch(`${import.meta.env.VITE_API}/user/search?name=${search}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          users = data.users.filter((user) => {
            return !group.find((g) => g._id === user._id);
          });
          rawUsers = data.users;
        } else {
          users = [];
        }
      });
  }

  function addToGroup(e) {
    let userToAdd = e.detail;
    if (group.find((user) => user._id === userToAdd._id)) {
      showToast("Error", "User already in group", false);
    } else {
      showToast("Success", "User added to group", true);
      group = [...group, userToAdd];
    }
    users = rawUsers.filter((user) => {
      return !group.find((g) => g._id === user._id);
    });
  }
  function removeFromGroup(e) {
    let userToRemove = e.detail;
    if (!group.find((user) => user._id === userToRemove._id)) {
      showToast("Error", "User not in group", false);
    } else {
      showToast("Success", "User removed from group", true);
      group = group.filter((user) => user._id !== userToRemove._id);
    }
    users = rawUsers.filter((user) => {
      return !group.find((g) => g._id === user._id);
    });
  }

  function createGame() {
    $groupStore = group;
    navigate("/game");
  }
  onMount(() => {
    searchUsers();
  });
</script>

<svelte:head>
  <title>Create Game</title>
</svelte:head>

<div class="create-game">
  {#if group.length > 1}
    <button class="button is-primary" on:click={createGame}>
      Create Game
    </button>
  {:else}
    <button disabled class="button is-primary" on:click={createGame}>
      Create Game
    </button>
  {/if}
</div>

<MyGroup on:addToGroup={addToGroup} on:removeFromGroup={removeFromGroup} {group} />
<div class="centered-title mb-5">
  <h3 class="title is-5 mt-5 ml-3">
    <FontAwesomeIcon icon={faSearch} />
    <span>Rechercher un joueur</span>
  </h3>
</div>
<div class="search-user-container">
  <input
    bind:value={search}
    class="search-user input"
    type="text"
    placeholder="Rechercher un joueur"
    on:keyup={searchUsers}
  />
</div>

<UserList on:addToGroup={addToGroup} {users} />

<ToastContainer placement="bottom-right" let:data>
  <FlatToast {data} />
</ToastContainer>
