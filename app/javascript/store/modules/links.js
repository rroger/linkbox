import { LinksApiService } from '../../services/links_api_service'


const state = {
  links: [],
  loading: false
}

const getters = {
  links: state => {
    return state.links
  }
}

const actions = {
  fetchLinks ({ commit }) {
    commit('setLoading', true)
    const linksApiService = new LinksApiService()
    return linksApiService.fetchLinks()
      .then((response) => {
        commit('setLinks', response)
      })
      .finally(() => commit('setLoading', false))
  },
}

const mutations = {
  setLinks(state, links) {
    state.links = links
  },
  setLoading(state, loading) {
    state.loading = loading
  }
}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}
