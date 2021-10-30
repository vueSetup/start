import { GetterTree } from 'vuex'
import { AppState, SchemaState } from '../typings'

export const getters: GetterTree<SchemaState, AppState> = {
    object: state => state.object
}