[![Build Status](https://travis-ci.org/georgie817/laravel-vue-bulma-pagination.svg?branch=master)](https://travis-ci.org/georgie817/laravel-vue-bulma-pagination) [![npm](https://img.shields.io/npm/v/laravel-vue-pagination.svg)](https://www.npmjs.com/package/laravel-vue-bulma-pagination) [![Downloads](https://img.shields.io/npm/dt/laravel-vue-pagination.svg)](https://www.npmjs.com/package/laravel-vue-bulma-pagination)

# Laravel Vue Bulma Pagination
A Vue.js pagination component for Laravel paginators that works with Bulma.

## Requirements

* [Vue.js](https://vuejs.org/) 2.x
* [Laravel](http://laravel.com/docs/) 5.x
* [Bulma](http://bulma.io/) 0.7.x

## Install

```bash
npm install laravel-vue-bulma-paginator
// or
yarn add laravel-vue-bulma-paginator
```

## Usage

Register the component:

```javascript
Vue.component('pagination', require('laravel-vue-bulma-paginator'));
```

Use the component:

```html
<ul>
    <li v-for="post in laravelData.data" :key="post.id">{{ post.title }}</li>
</ul>

<pagination :data="laravelData" @pagination-change-page="getResults"></pagination>
```

```javascript
export default {

	data() {
		return {
			// Our data object that holds the Laravel paginator data
			laravelData: {},
		}
	},

	mounted() {
		// Fetch initial results
		this.getResults();
	},

	methods: {
		// Our method to GET results from a Laravel endpoint
		getResults(page = 1) {
			axios.get('example/results?page=' + page)
				.then(response => {
					this.laravelData = response.data;
				});
		}
	}

}
```

### Customizing Prev/Next Buttons

Prev/Next buttons can be customized using the `prev-nav` and `next-nav` slots:

```html
<pagination :data="laravelData">
	<span slot="prev-nav">&lt; Previous</span>
	<span slot="next-nav">Next &gt;</span>
</pagination>
```

## API

### Props

| Name | Type | Description |
| --- | --- | --- |
| `data` | Object | An object containing the structure of a [Laravel paginator](https://laravel.com/docs/5.6/pagination) response. See below for default value. |
| `limit` | Number | (optional) Limit of pages to be rendered. Default `0` (unlimited pages) `-1` will hide numeric pages and leave only arrow navigation. Any positive integer (e.g. `2`) will define how many pages should be shown on either side of the current page when only a range of pages are shown (see below for example output). |

**Default `data`**

```javascript
{
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
```

**Example `limit`**

![pagination](https://user-images.githubusercontent.com/11408141/43124047-a1970d44-8f2e-11e8-97df-cb49bba0b5a6.PNG)


### Events

| Name | Description |
| --- | --- |
| `pagination-change-page` | Triggered when a user changes page. Passes the new `page` index as a parameter. |

## Credits

Laravel Vue Bulma Pagination was created by [Gilbert Pellegrom](https://gilbitron.me) from [Dev7studios](https://dev7studios.co) as Laravel Vue Pagination with support for Bootstrap. And Forked by [George Raphael](https://georgeraphael.com) to provide support for Bulma. Released under the MIT license.
