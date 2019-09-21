<template>
  <div>
    <loading :active.sync="isLoading" :is-full-page="true">
      <template slot="default">
        <i class="fas fa-spinner fa-pulse fa-5x" style="color:#F1B1C3;"></i>
      </template>
    </loading>
    <div class="table-responsive text-nowrap">
      <table class="table mt-2">
        <thead>
          <th width="100">購買時間</th>
          <th width="100">Email</th>
          <th width="100">姓名</th>
          <th width="100">購買款項</th>
          <th width="80">應付金額</th>
          <th width="80">是否付款</th>
          <th width="130">操作</th>
        </thead>
        <tbody v-for="item in orders" :key="item.id">
          <td>{{ item.create_at | date}}</td>
          <td>{{ item.user.email }}</td>
          <td>{{ item.user.name }}</td>
          <td>
            <ul class="list-unstyled">
              <li
                v-for="(product, i) in item.products"
                :key="i"
              >{{ product.product.title }}數量:{{ product.qty }}{{ product.product.unit }}</li>
            </ul>
          </td>
          <td class="text-right">{{ item.total | currency}}</td>
          <td>
            <span class="text-success" v-if="item.is_paid">已付款</span>
            <span class="text-success text-danger" v-else>未付款</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openModal(item)">修改</button>
          </td>
        </tbody>
      </table>
    </div>

    <PaginationBack :pages="pagination" @emitPages="getOrderList"></PaginationBack>

    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-pinkdark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>修改訂單</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="form-row">
                  <div class="form-group col-12">
                    <label for="email">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      placeholder="請輸入Email"
                      maxlength="60"
                      v-model="tempOrder.user.email"
                    >
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="name">姓名</label>
                    <input
                      type="text"
                      class="form-control"
                      id="name"
                      placeholder="請輸入姓名"
                      v-model="tempOrder.user.name"
                    >
                  </div>
                  <div class="form-group col-md-6">
                    <label for="tel">電話</label>
                    <input
                      type="tel"
                      class="form-control"
                      id="tel"
                      placeholder="請輸入電話"
                      v-model="tempOrder.user.tel"
                    >
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-12">
                    <label for="address">地址</label>
                    <input
                      type="address"
                      class="form-control"
                      id="address"
                      placeholder="請輸入地址"
                      v-model="tempOrder.user.address"
                    >
                  </div>
                  <div class="form-group col-12">
                    <label for="total_money">應付金額</label>
                    <input
                      type="number"
                      class="form-control"
                      id="total_money"
                      v-model="tempOrder.total"
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-pinkdark text-white" @click="updateOrder">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import PaginationBack from "../PaginationBack";

export default {
  data() {
    return {
      orders: [],
      tempOrder: {
        user: ""
      },
      pagination: {},
      isLoading: false
    };
  },
  components: {
    PaginationBack
  },
  methods: {
    getOrderList(page = 1) {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.APIPATH}/api/${
        process.env.CUSTOMERPATH
      }/admin/orders?page=${page}`;
      this.$http.get(url).then(response => {
        if (response.data.success) {
          vm.orders = response.data.orders;
          vm.pagination = response.data.pagination;
          console.log(response.data);
          vm.isLoading = false;
        }
      });
    },
    openModal(item) {
      this.tempOrder = Object.assign({}, item);
      $("#productModal").modal("show");
    },
    updateOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${
        process.env.CUSTOMERPATH
      }/admin/order/${vm.tempOrder.id}`;
      this.$http.put(url, { data: vm.tempOrder }).then(response => {
        if (response.data.success) {
          console.log(response.data);
          $("#productModal").modal("hide");
          vm.getOrderList(vm.page = vm.pagination.current_page);
          this.$bus.$emit("messsage:push", response.data.message, "success");
        } else {
          $("#productModal").modal("hide");
          vm.getOrderList(vm.page = vm.pagination.current_page);
          this.$bus.$emit("messsage:push", response.data.message, "danger");
        }
      });
    },
  },
  created() {
    this.getOrderList();
  }
};
</script>