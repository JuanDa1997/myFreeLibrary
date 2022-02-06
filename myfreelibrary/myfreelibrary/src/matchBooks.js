import axios from "axios";

export default {
  data() {
    return {
      todos: null,
    };
  },
  mounted() {
    this.getMatch();
  },
  methods: {
    getMatch() {
      const url = "https://api.itbook.store/1.0/search/?q=programmer";
      axios
        .get(url)
        .then((response) => {
          return response.data.books;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
