<template>
  <div class="main-container">
    <img src="/secret.png">
    <div class="input-containers">
      <CreateSecret />
      <GetSecret />
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss">


  .main-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 50%;
    }

    .input-containers {
      display: flex;
      flex-direction: row;
      gap: 20px;
      align-items: center;
    }

  }
</style>