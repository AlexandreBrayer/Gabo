<script>
  import { FontAwesomeIcon } from "fontawesome-svelte";
  import { token, userName, userId } from "../stores/userStore";
  import { toasts, ToastContainer, FlatToast } from "svelte-toasts";
  import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
  let name = "";
  let otp = "";
  let password = "";
  let password2 = "";
  const showToast = (title, description, succes) => {
    toasts.add({
      title: title,
      description: description,
      duration: 5000,
      placement: "bottom-right",
      type: succes ? "success" : "error",
      theme: "dark",
    });
  };
  function register(e) {
    e.preventDefault();
    if (password !== password2) {
      showToast("Error", "Passwords do not match", false);
      return;
    }
    fetch(import.meta.env.VITE_API + "/guest/toUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        otp: otp,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data)
          showToast("Success", "You have successfully registered", true);
          name = "";
          otp = "";
          password = "";
          password2 = "";
          $token = data.user.token;
          $userName = data.user.name;
          $userId = data.user.userId;
          localStorage.setItem("token", data.user.token);
        } else {
          showToast("Error", data.message, false);
        }
      });
  }
</script>

<svelte:head>
  <title>Register</title>
</svelte:head>
<form class=" user-form box mt-6">
  <div class="field mb-4">
    <p class="control has-icons-left has-icons-right">
      <input bind:value={name} class="input" type="text" placeholder="Name" />
      <span class="icon is-small is-left">
        <FontAwesomeIcon icon={faUser} />
      </span>
    </p>
  </div>
  <div class="field mb-4">
    <p class="control has-icons-left">
      <input
        bind:value={otp}
        class="input"
        type="text"
        placeholder="One Time Password"
      />
      <span class="icon is-small is-left">
        <FontAwesomeIcon icon={faLock} />
      </span>
    </p>
  </div>
  <div class="field mb-4">
    <p class="control has-icons-left">
      <input
        bind:value={password}
        class="input"
        type="password"
        placeholder="Password"
      />
      <span class="icon is-small is-left">
        <FontAwesomeIcon icon={faLock} />
      </span>
    </p>
  </div>
  <div class="field mb-4">
    <p class="control has-icons-left">
      <input
        bind:value={password2}
        class="input"
        type="password"
        placeholder="Confirm password"
      />
      <span class="icon is-small is-left">
        <FontAwesomeIcon icon={faLock} />
      </span>
    </p>
  </div>
  <div class="field">
    <p class="control">
      <button on:click={register} class="button is-success"> Register </button>
    </p>
  </div>
</form>
<ToastContainer placement="bottom-right" let:data>
  <FlatToast {data} />
</ToastContainer>