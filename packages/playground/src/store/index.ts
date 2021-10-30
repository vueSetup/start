import { createStore, createLogger } from "vuex"
import createPersistedState from 'vuex-persistedstate'
import { schema } from "./schema";

const debug = process.env.NODE_ENV !== 'production'

const createPersisted = () => createPersistedState({
    storage: debug ? window.localStorage : window.sessionStorage
})

export default createStore({
    modules: {
        schema
    },
    strict: debug,
    plugins: debug ? [createLogger(), createPersisted()] : [createPersisted()]
})