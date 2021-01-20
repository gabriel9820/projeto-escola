<template>
  <div>
    <div style="display: flex; width: 50%">
      <h2>{{ texto }}</h2>
      <div class="voltar">
        <slot></slot>
        <button class="btn btnVoltar" v-show="mostrarVoltar" @click="voltar()">Voltar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    texto: String,
    mostrarVoltar: Boolean
  },
  methods: {
    voltar() {
      this.$router.back();
    }
  },
};
</script>

<style scoped>
.voltar {
  width: 50%;
  position: absolute;
  margin-top: 15px;
}

.btnVoltar {
  float: right;
  background-color: rgb(199, 199, 199);
}
</style>
