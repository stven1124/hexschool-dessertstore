<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-white mt-2">
      <div class="container">
        <button
          class="navbar-toggler border-0"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand navbar-front-brand" href="index.html">
          <h1 class="text-pinkdark mt-2 mt-md-0">甜樂希</h1>
        </a>
        <router-link class="cart-icon text-pinkdark px-2 order-md-1" to="/cart">
          <i class="fas fa-shopping-cart fa-2x"></i>
          <span class="cart-icon-counter" v-if="cart.carts && cart.carts.length != 0">
          {{ cart.carts.length }}
        </span>
        </router-link>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul class="navbar navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link text-pinkdark px-4 menu-active" to="/index">首頁</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-pinkdark px-4 menu-active" to="/Shopping">商品</router-link>
            </li>
            <li class="nav-item">
              <a
                class="nav-link text-pinkdark nav-border-bottom px-4"
                href="login.html"
                data-toggle="modal"
                data-target="#loginModal"
              >登入</a>
            </li>
            <span class="magic-line d-none d-md-block"></span>
          </ul>
        </div>
      </div>
    </nav>

    <!-- 登入後台彈跳視窗 -->
    <div
      class="modal fade"
      id="loginModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="loginModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-pinkdark">
            <h5 class="modal-title text-white" id="registerModalLabel">甜樂希管理平台登入</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="form-signin" @submit.prevent="signin()">
              <label for="inputEmail" class="sr-only">請輸入電子郵件</label>
              <input
                type="email"
                id="inputEmail"
                class="form-control mb-3"
                placeholder="請輸入電子郵件"
                v-model="user.username"
                required
                autofocus
              >
              <label for="inputPassword" class="sr-only">請輸入密碼</label>
              <input
                type="password"
                id="inputPassword"
                class="form-control mb-3"
                placeholder="請輸入密碼"
                v-model="user.password"
                required
              >
              <div class="checkbox mb-1 ml-1">
                <label>
                  <input type="checkbox" value="remember-me"> 記住我
                </label>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                <button type="submit" class="btn btn-pinkdark text-white">登入</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      cart:{},
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    signin() {
      const api = `${process.env.APIPATH}/admin/signin`;
      const vm = this;
      this.$http.post(api, vm.user).then(response => {
        if (response.data.success) {
          $("#loginModal").modal("hide");
          vm.$router.push("/admin/products");
          console.log(response.data);
        } else {
          alert("登入失敗！");
        }
      });
    },
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
  },
  created() {
    const vm = this;
    vm.getCart();
    //更新Navbar裡購物車icon數量
    vm.$bus.$on('cart:update', () => {
      vm.getCart();
    });
  }
};

$(document).ready(function() {
//Menu底部特效
  let selectors = {
    navBar: ".navbar",
    navItem: ".nav-item",
    activeNavItem: ".router-link-exact-active",
    magicLine: ".magic-line"
  };
  // 監聽
  let navBar = document.querySelector(selectors.navBar);
  let navItems = document.querySelectorAll(selectors.navItem);
  let magicLine = document.querySelector(selectors.magicLine);
  let activeNavItem = document.querySelector(selectors.activeNavItem);

  // 底部移動特效
  function setMagicLine(navItem) {
    let x = navItem.offsetLeft;
    let width = navItem.offsetWidth;
    magicLine.style.transform = `translateX(${x}px)`;
    magicLine.style.width = `${width}px`;
  }

  //先固定在第一個active上
  setMagicLine(activeNavItem);
  // navBar.addEventListener("mouseleave", e => {
  //   setMagicLine(activeNavItem);
  // });

  //滑鼠移到Navbar上底部特效跟著跑
  navItems.forEach(navItem => {
    navItem.addEventListener("mouseenter", e => {
      setMagicLine(navItem);
    });
  });

  //點擊時，底部特效停留在點擊選項上
  navItems.forEach(navItem => {
    navItem.addEventListener("click", e => {
      setMagicLine(navItem);
    });
  });

  //收合Navbar
  $('.nav-item').click(function(event) {
        event.preventDefault();
        $(this).parents().find('.show').removeClass('show');
    });
});
</script>

<style lang="scss" scoped>
.navbar-front-brand {
  width: 150px;
  height: 70px;
  background-image: url("../../src/assets/images/lovely_sweet_pink_s_logo.png");
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  text-indent: 101%;
  white-space: nowrap;
  overflow: hidden;
}

.menu li a {
  display: block;
  text-decoration: none;
  color: #f1b1c3;
  padding: 18px 25px;
}

.navbar-nav {
  display: flex;
  position: relative;
  .magic-line {
    height: 5px;
    background-color: #f1b1c3;
    left: 0;
    bottom: 0;
    position: absolute;
    transition: all 0.4s;
  }
  &:after {
    content: "";
    height: 5px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    opacity: 0.3;
  }
  .nav-item {
    color: #f1b1c3;
    display: block;
    padding: 0.7rem 1.2rem;
    text-decoration: none;
  }
}

.form-signin {
  width: 100%;
  padding: 15px;
  margin: auto;
}

.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
</style>