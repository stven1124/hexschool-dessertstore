<template>
  <div>
    <loading :active.sync="isLoading" :is-full-page="true">
      <template slot="default">
        <i class="fas fa-spinner fa-pulse fa-5x" style="color:#F1B1C3;"></i>
      </template>
    </loading>
    <section class="container my-6">
      <div class="row">
        <div class="col-md-4 mb-5">
          <div class="sticky-top">
            <h2 class="mb-0 py-3 text-center bg-pinkdark text-white h4 font-weight-bold">餅乾類別</h2>
            <div class="list-group text-center">
              <a href="#products" class="list-group-item list-group-item-action h4" @click="category.title='所有餅乾',getProducts()" :class="{'active': category.title == '所有餅乾' }">所有餅乾</a>
              <a href="#products" class="list-group-item list-group-item-action h4" @click="category.title='迷你卡通',getProducts()" :class="{'active': category.title == '迷你卡通' }">迷你卡通</a>
              <a href="#products" class="list-group-item list-group-item-action h4" @click="category.title='原創曲奇',getProducts()" :class="{'active': category.title == '原創曲奇' }">原創曲奇</a>
              <a href="#products" class="list-group-item list-group-item-action h4" @click="category.title='手繪肖像',getProducts()" :class="{'active': category.title == '手繪肖像' }">手繪肖像</a>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="row products">
            <div
              class="col-md-6 mb-4"
              v-for="item in getCategory"
              :key="item.id"
              v-show="item.is_enabled == 1"
            >
              <div class="item-card">
                <div
                  class="item-image bg-cover p-relative"
                  :style="{backgroundImage: `url(${item.imageUrl})`}"
                ></div>
                <div class="item-love-icon">
                  <label class="love-checked-display">
                    <input type="checkbox" class="love-checkbox">
                    <i class="fas fa-heart fa-2x text-pinkdark love-show"></i>
                    <i class="far fa-heart fa-2x text-pinkdark love-hidden"></i>
                  </label>
                </div>
                <div class="item-body py-3 d-flex text-center">
                  <div class="item-name col">{{ item.title }}</div>
                  <div class="item-pric col">
                    <strong>NT{{ item.origin_price | currency }}</strong>
                  </div>
                </div>
                <div class="item-footer">
                  <div class="row no-gutters">
                    <div class="col text-center">
                      <button class="btn btn-block btn-pinkdark" @click.prevent="productIntro(item.id)">詳細介紹</button>
                    </div>
                    <div class="col text-center border-left border-white">
                      <button class="btn btn-block btn-pinkdark" @click.prevent="addtoCart(item.id)">加入購物車</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <PaginationFront :pages="pagination" @emitPages="getProducts"></PaginationFront>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import PaginationFront from "../PaginationFront";

export default {
  data() {
    return {
      products: [],
      product: [],
      pagination: [],
      isLoading: false,
      category: {
        title: '所有餅乾',
      },
    };
  },
  components: {
    PaginationFront
  },
  methods: {
    getProducts() {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.APIPATH}/api/${
        process.env.CUSTOMERPATH
      }/products/all`;
      this.$http.get(url).then(response => {
        if (response.data.success) {
          console.log(response.data);
          vm.products = response.data.products;
          vm.pagination = response.data.pagination;
          vm.isLoading = false;
        }
      });
    },
    productIntro(id){
      const vm = this;
      vm.$router.push(`/product/${id}`);
    },
    addtoCart(id, qty=1) {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.APIPATH}/api/${
        process.env.CUSTOMERPATH
      }/cart`;
      const cart =  {
        product_id: id,
        qty,
      }
      this.$http.post(url, {data: cart}).then(response => {
        if (response.data.success) {
          vm.$bus.$emit('cart:update');
          this.$bus.$emit("messsage:push", response.data.message, "success");
          console.log(response.data);
          vm.isLoading = false;
        }
      });
    },
  },
  computed: {
    getCategory() {
      const vm = this;
      return vm.products.filter((item) => {
        if (vm.category.title === '所有餅乾') {
          return item;
        }
        return item.category === vm.category.title;
      });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>