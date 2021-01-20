<template>
  <div>
    <Titulo
      :texto="idProfessor ? 'Alunos do professor: ' + professor.nome : 'Alunos'"
    />
    <div v-if="idProfessor">
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
        <th>ID</th>
        <th>Nome</th>
        <th>Opções</th>
      </thead>
      <tbody v-if="alunos.length > 0">
        <tr v-for="(aluno, indice) in alunos" :key="indice">
          <td class="colunaPequena">{{ aluno.id }}</td>
          <td>
            <router-link :to="`/alunoDetalhe/${aluno.id}`">{{
              aluno.nome
            }}</router-link>
          </td>
          <td class="colunaPequena">
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
      idProfessor: this.$route.params.idProfessor,
      alunos: [],
      professor: {},
      nome: "",
    };
  },
  created() {
    // cada .then() passa o retorno para o próximo

    if (this.idProfessor) {
      this.getProfessor();

      this.$http
        .get("http://localhost:3000/alunos?professor.id=" + this.idProfessor)
        .then((resposta) => {
          this.alunos = resposta.data;
        });
    } else {
      this.$http.get("http://localhost:3000/alunos/").then((resposta) => {
        this.alunos = resposta.data;
      });
    }
  },
  methods: {
    adicionarAluno() {
      let _aluno = {
        nome: this.nome,
        professor: this.professor,
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
    getProfessor() {
      this.$http
        .get("http://localhost:3000/professores/" + this.idProfessor)
        .then((resposta) => {
          this.professor = resposta.data;
        });
    },
  },
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  width: calc(100% - 195px);
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

.colunaPequena {
  text-align: center;
  width: 10%;
}
</style>
