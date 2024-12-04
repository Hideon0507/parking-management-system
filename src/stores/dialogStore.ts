import { defineStore } from "pinia";
import { ref } from "vue";

export const useDialogStore = defineStore("dialogStore", () => {
  const showDialog = ref(false); 
  const dialogData = ref(null); 

  const openDialog = (data: any) => {
    dialogData.value = data;
    showDialog.value = true;
  };

  const closeDialog = () => {
    showDialog.value = false;
  };

  return {
    showDialog,
    dialogData,
    openDialog,
    closeDialog,
  };
});
