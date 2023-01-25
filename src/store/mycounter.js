import { create } from 'zustand';

const useMyCounter = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

const useMyAddModal = create((set) => ({
  addModal: false,
  showModalTrue: () => set({ addModal: true }),
  showModalFalse: () => set({ addModal: false }),
}));

const useMyEditModal = create((set) => ({
  editModal: false,
  showModalTrueEdit: () => set({ editModal: true }),
  showModalFalseEdit: () => set({ editModal: false }),
}));

const useMyCrud = create((set) => ({
  data: [],
  item: {},
  addData: (newData) => set((state) => ({ data: [...state.data, ...newData] })),
  getItem: (item) => set({ item: item }),
  editData: (updatedItem) =>
    set((state) => {
      const index = state.data.findIndex((item) => item.id === updatedItem.id);
      if (index === -1) return state;
      const newData = [...state.data];
      newData[index] = updatedItem;
      return { data: newData };
    }),
  deleteData: (id) =>
    set((state) => {
      const index = state.data.findIndex((item) => item.id === id);
      if (index === -1) return state;
      const newData = [...state.data];
      newData.splice(index, 1);
      return { data: newData };
    }),
}));

export { useMyCounter, useMyAddModal, useMyCrud, useMyEditModal };
