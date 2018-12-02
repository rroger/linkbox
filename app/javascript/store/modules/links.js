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
      const newOrder = index + 1
      if (newOrder !== toDo.order) {
        toDo.order = newOrder
        dispatch('updateLink', { id: toDo.id, order: toDo.order })
      }
    })
  },

  updateLink({ commit, dispatch }, newValues) {
    const toastSuccessMessage = newValues.toastSuccessMessage
    delete newValues.toastSuccessMessage
    return linksApiService.updateLink(newValues)
      .then((updatedLink) => {
        commit('UPDATE_LINK', updatedLink)
        if (toastSuccessMessage) {
          dispatch('addToast', [TOAST_TYPE.SUCCESS, `Successfully updated Link ${linksApiService.linkIdentifier(newValues)}`])
        }
      })
      .catch((error) => {
        dispatch('addToast', [TOAST_TYPE.ERROR, `Could not update Link ${linksApiService.linkIdentifier(newValues)}`])
        throw(error)
      })
  },

  addLink ({ commit, dispatch }, newLink) {
    return linksApiService.createLink(newLink)
      .then((link) => {
        dispatch('addToast', [TOAST_TYPE.SUCCESS, `Successfully added Link ${linksApiService.linkIdentifier(newLink)}`])
        commit('ADD_LINK', link)
      })
      .catch((error) => {
        dispatch('addToast', [TOAST_TYPE.ERROR, `Could not create Link ${linksApiService.linkIdentifier(newLink)}`])
        throw(error)
      })
  },

  deleteLink ({ commit, dispatch }, link) {
    return linksApiService.deleteLink(link)
      .then(() => {
        dispatch('addToast', [TOAST_TYPE.SUCCESS, `Successfully deleted Link ${linksApiService.linkIdentifier(link)}`])
        commit('REMOVE_LINK', link)
      })
      .catch(() => {
        dispatch('addToast', [TOAST_TYPE.ERROR, `Could not deleted Link ${linksApiService.linkIdentifier(link)}`])
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
  },
  REMOVE_LINK(state, linkToRemove) {
    const index = state.links.findIndex((link) => {
      return link.id === linkToRemove.id
    })
    if (index > -1) {
      state.links.splice(index, 1)
    }
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
