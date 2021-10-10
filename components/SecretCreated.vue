<template>
  <div class="container">
      <img src="/shh.jpg">
      <span class="notice">Shh!</span>
      <span class="notice">Do NOT tell anyone Your secret's hash!!</span>
      <div class="hash-container">
          <span>Hash:</span> <span  class="hash">{{hash}}</span>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        hash: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss" scoped>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
        font-size: 20px;

        img {
            width: 100%;
        }

        .notice {
            font-weight: bold;
            text-decoration: underline;
        }

        .hash-container {
            .hash {
                font-weight: bold;
                text-decoration: underline;
                color: red;
            }
        }
    }
</style>