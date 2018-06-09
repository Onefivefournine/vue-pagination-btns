# Vue pagination buttons mixin

### Installation

```
npm i -s vue-pagination-btns
```

#### Or...

```
yarn add vue-pagination-btns
```

#### Or...

```
git clone https://github.com/Onefivefournine/vue-pagination-btns.git
```

### Usage
```javascript
import pgn from 'vue-pagination-btns';

const app = new Vue({
	mixins:[pgn],
	methods:{
	    async getList(params) {
	        let {items, total} = await ApiService.get(params)
	        this.items = items;
		this.pgnSets.total = total;
	    }
	}
})
```

```html
	<pgn-btns :pgn-sets="pgnSets" :action="getData"></pgn-btns>
```
