<template>
  <div class="item-card">
    <div class="item-image bg-cover p-relative" :style="{backgroundImage: `url(${productData.imageUrl})`}"></div>
    <div class="item-love-icon">
      <label class="love-checked-display">
        <input type="checkbox" class="love-checkbox" />
        <i class="fas fa-heart fa-2x text-pinkdark love-show"></i>
        <i class="far fa-heart fa-2x text-pinkdark love-hidden"></i>
      </label>
    </div>
    <div class="item-body py-3 d-flex text-center">
      <div class="item-name col">{{ productData.title }}</div>
      <div class="item-pric col">
        <strong>NT{{ productData.origin_price | currency }}</strong>
      </div>
    </div>
    <div class="item-footer">
      <div class="row no-gutters">
        <div class="col text-center">
          <button class="btn btn-block btn-pinkdark text-nowrap" @click.prevent="productIntro">詳細介紹</button>
        </div>
        <div class="col text-center border-left border-white">
          <button class="btn btn-block btn-pinkdark text-nowrap" @click.prevent="returnProductID">加入購物車</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return{

        }
    },
    props: {
        productData: {
            type: Object,
            default: {}
        }
    },
    methods: {
    returnProductID(){
      const vm = this;
      vm.$emit('returnProductID', vm.productData.id);
    },
    productIntro(){
      const vm = this;
      vm.$router.push(`/product/${vm.productData.id}`);
    }
  },
}
</script>

