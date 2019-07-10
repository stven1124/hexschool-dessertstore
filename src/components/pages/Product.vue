<template>
  <div class="container mt-3">
    <loading :active.sync="isLoading" :is-full-page="true">
      <template slot="default">
        <i class="fas fa-spinner fa-pulse fa-5x" style="color:#F1B1C3;"></i>
      </template>
    </loading>
    <div class="row">
      <div class="col-md-8">
        <img
          :src="product.imageUrl"
          class="w-100"
          alt
        >
        <div class="productIntro">
          <h3>產品描述</h3>
          <p>{{ product.description }}</p>
        </div>
        <div class="alert alert-secondary" role="alert">
          <h4 class="alert-heading text-center h2">購物說明</h4>
          <p class="pl-4">
            您好，每週二、日不接單，其餘日期皆可詢問，請提早1個月前預約才有機會選擇您想要的到貨日，如訊息未回請耐心等候，謝謝。
          </p>
          <hr class="border-white mt-0">
          <p>
            📣訂購前非看不可的注意事項:
            <ol>
              <li>請一定要先瀏覽過甜樂希作品相簿，喜歡Amelie的手繪風格信任再行訂購</li>
              <li>喜歡曾經做過的作品建議訂購固定款式(整組不做修改)</li>
              <li>原創不挑款款式不可和其它曾經做過的相比，款式及圖案會經常做變化，若指定某個款式及圖案要一模一樣的，請在下訂前截圖或圈選告知</li>
              <li>均可選擇喜歡的色系，因手工餅乾為純手工製作，調色、配色、顏色、打洞位置，無法百分之百相同，製作完成的成品皆在白天自然光下拍攝(Amelie非專業攝影用手機拍攝，因天氣變化光線有所不同)，不接受和室內晚上燈光陰暗處相比，些許的淺及深不影響整體美觀，每個人美感主觀不一，設計及調色皆以實際產品為主。</li>
              <li>以上有任何個人主觀想法，均不接受和想像中的不一樣，不喜歡要退款、退貨，訂購前請先三思，喜歡及信任再行下標。</li>
            </ol>
          </p>
          <hr class="border-white mt-0">
          <p>
            👉一律黑貓宅急便配送運費另計
            <ol>
              <li>商品寄出後會通知已出貨，請在當天注意是否有到貨，到貨後請通知一聲</li>
              <li>收到餅乾第一時間先檢查餅乾是否有損壞，請拍照包裝及餅乾的照片私訊告知</li>
              <li>餅乾每片以氣泡袋保護，損壞機率非常小，除非遇到粗心的配送人員摔貨造成餅乾碎裂，破損不再重新製作，請評估及承擔餅乾破損的風險，同意者再行下標。</li>
            </ol>
          </p>
          <hr class="border-white mt-0">
          <p class="pl-4">
            甜樂希繪製的作品一直以來都帶給大家歡樂的感覺<br>
            可愛的繪圖參與每一個不管是收涎活動/幼稚園慶生/婚禮宴客<br>
            都能讓大朋友小朋友感受到用心<br>
            甜樂希未來繪製方向以「童趣」為主<br>
            不管在製作、設計、繪製上都會努力呈現<br>
            ❤請多多支持❤
          </p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="sticky-top bg-pinkdark px-3 py-4">
          <h1 class="h2 pb-2 text-center text-white">
            {{ product.title }}
          </h1>
          <hr class="border-white mt-0">
          <div class="d-flex justify-content-end mb-3">
            <del class="text-muted align-self-end">售價 {{ product.origin_price | currency}}</del>
            <div class="h3 mb-0 ml-auto text-white">
              <small>一口價 NT</small>
              <strong>{{ product.price | currency}}</strong>
            </div>
          </div>
          <div class="input-group mb-2">
            <select class="form-control" v-model="product.buyNum">
              <option :value="num" v-for="num in 10" :key="num">{{ num }}{{ product.unit }}</option>
            </select>
          </div>
          <p class="text-right text-main font-weight-bold  mb-2">
						小計 {{product.buyNum*product.price | currency}}
					</p> 
          
          <a href="#" class="btn btn-block btn-lg btn-graylight font-weight-bold" @click.prevent="addtoCart(product.id, product.num)">加入購物車</a>
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
      productID: "",
      product: {}
    };
  },
  methods: {
    getProduct(id) {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.APIPATH}/api/${
        process.env.CUSTOMERPATH
      }/product/${id}`;
      this.$http.get(url).then(response => {
        if (response.data.success) {
          console.log(response.data);
          vm.product = response.data.product;
          vm.$set(vm.product,'buyNum',1);
          vm.isLoading = false;
        }
      });
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
  created() {
    const vm = this;
    vm.productID = vm.$route.params.id;
    vm.getProduct(vm.productID);
  },
};
</script>