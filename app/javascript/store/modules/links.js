import { LinksApiService } from '../../services/links_api_service'
import { TOAST_TYPE } from '../../models/toast'

let _linksApiService = null

function linksApiService() {
  if (_linksApiService) return _linksApiService
  _linksApiService = new LinksApiService()
  return _linksApiService
}

const state = {
  links: [],
}

const getters = {
  links: state => {
    return state.links
  },
  linksToDo: state => {
    if (state.links.length === 0) return []
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
    if (state.links.length === 0) return []
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
  fetchLinks ({ commit, dispatch }) {
    return linksApiService().fetchLinks()
      .then((response) => {
        commit('setLinks', response)
      })
      .catch(() => {
        dispatch('addToast', [TOAST_TYPE.ERROR, 'Could not load Links'])
      })
  },

  updateLinksToDo ({ commit, dispatch }, toDoList) {
    toDoList.map((toDo, index) => {
      toDo.order = index
      linksApiService().updateLink(toDo)
        .then(() => {
          commit('updateLink', toDo)
        })
        .catch(() => {
          dispatch('addToast', [TOAST_TYPE.ERROR, `Could not update ${toDo.title}`])
        })
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
  }
}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations,
  linksApiService
}
