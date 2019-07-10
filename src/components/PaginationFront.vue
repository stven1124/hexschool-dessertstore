<template>
    <div class="d-flex justify-content-center">
      <nav aria-label="Page navigation example">
        <ul class="pagination pagination-lg my-3">
          <li class="page-item" :class="{'disabled': !pages.has_pre}">
            <a
              class="page-link"
              href="#"
              aria-label="Previous"
              @click.prevent="updatePage(pages.current_page - 1)"
            >
              <span aria-hidden="true">
                <i class="fas fa-caret-left"></i>
              </span>
            </a>
          </li>
          <li
            class="page-item"
            v-for="page in pages.total_pages"
            :key="page"
            :class="{'active': pages.current_page == page}"
          >
            <a class="page-link" href="#" @click.prevent="updatePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{'disabled': !pages.has_next}">
            <a
              class="page-link"
              href="#"
              aria-label="Next"
              @click.prevent="updatePage(pages.current_page + 1)"
            >
              <span aria-hidden="true">
                <i class="fas fa-caret-right"></i>
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
</template>

<script>
export default {
  props: ["pages"],
  data() {
    return {};
  },
  methods: {
    updatePage(page) {
      this.$emit("emitPages", page);
    }
  }
};
</script>