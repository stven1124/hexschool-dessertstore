<template>
    <div class="d-flex justify-content-center">
      <nav aria-label="Page navigation example">
        <ul class="pagination pagination-lg my-3">
          <li class="page-item" :class="{'disabled': !pageData.has_pre}">
            <a
              class="page-link"
              href="#"
              aria-label="Previous"
              @click.prevent="changePage(pageData.current_page - 1)"
            >
              <span aria-hidden="true">
                <i class="fas fa-caret-left"></i>
              </span>
            </a>
          </li>
          <li
            class="page-item"
            v-for="page in pageData.total_pages"
            :key="page"
            :class="{'active': pageData.current_page == page}"
          >
            <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{'disabled': !pageData.has_next}">
            <a
              class="page-link"
              href="#"
              aria-label="Next"
              @click.prevent="changePage(pageData.current_page + 1)"
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
  data() {
    return {}
  },
  props: {
    pageData: {
      type: Object,
      default: {}
    }
  },
  methods: {
    changePage(page) {
      this.$emit('changePage', page);
    }
  },
}
</script>