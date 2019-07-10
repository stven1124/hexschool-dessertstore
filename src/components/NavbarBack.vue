<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-dark fixed-top flex-lg-nowrap p-1 bg-pinkdark shadow"
    >
      <router-link class="navbar-brand col-2 mr-0" to="/admin/products">甜樂希管理後台</router-link>
      <button
        class="navbar-toggler border border-white rounded"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <input
        class="form-control form-control-dark w-100 d-none  d-lg-block"
        type="text"
        placeholder="Search"
        aria-label="Search"
      >
      <ul class="navbar-nav px-3 d-none d-lg-block">
        <li class="nav-item text-nowrap">
          <a class="nav-link h5 font-weight-bold" href="#" @click.prevent="signout()">登出</a>
        </li>
      </ul>
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
          vm.$router.push("/index");
        }
      });
    }
  }
};
</script>