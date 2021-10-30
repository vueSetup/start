import { ActionTree } from 'vuex'
import { AppState, SchemaState } from '../typings'
import request from '@/utils/request'

import { SET_SCHEMA } from "./mutations"

export const FETCH_DATA = 'fetchData';

export const actions: ActionTree<SchemaState, AppState> = {
    async [FETCH_DATA]({ commit }, url: string = "/api/v2/api-docs") {
        const payload = await request.get(url)
        commit(SET_SCHEMA, payload)
    }
}