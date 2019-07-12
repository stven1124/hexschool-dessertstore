<template>
  <div>
    <loading :active.sync="isLoading" :is-full-page="true">
      <template slot="default">
        <i class="fas fa-spinner fa-pulse fa-5x" style="color:#F1B1C3;"></i>
      </template>
    </loading>
    <section class="container my-md-5">
      <div class="row">
        <div class="col-md-8" v-if="cart.carts && cart.carts.length != 0">
          <h1 class="bg-pinkdark text-white text-center mb-0 py-4 h4">您的購物車</h1>
          <div
            class="d-flex flex-column flex-md-row py-3"
            v-for="item in cart.carts"
            :key="item.id"
          >
            <div class="d-flex align-items-center flex-grow-1 mr-md-3">
              <div class="my-4 mr-4 flex-grow-1 flex-md-grow-0">
                <div
                  class="bg-cover cart-image"
                  :style="{backgroundImage: `url(${item.product.imageUrl})`}"
                ></div>
              </div>
              <div class="d-flex flex-column flex-md-row flex-md-grow-1 mr-md-3">
                <div class="mr-md-4">
                  <span class="h5">{{item.product.title}}</span>
                  <br />
                  <span>NT{{ item.product.price | currency }}</span>
                </div>
                <div class="ml-auto cart-control align-items-center d-flex">
                  <div class="input-group">
                    <span class="h5 mb-0 mr-md-1">{{item.qty }}{{ item.product.unit }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="ml-md-auto align-items-center py-3 justify-content-end d-flex flex-md-row-reverse"
            >
              <a href="#" class="btn" @click.prevent="delCartProduct(item.id)">
                <i class="fas fa-trash-alt"></i>
              </a>
              <span class="h5 mb-0 mr-md-1">NT{{item.qty*item.product.price | currency}}</span>
            </div>
          </div>
        </div>
        <div class="col-md-4" v-if="cart.carts && cart.carts.length != 0">
          <div class="p-md-3 pt-0 py-3 cart-box-content">
            <h2 class="text-center cart-box-title py-3 h4">訂單摘要</h2>
            <hr class="border-white mt-0" />
            <div class="d-flex justify-content-between mb-2">
              <span>小計</span>
              <span>NT{{ cart.total | currency}}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span class="h5">總計</span>
              <span class="h5">NT{{ cart.final_total | currency}}</span>
            </div>
          </div>
          <div class="cart-box-btn mx-md-0">
            <router-link
              to="/checkorders"
              class="btn btn-graylight btn-block btn-lg py-3 text-greendark mb-3"
            >結帳</router-link>
          </div>
        </div>
        <div class="col-md-12 text-center" v-else>
          <div class="jumbotron bg-white text-pinkdark">
            <h1 class="display-4 font-weight-bold">購物車內空無一物!</h1>
            <p
              class="lead font-weight-bold"
            >請挑選喜歡的商品再前來購物車</p>
            <hr class="my-4">
            <p class="pb-2 font-weight-bold">找不到商品嗎? 請點選下面按鈕前往商品頁！</p>
            <router-link class="btn btn-pinkdark btn-lg text-white" to="/shopping" role="button">繼續逛逛</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      cart: {}
    };
  },
  methods: {
    getCart() {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/cart`;
      this.$http.get(url).then(response => {
        if (response.data.success) {
          vm.$bus.$emit("cart:update");
          console.log(response.data);
          vm.cart = response.data.data;
          vm.isLoading = false;
        }
      });
    },
    delCartProduct(id) {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/cart/${id}`;
      this.$http.delete(url).then(response => {
        if (response.data.success) {
          vm.$bus.$emit("cart:update");
          this.$bus.$emit("messsage:push", response.data.message, "success");
          console.log(response.data);
          this.getCart();
          vm.isLoading = false;
        }
      });
    }
  },
  created() {
    this.getCart();
  }
};
</script>