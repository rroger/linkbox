/*eslint no-unused-vars: "off"*/
import { LinksApiService } from '../../services/links_api_service'
import { TOAST_TYPE } from '../../models/toast'

const linksApiService = new LinksApiService()

const state = {
  links: [],
}

const getters = {
  links: state => {
    return state.links
  },
  link: state => id => {
    return state.links.find((link) => link.id === id)
  },
  linksToDo: state => {
    if (state.links.length === 0) { return [] }
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
    if (state.links.length === 0) { return [] }
    return state.links.filter(link => link.completed).sort((a, b) => {
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1
      }
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1
      }
      return 0
    })
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
    return linksApiService.fetchLinks()
      .then((response) => {
        commit('SET_LINKS', response)
      })
      .catch(() => {
        dispatch('addToast', [TOAST_TYPE.ERROR, 'Could not load Links'])
      })
  },

  updateLinksToDo ({ commit, dispatch }, toDoList) {
    toDoList.forEach((toDo, index) => {
      toDo.order = index + 1
      dispatch('updateLink', { id: toDo.id, order: toDo.order })
    })
  },

  updateLink({ commit, dispatch }, newValues) {
    return linksApiService.updateLink(newValues)
      .then((updatedLink) => {
        commit('UPDATE_LINK', updatedLink)
      })
      .catch((error) => {
        dispatch('addToast', [TOAST_TYPE.ERROR, `Could not update Link: ${newValues}`])
        throw(error)
      })
  },

  addLink ({ commit, dispatch }, newLink) {
    return linksApiService.createLink(newLink)
      .then((link) => {
        dispatch('addToast', [TOAST_TYPE.SUCCESS, `Successfully added Link "${link.title}"`])
        commit('ADD_LINK', link)
      })
      .catch((error) => {
        dispatch('addToast', [TOAST_TYPE.ERROR, `Could not create Link "${newLink.title}"`])
        throw(error)
      })
  }
}

const mutations = {
  SET_LINKS(state, links) {
    state.links = links
  },
  ADD_LINK(state, link) {
    state.links.push(link)
  },
  UPDATE_LINK(state, updatedLink) {
    const linkToUpdate = getters.link(state)(updatedLink.id)
    Object.assign(linkToUpdate, updatedLink)
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
