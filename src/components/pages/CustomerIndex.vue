<template>
  <div>
    <loading :active.sync="isLoading" :is-full-page="true">
      <template slot="default">
        <i class="fas fa-spinner fa-pulse fa-5x" style="color:#F1B1C3;"></i>
      </template>
    </loading>
    <div class="mb-md-1">
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active header-carousel-item carousel-1-background">
            <div class="carousel-caption">
              <h5>歡迎來到 甜樂希Lovely sweet 手工創意糖霜餅乾</h5>
              <p
                class="d-none d-md-block"
              >甜樂希Lovely sweet目前提供收涎餅乾/婚禮小物/彌月/生日禮物/客製化餅乾等節慶販售，糖霜餅乾全程手工製作。</p>
            </div>
          </div>
          <div class="carousel-item header-carousel-item carousel-2-background">
            <div class="carousel-caption">
              <h5>大口的放縱，毫無保留</h5>
              <p class="d-none d-md-block">彌月餅乾，生日餅乾，收涎餅乾，婚禮小物。</p>
            </div>
          </div>
          <div class="carousel-item header-carousel-item carousel-3-background">
            <div class="carousel-caption">
              <h5>選擇最頂級最新鮮的食材做成最完美的餅乾</h5>
              <p
                class="d-none d-md-block"
              >餅乾成分：法國總統牌無鹽奶油/雞蛋/砂糖/糖粉/水手牌蛋糕粉/馬玉山杏仁粉/Wilton色膏+色筆/Rainbow dsut色膏+色筆+色粉</p>
            </div>
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>

    <section class="container my-md-5">
      <h2 class="h1 text-pinkdark text-center my-md-5 my-4">熱門商品</h2>
      <div class="row">
        <div
          class="col-xl-4 mb-5"
          v-for="(item) in getthreeProduct"
          :key="item.id"
        >
          <div class="item-card">
            <div
              class="item-image bg-cover p-relative"
              :style="{backgroundImage: `url(${item.imageUrl})`}"
            ></div>
            <div class="item-tag">本日精選</div>
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
                  <button
                    class="btn btn-block btn-pinkdark"
                    @click.prevent="productIntro(item.id)"
                  >詳細介紹</button>
                </div>
                <div class="col text-center border-left border-white">
                  <button class="btn btn-block btn-pinkdark" @click="addtoCart(item.id)">加入購物車</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-5 my-md-8">
      <div class="bg-pinkdark">
        <div class="container">
          <div class="row animated">
            <div class="col-md-6 section-vertical-margin-md">
              <div
                class="bg-cover h-100 section-intro-image section-1-images border border-graylight my-4 my-md-0"
              ></div>
            </div>
            <div class="col-md-6 d-flex justify-content-end section-vertical-content">
              <div class="section-vertical-md text-white py-5 py-md-3">
                <p class="h2">選用最精緻的盒子，送給自己最心愛的人。</p>
                <div class="py-md-5">
                  <p class="mb-0">素面的牛皮紙盒。</p>
                  <p class="mb-0">甜樂希繪製的作品一直以來都帶給大家歡樂的感覺,可愛的繪圖參與每一個不管是收涎活動/幼稚園慶生/婚禮宴客。</p>
                  <p class="mb-0">都能讓大朋友小朋友感受到用心,甜樂希未來繪製方向以「童趣」為主。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="my-md-8">
      <div class="bg-pinkdark">
        <div class="container">
          <div class="row flex-row-reverse animated">
            <div class="col-md-6 section-vertical-margin-md">
              <div
                class="bg-cover h-100 section-intro-image section-2-images border border-graylight my-4 my-md-0"
              ></div>
            </div>
            <div class="col-md-6 d-flex justify-content-end section-vertical-content">
              <div class="section-vertical-md text-white py-5 py-md-3">
                <p class="h2">選擇最頂級最新鮮的食材,做成最完美的餅乾。</p>
                <div class="py-md-5">
                  <p
                    class="mb-0"
                  >餅乾成分：法國總統牌無鹽奶油/雞蛋/砂糖/糖粉/水手牌蛋糕粉/馬玉山杏仁粉/Wilton色膏+色筆/Rainbow dsut色膏+色筆+色粉。</p>
                  <p class="mb-0">不管在製作、設計、繪製上都會努力呈現，請多多支持。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container mb-5">
        <div class="d-flex justify-content-center flex-wrap my-md-5 my-3 pt-2">
        <h2 class="h1 text-pinkdark text-center pr-3">如需客製化</h2>
        <h2 class="h1 text-pinkdark text-center">請填寫以下訂單</h2>
        </div>
        <div class="row">
          <div class="col-md-6 mt-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d115703.27785170762!2d121.3497015!3d25.0093761!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb5d1ab2a91%3A0x961491c123bb786c!2z5Zub5Zub5Y2X5p2R57Ch5Zau5biC6ZuG!5e0!3m2!1szh-TW!2stw!4v1560018563993!5m2!1szh-TW!2stw"
              width="100%"
              height="450"
              frameborder="0"
              style="border:0"
              allowfullscreen
            ></iframe>
          </div>
          <div class="col-md-6">
            <form action="#" class="needs-validation" novalidate>
              <div class="form-group">
                <label for="username">姓名*</label>
                <input type="text" class="form-control" id="username" placeholder="請輸入姓名" required>
                <div class="invalid-feedback">請輸入姓名</div>
              </div>
              <div class="form-group">
                <label for="tel">請輸入電話號碼*</label>
                <input type="tel" class="form-control" id="tel" placeholder="請輸入電話號碼" required>
                <div class="invalid-feedback">請輸入電話號碼</div>
              </div>
              <div class="form-group">
                <label for="email">請輸入 Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="name@example.com"
                  required
                >
                <div class="invalid-feedback">請輸入電子信箱</div>
              </div>
              <div class="form-group">
                <label for="num">餅乾總數量*</label>
                <input type="number" class="form-control" id="num" placeholder="請輸入數字" required>
                <div class="invalid-feedback">請輸入數量</div>
              </div>
              <div class="form-group">
                <label for="telTime">方便聯絡時間</label>
                <input type="text" class="form-control" id="telTime" placeholder="請輸入時間" required>
                <div class="invalid-feedback">請輸入時間</div>
              </div>
              <div class="text-right">
                <button type="button" class="btn btn-secondary">取消</button>
                <button type="submit" class="btn btn-primary">送出</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <section class="py-4 bg-pinkdark">
      <div class="container">
        <div class="row justify-content-center">
          <div
            class="col-md-5 d-flex align-items-center justify-content-center justify-content-md-start mb-4 mb-md-0"
          >
            <label class="mx-3 text-white h4 mb-0" for="subemail">訂閱我的最新資訊</label>
          </div>
          <div class="col-md-5">
            <div class="d-flex justify-content-between">
              <label
                for="subemail"
                class="bg-white text-pinkdark border-0 d-flex align-items-center px-4 py-3 mb-0"
              >
                <i class="fas fa-envelope"></i>
              </label>
              <input
                type="text"
                class="form-input bg-white border-0 w-100 py-3 pl-2"
                placeholder
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                id="subemail"
              >
              <div class="input-group-append">
                <button class="btn btn-graylight py-3 px-3" type="button" id="button-addon2">
                  <i class="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      isLoading: false,
      products: []
    };
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
          vm.$bus.$emit('cart:update');
          this.$bus.$emit("messsage:push", response.data.message, "success");
          console.log(response.data);
          vm.isLoading = false;
        }
      });
    },
    productIntro(id) {
      const vm = this;
      vm.$router.push(`/product/${id}`);
    }
  },
  computed: {
    getthreeProduct() {
      {
        return this.products.filter(function(item, index) {
          if (item.is_enabled == 1 && index < 3 ){
            return item;
          }
        });
      }
    }
  },
  created() {
    this.getProducts();
  }
};

