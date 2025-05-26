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
      "delete": "Delete",
      "spanish": "Spanish",
      "english": "English",
      "portuguese": "Portuguese"
    }
  },
  es: {
    translation: {
      "title": "Lista de Tareas",
      "totalTasks": "N° Tareas",
      "pendingTasks": "Pendientes",
      "addTaskPlaceholder": "¿Qué hay que hacer?",
      "addTaskButton": "Agregar",
      "delete": "Eliminar",
      "spanish": "Español",
      "english": "Inglés",
      "portuguese": "Portugués"
    }
  },
  pt: {
    translation: {
      "title": "Lista de Tarefas",
      "totalTasks": "Total de Tarefas",
      "pendingTasks": "Pendentes",
      "addTaskPlaceholder": "O que precisa ser feito?",
      "addTaskButton": "Adicionar",
      "delete": "Excluir",
      "spanish": "Espanhol",
      "english": "Inglês",
      "portuguese": "Português"
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
