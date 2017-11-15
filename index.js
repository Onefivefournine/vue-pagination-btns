import pgnBtns from './components/pgn-btns';

function pgnSetsFactory() {
    return {
        limit: 5,
        offset: 0,
        total: 0
    }
}

const pgn = {
    components: {
        pgnBtns
    },
    data() {
        return {
            pgnSets: pgnSetsFactory()
        }
    }
}
export default pgn