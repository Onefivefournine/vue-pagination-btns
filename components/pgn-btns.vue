<template>
  <div class="pagination"
    v-if="pgnSets && pages && pages.length>1">
    <button type="button"
      :class="inactiveClassName+(!hasPrev?' pgn-hidden':'')"
      @click="goToPage({limit:pgnSets.limit,offset:0})">
      &laquo;
    </button>
    <button type="button"
      :class="inactiveClassName+(!hasPrev?' pgn-hidden':'')"
      @click="prevPage()">
      &lsaquo;
    </button>
    <button type="button"
      v-for="page in pages"
      :class="pgnSets.offset == page.offset?activeClassName:inactiveClassName"
      @click="goToPage(page)">{{(page.offset/page.limit)+1}}</button>
    <button type="button"
      :class="inactiveClassName+(!hasNext?' pgn-hidden':'')"
      @click="nextPage()">
      &rsaquo;
    </button>
    <button type="button"
      :class="inactiveClassName+(!hasNext?' pgn-hidden':'')"
      @click="goToPage({limit:pgnSets.limit,offset:pgnSets.limit*(totalPages-1)})">
      &raquo;
    </button>
  </div>
</template>
<script>
function clone( obj ) {
  return JSON.parse( JSON.stringify( obj ) )
}

export default {
  props: {
    inactiveClassName: {
      type: String,
      default: 'btn btn-light'
    },
    activeClassName: {
      type: String,
      default: 'btn btn-primary'
    },
    pgnSets: {
      type: Object,
      default: () => ( { limit: 5, offset: 0 } )
    },
    action: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    hasNext() {
      return ( this.pgnSets.offset + this.pgnSets.limit < this.pgnSets.total )
    },
    hasPrev() {
      return this.pgnSets.offset !== 0
    },
    totalPages() {
      return Math.ceil( this.pgnSets.total / this.pgnSets.limit )
    },
    pagesCount() {
      return ( ( this.totalPages && this.totalPages > 5 ) ? 5 : this.totalPages )
    },
    pages() {
      let res = new Array( this.pagesCount );
      for ( var i = res.length - 1; i >= 0; i-- ) {
        let offset
        if (
          this.pgnSets.offset >= this.pgnSets.limit * 2 &&
          this.pgnSets.total >= this.pgnSets.offset + this.pgnSets.limit * 2
        ) { // start
          offset = this.pgnSets.offset + this.pgnSets.limit * ( i - 2 );
        } else if ( this.pgnSets.total <= ( this.pgnSets.offset + this.pgnSets.limit * 2 ) ) { // end
          offset = this.pgnSets.limit * ( this.totalPages + ( i - this.pagesCount ) );
        } else { // middle
          offset = this.pgnSets.limit * i;
        }

        res[ i ] = {
          limit: this.pgnSets.limit,
          offset
        }

      }
      return res
    }
  },
  methods: {
    handlePageChange( { limit, offset } ) {
      this.pgnSets.limit = limit
      this.pgnSets.offset = offset
      this.action( { limit, offset } )
    },
    goToPage( page ) {
      if ( this.pgnSets.offset !== page.offset ) this.handlePageChange( page );
    },
    prevPage() {
      let { limit, offset } = clone( this.pgnSets )
      if ( this.pgnSets.offset <= this.pgnSets.limit ) {
        offset = 0;
      } else {
        offset = this.pgnSets.offset - this.pgnSets.limit;
      }
      this.handlePageChange( { limit, offset } )
    },
    nextPage() {
      let { limit, offset } = clone( this.pgnSets )
      if ( this.pgnSets.offset < this.pgnSets.total ) {
        offset = this.pgnSets.offset + this.pgnSets.limit;
      }
      this.handlePageChange( { limit, offset } )
    }

  },
}
</script>
<style lang="scss">
.pgn-hidden {
  visibility: hidden !important;
}

.pagination {
  text-align: center;
  .btn {
    border-radius: 50%;
    min-width: 45px;
    min-height: 45px;
    font-size: 1.5em;
    margin: 0 3px;
    border: none;
    color: #a3a6b2;
    &-primary {
      color: #fff
    }
  }
}
</style>
