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
              <div class="alert alert-pinkdark text-center rounded-pill" role="alert">2.金流付款</div>
            </div>
            <div class="col-12 col-sm">
              <div class="alert alert-secondary text-center rounded-pill" role="alert" v-if="!order.is_paid">3.完成</div>
              <div class="alert alert-pinkdark text-center rounded-pill" role="alert" v-else>3.完成</div>
            </div>
          </div>
          <div class="row justify-content-center my-3">
            <div class="col-10">
              <h5 class="py-3 text-center bg-pinkdark text-white" v-if="!order.is_paid">確認付款</h5>
              <h5 class="py-3 text-center bg-pinkdark text-white" v-else>完成結帳</h5>
              <form class="col-12" @submit.prevent="payOrder">
                <table class="table">
                  <tbody>
                    <tr>
                      <th class="py-3">Email</th>
                      <td>{{ order.user.email }}</td>
                    </tr>
                    <tr>
                      <th class="py-3">姓名</th>
                      <td>{{ order.user.name }}</td>
                    </tr>
                    <tr>
                      <th class="py-3">收件人電話</th>
                      <td>{{ order.user.tel }}</td>
                    </tr>
                    <tr>
                      <th class="py-3">收件人地址</th>
                      <td>{{ order.user.address }}</td>
                    </tr>
                    <tr>
                      <th class="py-3">備註</th>
                      <td>{{ order.message }}</td>
                    </tr>
                    <tr>
                      <th class="py-3">付款狀態</th>
                      <td>
                        <span v-if="!order.is_paid">尚未付款</span>
                        <span v-else class="text-success">付款完成</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="text-right" v-if="order.is_paid === false">
                  <button class="btn btn-danger">確認付款去</button>
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
                  顯示訂單細節
                  <i class="fas fa-chevron-down ml-1 align-middle"></i>
                </button>
                <strong class="h3 mb-0">{{order.total | currency}}</strong>
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
                    v-for="item in order.products"
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
      orderId: "",
      order: {
        user: {}
      }
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.APIPATH}/api/${
        process.env.CUSTOMERPATH
      }/order/${vm.orderId}`;
      this.$http.get(url).then(response => {
        if (response.data.success) {
          console.log(response.data);
          vm.order = response.data.order;
          vm.isLoading = false;
        }
      });
    },
    payOrder() {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/pay/${
        vm.orderId
      }`;
      this.$http.post(url).then(response => {
        if (response.data.success) {
          vm.getOrder();
          console.log(response.data);
          vm.isLoading = false;
        }
      });
    }
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
    console.log(this.orderId);
  }
};
</script>