module.exports = {
	props: {
		data: {
			type: Object,
			default: function() {
				return {
					current_page: 1,
					data: [],
					from: 1,
					last_page: 1,
					next_page_url: null,
					per_page: 10,
					prev_page_url: null,
					to: 1,
					total: 0,
				}
			}
		},
		limit: {
			type: Number,
			default: 0
		}
	},

	template: '<div class="pagination-wrapper m-t-20"><nav class="pagination is-centered" v-if="data.total > data.per_page">\
			<a class="pagination-previous"  v-if="data.prev_page_url" href="#" aria-label="Previous" @click.prevent="selectPage(--data.current_page)">\
				<slot name="prev-nav">\
					<span aria-hidden="true">&laquo;</span>\
					<span class="sr-only">Previous</span>\
				</slot>\
			</a>\
			<ul class="pagination-list">\
				<li>\
					<a class="pagination-link" v-for="n in getPages()" :aria-current="{ \'page\': n == data.current_page }" :class="{ \'is-current\': n == data.current_page }" href="#" @click.prevent="selectPage(n)">{{ n }}</a>\
				</li>\
			</ul>\
			<a v-if="data.next_page_url" class="pagination-next" href="#" aria-label="Next" @click.prevent="selectPage(++data.current_page)" rel="next">\
				<slot name="next-nav">\
					<span aria-hidden="true">&raquo;</span>\
					<span class="sr-only">Next</span>\
				</slot>\
			</a>\
	</nav></div>',

	methods: {
		selectPage: function(page) {
			if (page === '...') {
				return;
			}

			this.$emit('pagination-change-page', page);
		},
		getPages: function() {
			if (this.limit === -1) {
				return 0;
			}

			if (this.limit === 0) {
				return this.data.last_page;
			}

			var current = this.data.current_page,
				last = this.data.last_page,
				delta = this.limit,
				left = current - delta,
				right = current + delta + 1,
				range = [],
				pages = [],
				l;

			for (var i = 1; i <= last; i++) {
				if (i == 1 || i == last || (i >= left && i < right)) {
					range.push(i);
				}
			}

			range.forEach(function (i) {
				if (l) {
					if (i - l === 2) {
						pages.push(l + 1);
					} else if (i - l !== 1) {
						pages.push('...');
					}
				}
				pages.push(i);
				l = i;
			});

			return pages;
		}
	}
};
