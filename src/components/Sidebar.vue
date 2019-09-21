<template>
  <div>
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
      integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
      crossorigin="anonymous"
    >
    <nav class="navbar navbar-expand-lg sidebar bg-gradient-pinklight">
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <div class="sidebar-sticky">
          <h6
            class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
          >
            <span>管理列表</span>
            <a class="d-flex align-items-center text-muted" href="#">
              <span data-feather="plus-circle"></span>
            </a>
          </h6>
          <router-link class="nav-link" to="/admin/products">
            <i class="fas fa-box-open mr-1"></i>產品列表
          </router-link>
          <router-link class="nav-link" to="/admin/orders">
            <i class="fas fa-list-alt mr-2"></i>訂單列表
          </router-link>
          <router-link class="nav-link" to="/admin/coupons">
            <i class="fas fa-ticket-alt mr-2"></i>優惠券
          </router-link>
          <router-link class="nav-link" to="/index" target="_blank">
            <i class="fas fa-cookie mr-2"></i>回到前台
          </router-link>
          <input
          class="form-control form-control-dark d-flex col-11 d-lg-none"
          type="text"
          placeholder="Search"
          aria-label="Search"
        >
        <ul class="navbar-nav px-3 d-block d-lg-none">
          <li class="nav-item text-nowrap">
            <a class="nav-link h5 font-weight-bold" href="#" @click.prevent="signout()">登出</a>
          </li>
        </ul>
        </div>
        
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    signout() {
      const vm = this;
      const api = `${process.env.APIPATH}/logout`;
      this.$http.post(api).then(response => {
        if (response.data.success) {
          console.log(response.data);
          vm.$router.push("/admin/login");
        }
      });
    }
  }
};
</script>