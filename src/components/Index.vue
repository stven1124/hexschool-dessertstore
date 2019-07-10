<template>
  <div>
    <Alert/>
    <NavbarFront/>
    <router-view/>
    <FooterSection/>
    <div class="back">
      <a href="#">
        <i class="far fa-arrow-alt-circle-up fa-4x"></i>
      </a>
    </div>
  </div>
</template>

<script>
import  NavbarFront from '@/components/navbarFront' ;
import  FooterSection from '@/components/footerSection' ;
import $ from "jquery";
import Alert from './AlertMessage';

export default {
  components: {
    NavbarFront,
    FooterSection,
    Alert,
  }
};

$(document).ready(function() {
  $('.back').hide(0);

  $(window).scroll(function () {
        if ($(this).scrollTop() > $(window).height() / 4 ) {
            $('.back').fadeIn(500);
        } else {
            $('.back').fadeOut();
        }
    });
  //返回網頁頂端
  $(".back a").click(function(event) {
    event.preventDefault();
    $("html,body").animate({ scrollTop: 0 }, 700);
  });
});
</script>