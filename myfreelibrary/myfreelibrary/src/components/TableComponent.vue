<template>
  <!-- contain my body structure -->
  <div class="container-fuid" style="padding: 40px">
    <div class="row">
      <div class="col-md-12">
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">Find a book</span>
          <input
            type="text"
            @change="getMatch($event)"
            v-model="query"
            class="form-control"
            placeholder="Enter the name of the book"
            aria-label="Username"
            aria-describedby="addon-wrapping"
          />
        </div>
      </div>
    </div>

    <!-- table for boostrap -->
    <div class="row">
      <div class="col-md-12">
        <table class="table table-bordered border-primary">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col" class="text-center">Title</th>
              <th scope="col" class="text-center">Subtitle</th>
              <th scope="col" class="text-center">Isbn13</th>
              <th scope="col" class="text-center">Price</th>
              <th scope="col" class="text-center">Url</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(val, i) in titles" :key="i">
              <th scope="row">{{ i + 1 }}</th>
              <td>{{ val }}</td>
              <td>{{ subtitle[i] }}</td>
              <td>{{ isbn13[i] }}</td>
              <td>{{ price[i] }}</td>
              <td>{{ url[i] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TableComponent",
  props: {},
  data() {
    return {
      titles: [],
      subtitle: [],
      isbn13: [],
      price: [],
      url: [],
      query: "",
      standardValue: true,
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.getMatch("JavaScript");
    });
  },
  methods: {
    getMatch(e) {
      this.titles = [];
      this.subtitle = [];
      this.isbn13 = [];
      this.price = [];
      this.url = [];
      this.standardValue === false
        ? (this.query = e.target.value)
        : (this.query = "Javascript");
      console.log(this.query);
      const url = `https://api.itbook.store/1.0/search/${this.query}`;
      axios
        .get(url)
        .then((response) => {
          const elementList = response.data.books;

          elementList.map((e, i) => {
            if (i <= 10) {
              this.titles.push(e.title);
              e.subtitle === ""
                ? this.subtitle.push("N/A")
                : this.subtitle.push(e.subtitle);

              e.isbn13 === ""
                ? this.isbn13.push("N/A")
                : this.isbn13.push(e.isbn13);

              e.price === ""
                ? this.price.push("N/A")
                : this.price.push(e.price);

              e.url === "" ? this.url.push("N/A") : this.url.push(e.url);
            }
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/table.scss";
</style>
