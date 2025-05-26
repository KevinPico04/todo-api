import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "title": "TODO List",
      "totalTasks": "Total Tasks",
      "pendingTasks": "Pending",
      "addTaskPlaceholder": "What needs to be done?",
      "addTaskButton": "Add",
      "delete": "Delete"
    }
  },
  es: {
    translation: {
      "title": "Lista de Tareas",
      "totalTasks": "N° Tareas",
      "pendingTasks": "Pendientes",
      "addTaskPlaceholder": "¿Qué hay que hacer?",
      "addTaskButton": "Agregar",
      "delete": "Eliminar"
    }
  },
  pt: {
    translation: {
      "title": "Lista de Tarefas",
      "totalTasks": "Total de Tarefas",
      "pendingTasks": "Pendentes",
      "addTaskPlaceholder": "O que precisa ser feito?",
      "addTaskButton": "Adicionar",
      "delete": "Excluir"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es',
    fallbackLng: 'es',
    interpolation: { escapeValue: false }
  });

export default i18n;
