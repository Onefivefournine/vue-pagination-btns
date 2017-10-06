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
		getData(params){
			// some API request using params
		}
	}
})
```

```html
	<pgn-btns :pgn-sets="pgnSets" :action="getData"></pgn-btns>
```
