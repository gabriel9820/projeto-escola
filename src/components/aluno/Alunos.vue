<template>
  <div>
    <Titulo texto="Alunos" />
    <div>
      <input
        type="text"
        placeholder="Nome do Aluno"
        v-model="nome"
        @keyup.enter="adicionarAluno()"
      />
      <button class="btn btn_Input" @click="adicionarAluno()">Adicionar</button>
    </div>
    <table>
      <thead>
        <th>Matrícula</th>
        <th>Nome</th>
        <th>Opções</th>
      </thead>
      <tbody v-if="alunos.length > 0">
        <tr v-for="(aluno, indice) in alunos" :key="indice">
          <td>{{ aluno.id }}</td>
          <td>{{ aluno.nome }}</td>
          <td>
            <button class="btn btn_Danger" @click="removerAluno(aluno)">
              Remover
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot v-else>
        <tr>
          <td colspan="3" style="text-align: center">
            Nenhum aluno encontrado!
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import Titulo from "../_shared/Titulo.vue";

export default {
  components: {
    Titulo,
  },
  data() {
    return {
      alunos: [],
      nome: "",
    };
  },
  created() {
    // cada .then() passa o retorno para o próximo
    this.$http.get("http://localhost:3000/alunos/").then((resposta) => {
      this.alunos = resposta.data;
    });
  },
  methods: {
    adicionarAluno() {
      let _aluno = {
        nome: this.nome,
      };

      this.$http
        .post("http://localhost:3000/alunos/", _aluno)
        .then((resposta) => {
          this.alunos.push(resposta.data);
          this.nome = "";
        });
    },
    removerAluno(aluno) {
      this.$http.delete(`http://localhost:3000/alunos/${aluno.id}`).then(() => {
        let indice = this.alunos.indexOf(aluno);
        this.alunos.splice(indice, 1);
      });
    },
  },
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  border: 0;
  padding: 20px;
  font-size: 1.3em;
  color: #687f7f;
  display: inline;
}

.btn_Input {
  width: 150px;
  border: 0;
  padding: 20px;
  font-size: 1.3em;
  background-color: rgb(116, 115, 115);
  display: inline;
}
</style>
