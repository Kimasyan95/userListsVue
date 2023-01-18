const usersStore = {
  namespaced: true,
  state: {
    list: [
      {
        id: 1873,
        phone: "89372374336",
        fullName: "Иванов Иван Иванович",
        balance: 34534,
        active: true,
        login: "test",
        password: "test",
      },
      {
        id: 1349,
        phone: "89372364736",
        fullName: "Петров Игорь Владимирович",
        balance: 843857,
        active: false,
        login: "",
        password: "",
      },
      {
        id: 1345,
        phone: "89372364736",
        fullName: "Дарницкий Вячеслав Владиславович",
        balance: 983475,
        active: true,
        login: "",
        password: "",
      },
      {
        id: 1687,
        phone: "89372364736",
        fullName: "Петров Игорь Владимирович",
        balance: 843857,
        active: true,
        login: "",
        password: "",
      },
      {
        id: 1567,
        phone: "89272364736",
        fullName: "Скрябин Иван Григорьевич",
        balance: 2344,
        active: false,
        login: "",
        password: "",
      },
    ],
  },
  getters: {
    usersList: (state) => state.list,
  },
  mutations: {
    ADD_USER(state, user) {
      state.list.push(user);
    },
  },
  actions: {
    addNewUser({ commit }, user) {
      const newUser = {
        ...user,
        id: String(Math.random() * 1000000).substring(0, 4),
        active: true,
      };

      commit("ADD_USER", newUser);
    },
  },
};

export default usersStore;
