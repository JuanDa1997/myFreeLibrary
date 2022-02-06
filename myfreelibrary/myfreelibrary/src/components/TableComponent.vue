<script setup>
// importo mis componenetes
import Modal from "@/components/Modal.vue";
import "animate.css";
</script>

<template>
  <div v-if="loading == true" class="containerLoader">
    <div class="preloader"></div>
  </div>

  <!-- props dinámicos -->
  <Modal v-if="showModal === true" v-bind:img="[myImg, showModal]" />
  <!-- contain my body structure -->
  <div class="container-fluid animate__bounceIn" style="margin-top: 10vh">
    <!-- inputs search -->
    <div class="row">
      <div class="col-md-6">
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

      <div class="col-md-6">
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping"
            >number of results</span
          >
          <input
            type="number"
            max="10"
            min="1"
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

    <!-- table for boostrap -->
    <div class="row" v-if="subtitle != ''">
      <div class="col-md-12">
        <div class="table-responsive">
          <table class="table table-bordered border-primary" id="tblStocks">
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
                <td @click="activateMOdal(val, i)">{{ val }}</td>
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
    <div v-if="subtitle == ''" class="container text-center">
      <img
        src="https://mindd.org/wp-content/uploads/2018/03/404.png"
        alt="404 not found"
      />
      <div class="card" v-if="subtitle == ''">
        <div class="card-body">
          Sorry, we did not find results for your search, please try again.
        </div>
      </div>
    </div>
    <button
      type="button"
      class="btn btn-primary"
      style="margin-bottom: 30px"
      @click="exportData()"
    >
      Dowload Table
    </button>
    <!-- advertencia para ver imagenes -->
    <div class="card text-dark bg-warning mb-3" v-if="subtitle != ''">
      <div class="card-body">
        if you want to see the book preview, please double click on the book's
        title
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TableComponent",

  //seteo mis variables globales para usar en el html
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
      imgList: [],
      myImg: "",
      showModal: false,
      loading: true,
    };
  },
  //se setea los valores que renderizan el dom
  mounted() {
    this.$nextTick(function () {
      this.getMatch("JavaScript");
      this.standardValue = false;
    });
  },
  methods: {
    //entra el valor que digite el usuario
    getMatch(e) {
      //reinicio mis variables para no sobreescribir datos
      this.titles = [];
      this.subtitle = [];
      this.isbn13 = [];
      this.price = [];
      this.url = [];
      this.imgList = [];
      this.loading = true;

      //si el valor inicial es un string, se guarda como tal
      if (typeof e === "string") this.query = e;

      //si es un objeto capturado desde el @change bus el valor y lo guarda
      if (this.standardValue === false && typeof e === "object")
        this.query = e.target.value;

      //comunicación con la api
      const url = `https://api.itbook.store/1.0/search/${this.query}`;
      //axios es una libreria para hacer las peticiones
      axios
        //se pasa la url
        .get(url)
        //se espera que finalice y se pasa el resultado
        .then((response) => {
          //guarda la data de la respuesta de la api
          const elementList = response.data.books;
          //recorro mi lista de objetos y ledigo que sea menor al resultados predefinido por el usuario
          elementList.map((e, i) => {
            if (i < this.amount) {
              this.titles.push(e.title);
              //si los datos están vacios guarda un "N/A"
              e.subtitle === ""
                ? this.subtitle.push("N/A")
                : this.subtitle.push(e.subtitle);

              e.isbn13 === ""
                ? this.isbn13.push("N/A")
                : this.isbn13.push(e.isbn13);

              e.price === ""
                ? this.price.push("N/A")
                : this.price.push(e.price);

              e.image === ""
                ? this.imgList.push("N/A")
                : this.imgList.push(e.image);

              e.url === "" ? this.url.push("N/A") : this.url.push(e.url);
            }
          });
          this.loading = false;
        })
        // capuro los datos donde hago click
        .catch((e) => {
          console.log(e);
        });
    },
    //cuando el change del No resultados detecta su uso, llama de nuevo a getMatch
    //hace la busqueda con el dato anterior pero con el nuevo dato del No de resultados
    getAmount() {
      this.getMatch(this.query);
    },
    //mando la imagen a mi modal
    //y lo hago visible
    activateMOdal(e, i) {
      this.showModal === true
        ? (this.showModal = false)
        : (this.showModal = true);
      this.myImg = this.imgList[i];
    },
    //método para descargar la tabla
    exportData() {
      /* Get the HTML data using Element by Id */
      const table = document.getElementById("tblStocks");

      /* Declaring array variable */
      const rows = [];

      //iterate through rows of table
      for (let i = 0, row; (row = table.rows[i]); i++) {
        //rows would be accessed using the "row" variable assigned in the for loop
        //Get each cell value/column from the row
        const column1 = row.cells[0].innerText;
        const column2 = row.cells[1].innerText;
        const column3 = row.cells[2].innerText;
        const column4 = row.cells[3].innerText;
        const column5 = row.cells[4].innerText;
        const column6 = row.cells[5].innerText;

        /* add a new records in the array */
        rows.push([column1, column2, column3, column4, column5, column6]);
      }
      let csvContent = "data:text/csv;charset=utf-8,";
      /* add the column delimiter as comma(,) and each row splitted by new line character (\n) */
      rows.map((e) => {
        const row = e.join(",");
        csvContent += row + "\r\n";
      });

      /* create a hidden <a> DOM node and set its download attribute */
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "Stock_Price_Report.csv");
      document.body.appendChild(link);
      /* download the data file named "Stock_Price_Report.csv" */
      link.click();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/table.scss";
</style>
