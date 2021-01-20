import { createWebHistory, createRouter } from "vue-router";
import Professores from "./components/professor/Professores";
import Alunos from "./components/aluno/Alunos";
import AlunoDetalhe from "./components/aluno/AlunoDetalhe";
import Sobre from "./components/sobre/Sobre";

const routes = [
  {
    path: "/professores",
    name: "Professores",
    component: Professores,
  },
  {
    path: "/alunos",
    name: "Alunos",
    component: Alunos,
  },
  {
    path: "/alunos/:idProfessor",
    name: "AlunosDoProfessor",
    component: Alunos,
  },
  {
    path: "/alunoDetalhe/:id",
    name: "AlunoDetalhe",
    component: AlunoDetalhe,
  },
  {
    path: "/sobre",
    name: "Sobre",
    component: Sobre,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
