<template>
  <div>
    <loading :active.sync="isLoading" :is-full-page="true">
      <template slot="default">
        <i class="fas fa-spinner fa-pulse fa-5x" style="color:#F1B1C3;"></i>
      </template>
    </loading>
    <div class="container py-5">
      <div class="d-flex flex-column-reverse flex-lg-row">
        <div class="col-12 col-lg-8">
          <div class="row form-row d-none d-lg-flex">
            <div class="col-12 col-sm">
              <div class="alert alert-pinkdark text-center rounded-pill" role="alert">1.輸入訂單資料</div>
            </div>
            <div class="col-12 col-sm">
              <div class="alert alert-secondary text-center rounded-pill" role="alert">2.金流付款</div>
            </div>
            <div class="col-12 col-sm">
              <div class="alert alert-secondary text-center rounded-pill" role="alert">3.完成</div>
            </div>
          </div>
          <div class="row justify-content-center my-3">
            <div class="col-10">
              <h5 class="py-3 text-center bg-pinkdark text-white">訂購人資訊</h5>
              <form class="needs-validation" @submit.prevent="createOrder">
                <div class="form-row novalidate">
                  <div class="col-12 mb-3">
                    <label for="email">*Email</label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      placeholder="Email"
                      name="email"
                      v-model="form.user.email"
                      :class="{'is-invalid': errors.has('email')}"
                      v-validate="'required|email'"
                    >
                    <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
                  </div>
                  <div class="col-12 mb-3">
                    <label for="name">*姓名</label>
                    <input
                      type="text"
                      class="form-control"
                      id="name"
                      placeholder="姓名"
                      name="name"
                      v-model="form.user.name"
                      :class="{'is-invalid': errors.has('name')}"
                      v-validate="'required'"
                    >
                    <span class="text-danger" v-if="errors.has('name')">請輸入姓名！</span>
                  </div>
                  <div class="col-12 mb-3">
                    <label for="tel">*電話</label>
                    <input
                      type="tel"
                      class="form-control"
                      id="tel"
                      placeholder="0212345678"
                      name="tel"
                      v-model="form.user.tel"
                      :class="{'is-invalid': errors.has('tel')}"
                      v-validate="'required'"
                    >
                    <span class="text-danger" v-if="errors.has('tel')">請輸入電話！</span>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <label for="address">*地址</label>
                      <input
                        type="address"
                        class="form-control"
                        id="address"
                        placeholder="重慶南路一段122號"
                        name="address"
                        v-model="form.user.address"
                        :class="{'is-invalid': errors.has('address')}"
                        v-validate="'required'"
                      >
                      <span class="text-danger" v-if="errors.has('address')">請輸入地址！</span>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <label for="remark">備註</label>
                      <textarea
                        maxlength="50"
                        type="text"
                        class="form-control"
                        id="remark"
                        placeholder="有任何需求都可以在此留言"
                        style="height:150px;"
                        v-model="form.message"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-end">
                  <button class="btn btn-outline-secondary" type="submit">繼續選購</button>
                  <button class="btn btn-pinkdark text-white ml-1" type="submit">送出訂單</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4">
          <div class="accordion" id="accordionExample">
            <div class="card border-0">
              <div class="card-header d-flex justify-content-between" id="headingOne">
                <button
                  class="btn btn-link p-0"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  顯示購物車細節
                  <i class="fas fa-chevron-down ml-1 align-middle"></i>
                </button>
                <strong class="h3 mb-0">{{cart.final_total | currency}}</strong>
              </div>
              <div
                id="collapseOne"
                class="collapse show"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
              >
                <table class="table">
                  <div
                    class="d-flex flex-column flex-md-row py-3"
                    v-for="item in cart.carts"
                    :key="item.id"
                  >
                    <div class="d-flex align-items-center flex-grow-1">
                      <div class="mt-2 mr-4 flex-grow-1 flex-md-grow-0">
                        <div
                          class="bg-cover cart-image"
                          :style="{backgroundImage: `url(${item.product.imageUrl})`}"
                        ></div>
                      </div>
                      <div class="d-flex flex-column flex-md-row flex-md-grow-1">
                        <div class="mr-3" style="width: 80px;">
                          <span class="h5">{{item.product.title}}</span>
                          <br>
                          <span>NT{{ item.product.price | currency }}</span>
                        </div>
                        <div class="align-items-center d-flex mr-3">
                          <span class="h5">{{item.qty }}{{ item.product.unit }}</span>
                        </div>
                        <div class="align-items-center d-flex">
                          <span class="h5">{{item.qty*item.product.price | currency}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </table>
              </div>
            </div>
          </div>
          <div class="cart-box-btn mx-md-0 my-3">
            <router-link
              to="/cart"
              class="btn btn-graylight btn-block btn-lg py-3 text-greendark"
            >修改訂單</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      cart: {},
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      }
    };
  },
  methods: {
    getCart() {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/cart`;
      this.$http.get(url).then(response => {
        if (response.data.success) {
          console.log(response.data);
          vm.cart = response.data.data;
          vm.isLoading = false;
        }
      });
    },
    createOrder() {
      const vm = this;
      vm.isLoading = true;
      const order = vm.form;
      const url = `${process.env.APIPATH}/api/${
        process.env.CUSTOMERPATH
      }/order`;
      this.$validator.validate().then(valid => {
        if (valid) {
          this.$http.post(url, { data: order }).then(response => {
            console.log("訂單已建立", response.data);
            vm.isLoading = false;
            if (response.data.success) {
              vm.$router.push(`checkout/${response.data.orderId}`);
            }
          });
        } else {
          console.log("欄位不完整");
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