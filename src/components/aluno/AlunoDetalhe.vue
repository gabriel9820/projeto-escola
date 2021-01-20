<template>
  <div>
    <Titulo :texto="'Aluno: ' + aluno.nome" :mostrarVoltar="!visualizando">
      <button v-show="visualizando" class="btn btnEditar" @click="editar()">
        Editar
      </button>
    </Titulo>
    <table>
      <tbody>
        <tr>
          <td class="colunaPequena">ID</td>
          <td>
            <label>{{ aluno.id }}</label>
          </td>
        </tr>
        <tr>
          <td class="colunaPequena">Nome</td>
          <td>
            <label v-if="visualizando">{{ aluno.nome }}</label>
            <input v-else v-model="aluno.nome" type="text" />
          </td>
        </tr>
        <tr>
          <td class="colunaPequena">Nascimento</td>
          <td>
            <label v-if="visualizando">{{ aluno.nascimento }}</label>
            <input v-else v-model="aluno.nascimento" type="text" />
          </td>
        </tr>
        <tr>
          <td class="colunaPequena">Professor</td>
          <td>
            <!-- não foi possivel usar aluno.professor.nome, dava erro ao acessar a propriedade e bugava a navegação -->
            <label v-if="visualizando">{{ aluno.professor }}</label>
            <select v-else v-model="aluno.professor">
              <option
                v-for="(professor, indice) in professores"
                :key="indice"
                :value="professor"
              >
                {{ professor.nome }}
              </option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>

    <div style="margin-top: 10px">
      <div v-if="!visualizando">
        <button class="btn btnSalvar" @click="salvar()">Salvar</button>
        <button class="btn btnCancelar" @click="cancelar()">Cancelar</button>
      </div>
    </div>
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
      id: this.$route.params.id,
      aluno: {},
      professores: [],
      visualizando: true,
    };
  },
  created() {
    this.$http
      .get("http://localhost:3000/alunos/" + this.id)
      .then((resposta) => {
        this.aluno = resposta.data;
      });

    this.$http.get("http://localhost:3000/professores/").then((resposta) => {
      this.professores = resposta.data;
    });
  },
  methods: {
    editar() {
      this.visualizando = !this.visualizando;
    },
    cancelar() {
      this.visualizando = !this.visualizando;
    },
    salvar() {
      let _aluno = {
        id: this.aluno.id,
        nome: this.aluno.nome,
        nascimento: this.aluno.nascimento,
        professor: this.aluno.professor,
      };

      this.$http.put("http://localhost:3000/alunos/" + _aluno.id, _aluno);
      this.visualizando = !this.visualizando;
    },
  },
};
</script>

<style scoped>
.colunaPequena {
  width: 20%;
}

.btnEditar {
  float: right;
  background-color: rgb(76, 186, 249);
}

.btnSalvar {
  float: right;
  background-color: rgb(79, 196, 68);
}

.btnCancelar {
  float: left;
  background-color: rgb(255, 0, 0);
}

input,
select {
  margin: 0;
  padding: 5px 10px;
  font-size: 0.9em;
  border: 1px solid silver;
  border-radius: 5px;
  font-family: Montserrat;
  width: 95%;
  background-color: rgb(245, 245, 245);
}

select {
  height: 38px;
  width: 98%;
}
</style>
