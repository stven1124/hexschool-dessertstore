<template>
  <div>
    <loading :active.sync="isLoading" :is-full-page="true">
      <template slot="default">
        <i class="fas fa-spinner fa-pulse fa-5x" style="color:#F1B1C3;"></i>
      </template>
    </loading>
    <section class="container my-2 my-md-6"  id="position">
      <div class="row">
        <div class="col-xl-4 mb-4">
          <div class="sticky-top">
            <h2 class="mb-0 py-3 text-center bg-pinkdark text-white h4 font-weight-bold">餅乾類別</h2>
            <div class="list-group text-center">
              <a
                href="#products"
                class="list-group-item list-group-item-action h4"
                @click.prevent="changeCategory('所有餅乾')"
                :class="{'active': selected  == '所有餅乾' }"
              >所有餅乾</a>
              <a
                href="#products"
                class="list-group-item list-group-item-action h4"
                @click.prevent="changeCategory('迷你卡通')"
                :class="{'active': selected  == '迷你卡通' }"
              >迷你卡通</a>
              <a
                href="#products"
                class="list-group-item list-group-item-action h4"
                @click.prevent="changeCategory('原創曲奇')"
                :class="{'active': selected  == '原創曲奇' }"
              >原創曲奇</a>
              <a
                href="#products"
                class="list-group-item list-group-item-action h4"
                @click.prevent="changeCategory('手繪肖像')"
                :class="{'active': selected  == '手繪肖像' }"
              >手繪肖像</a>
            </div>
          </div>
        </div>
        <div class="col-xl-8">
          <div class="row products">
            <div
              class="col-md-6 mb-4"
              v-for="item in filterPager"
              :key="item.id"
              v-show="item.is_enabled == 1"
            >
          <ProductCard :productData="item" @returnProductID="addtoCart"></ProductCard>
            </div>
          </div>
          <PaginationFront :pageData="pagination" @changePage="getProducts" v-if="pagination.total_pages >=2"></PaginationFront>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import $ from 'jquery';
import PaginationFront from "../PaginationFront";
import ProductCard from "../ProductCard";

export default {
  data() {
    return {
      products: [],
      isLoading: false,
      selected: "所有餅乾",
      pagination: {
        filterPageSize: 10,
        total_pages: 1,
        current_page: 1,
        has_pre: false,
        has_next: false
      }
    };
  },
  components: {
    PaginationFront,
    ProductCard
  },
  methods: {
    getProducts(page=1) {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/products/all`;
      this.$http.get(url).then(response => {
        if (response.data.success) {
          console.log(response.data);
          vm.products = response.data.products;
          vm.isLoading = false;
			    vm.pagination.current_page = page;  
        }
      });
    },
    addtoCart(id, qty = 1) {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/cart`;
      const cart = {
        product_id: id,
        qty
      };
      this.$http.post(url, { data: cart }).then(response => {
        if (response.data.success) {
          vm.$bus.$emit("cart:update");
          this.$bus.$emit("messsage:push", response.data.message, "success");
          console.log(response.data);
          vm.isLoading = false;
        }
      });
    },
    changeCategory(category) {
      const vm = this;
      vm.selected = category;
      vm.pagination.current_page = 1;
    },
  },
  computed: {
    getCategory() {
      const vm = this;
      return vm.products.filter(item => {
        if (vm.selected === "所有餅乾") {
          $('html, body').scrollTop(0);
          return item;
        } else {
          $('html, body').scrollTop(0);
          return item.category === vm.selected;
        }
      });
    },
    filterPager() {
      const vm = this;
      let dataLen = vm.getCategory.length;
      let nowPage = vm.pagination.current_page;
      vm.pagination.total_pages = Math.ceil(
        dataLen / vm.pagination.filterPageSize
      );
      nowPage > 1
        ? (vm.pagination.has_pre = true)
        : (vm.pagination.has_pre = false);
      nowPage == vm.pagination.total_pages
        ? (vm.pagination.has_next = false)
        : (vm.pagination.has_next = true);
      return vm.getCategory.filter((item, index) => {
        return (
          index < nowPage * vm.pagination.filterPageSize &&
          index >= (nowPage - 1) * vm.pagination.filterPageSize
        );
      });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>