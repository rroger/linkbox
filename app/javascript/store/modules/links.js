import { LinksApiService } from '../../services/links_api_service'

let _linksApiService = null

const state = {
  links: [],
  loading: false
}

const getters = {
  links: state => {
    return state.links
  },
  linksToDo: state => {
    return state.links.filter(link => !link.completed).sort((a, b) => {
      if (a.order > b.order) {
        return 1
      }
      if (a.order < b.order) {
        return -1
      }
      return 0
    })
  },
  linksCompleted: state => {
    return state.links.filter(link => link.completed)
  },
  linksToDoCount: (state, getters) => {
    return getters.linksToDo.length
  },
  linksCompletedCount: (state, getters) => {
    return getters.linksCompleted.length
  }
}

const actions = {
  fetchLinks ({ commit }) {
    commit('setLoading', true)
    return linksApiService().fetchLinks()
      .then((response) => {
        commit('setLinks', response)
      })
      .finally(() => commit('setLoading', false))
  },

  updateLinksToDo ({ commit }, toDoList) {
    toDoList.map((toDo, index) => {
      toDo.order = index
      commit('updateLink', toDo)
      linksApiService().updateLink(toDo)
    })
  }
}

const mutations = {
  setLinks(state, links) {
    state.links = links
  },
  updateLink(state, linkUpdate) {
    const link = state.links.find((link) =>  link.id === linkUpdate.id)
    Object.assign(link, linkUpdate)
  },
  setLoading(state, loading) {
    state.loading = loading
  }
}

function linksApiService() {
  if (_linksApiService) return _linksApiService
  _linksApiService = new LinksApiService()
  return _linksApiService
}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}