$(document).ready(function() {
  //Section 圖片和文章　FadeIn
  var showSkill = false;
  $(".scrollTop").click(function(e) {
    e.preventDefault();
    var target = $(this).attr("href");
    var targetPos = $(target).offset().top;
    $("html, body").animate({ scrollTop: targetPos }, 1000);
  });

  $(window).on("scroll", function() {
    var scrollPos = $(window).scrollTop();
    var windowHeight = $(window).height();

    $(".scrollTop").each(function() {
      var target = $(this).attr("href");
      var targetPos = $(target).offset().top;
      var targetHeight = $(target).outerHeight();
      if (targetPos - 1 <= scrollPos && targetPos + targetHeight > scrollPos) {
        $(".scrollTop").removeClass("active");
        $(this).addClass("active");
      } else {
        $(this).removeClass("active");
      }
    });

    // animated
    $(".animated").each(function() {
      var thisPos = $(this).offset().top;
      if (windowHeight + scrollPos >= thisPos) {
        $(this).addClass("fadeIn");
      }
    });
  });
});
</script>


<style scope lang="scss">
/* Section 圖片 */
.carousel-1-background {
  background-image: url("../../assets/images/carousel_1.jpg");
}

.carousel-2-background {
  background-image: url("../../assets/images/carousel_2.jpg");
}

.carousel-3-background {
  background-image: url("../../assets/images/carousel_3.jpg");
}

.section-1-images {
  background-image: url("../../assets/images/section_1.jpg");
  &:hover {
    box-shadow: 0 0 10px #efe4e4;
  }
}

.section-2-images {
  background-image: url("../../assets/images/section_2.jpg");
  background-position: -55px 0px;
  &:hover {
    box-shadow: 0 0 10px #efe4e4;
  }
}

// animated
.animated {
  opacity: 0;
  transition: all 1s;
  transform: translateY(50px);
}

.fadeIn {
  opacity: 1;
  transform: translateY(0px);
}
</style>