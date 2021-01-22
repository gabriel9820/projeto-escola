<template>
  <div>
    <Titulo texto="Professores" />
    <table>
      <thead>
        <th>ID</th>
        <th>Nome</th>
        <th>Alunos</th>
      </thead>
      <tbody v-if="professores.length > 0">
        <tr v-for="(professor, indice) in professores" :key="indice">
          <td class="colunaPequena">{{ professor.id }}</td>
          <td>
            <router-link :to="`/alunos/${professor.id}`">
              {{ professor.nome }}
            </router-link>
          </td>
          <td class="colunaPequena">{{ professor.totalAlunos }}</td>
        </tr>
      </tbody>
      <tfoot v-else>
        <tr>
          <td colspan="3" style="text-align: center">
            Nenhum professor encontrado!
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import Titulo from "../_shared/Titulo";

export default {
  components: {
    Titulo,
  },
  data() {
    return {
      professores: [],
      alunos: [],
    };
  },
  created() {
    // cada .then() passa o retorno para o próximo
    this.$http.get("http://localhost:5000/api/alunos").then((resposta) => {
      this.alunos = resposta.data;
      this.getProfessores();
    });
  },
  methods: {
    getTotalAlunos() {
      this.professores.forEach((professor, indice) => {
        professor = {
          id: professor.id,
          nome: professor.nome,
          totalAlunos: this.alunos.filter(
            (aluno) => aluno.professorId == professor.id
          ).length,
        };

        this.professores[indice] = professor;
      });
    },
    getProfessores() {
      this.$http.get("http://localhost:5000/api/professores").then((resposta) => {
        this.professores = resposta.data;
        this.getTotalAlunos();
      });
    },
  },
};
</script>
<style scoped>
.colunaPequena {
  text-align: center; 
  width: 10%
}
</style>
