<template>
  <!-- contain my body structure -->
  <div class="container-fuid" style="padding: 40px">
    <!-- input search -->
    <div class="row">
      <div class="col-md-12">
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">Find a book</span>
          <input
            type="text"
            @change="getMatch($event)"
            :value="query"
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
    <div class="row">
      <div class="col-md-6">
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping"
            >number of results</span
          >
          <input
            type="number"
            max="10"
            @change="getAmount($event)"
            v-model="amount"
            class="form-control"
            placeholder="Enter the name of the book"
            aria-label="Username"
            aria-describedby="addon-wrapping"
          />
        </div>
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
      amount: 10,
      standardValue: true,
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.getMatch("JavaScript");
      this.standardValue = false;
    });
  },
  methods: {
    getMatch(e) {
      this.titles = [];
      this.subtitle = [];
      this.isbn13 = [];
      this.price = [];
      this.url = [];
      console.log(e);
      if (typeof e === "string") this.query = e;
      if (this.standardValue === false && typeof e === "object")
        this.query = e.target.value;
      //comunicación con la api
      const url = `https://api.itbook.store/1.0/search/${this.query}`;
      axios
        .get(url)
        .then((response) => {
          const elementList = response.data.books;
          console.log(this.amount);
          console.log(this.query);

          elementList.map((e, i) => {
            if (i < this.amount) {
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
    getAmount() {
      this.getMatch(this.query);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/table.scss";
</style>
