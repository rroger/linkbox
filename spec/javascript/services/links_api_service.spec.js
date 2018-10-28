import { LinksApiService } from '../../../app/javascript/services/links_api_service'
import { Link } from '../../../app/javascript/models/link'
import * as mocks from '../mocks/links_mocks'

describe('LinksApiService', () => {
  let service

  beforeEach(() => {
    service = new LinksApiService()
  })

  describe('#fetchAll', () => {
    it('returns all links',  (done) =>  {
      service.$http = mocks.$httpIndexSuccess

      service.fetchLinks().then(
        (data) => {
          expect(data).toEqual([
            new Link({ completed: false, id: '8', notes: 'Some other notes', order: null, title: 'flexbox', topic_id: 4,
              topic_name: 'UI Elements', topic_color: '#8729b9', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'}),
            new Link({ completed: false, id: '9', notes: 'Hint of Andres', order: null, title: 'css tricks',
              topic_id: 4, topic_name: 'UI Elements', topic_color: '#8729b9', url: 'https://css-tricks.com/'}),
            new Link({ completed: true, id: '10', notes: '', order: null, title: 'Example 6', topic_id: 1,
              topic_name: 'Typography', topic_color: '#603850', url: 'https://example6.com'})
          ])
          done()
        }
      )
    })

    it('gets error when http status not ok', (done) => {
      service.$http = mocks.$httpIndexFail

      service.fetchAll().catch(
        (error) => {
          expect(error).toEqual({'data': {'data': 'internal server error'}})
          done()
        }
      )
    })
  })

  describe('#createLink', () => {
    it('create a link',  (done) =>  {
      service.$http = mocks.$httpCreateSuccess

      service.createLink(mocks.$httpCreateSuccess.newItem).then(
        (data) => {
          expect(data).toEqual(
            new Link({ completed: false, id: 2, notes: 'some', order: 0, title: 'Types', topic_id: 2,
              topic_name: 'Architecture', topic_color: '#ab2123', url: 'https://t.ch'})
          )
          done()
        }
      )
    })

    it('gets an error when http status not ok', (done) => {
      service.$http = mocks.$httpCreateFail

      service.createLink(mocks.$httpCreateSuccess.newItem).catch(
        (error) => {
          expect(error).toEqual({'data': {'data': 'internal server error'}})
          done()
        }
      )
    })

    it('throws error when no parameter is passed', () => {
      service.$http = mocks.$httpCreateFail
      const call = () => {
        service.createLink().catch(
          (error) => {
            expect(error).toEqual('This would be the wrong error')
          }
        )
      }

      expect(call).toThrow('Exception: no link to update')
    })
  })

  describe('#updateLink', () => {
    it('updates a link',  (done) =>  {
      service.$http = mocks.$httpUpdateSuccess
      const updateData = { id: 88, order: 4}

      service.updateLink(updateData).then(
        (data) => {
          expect(data).toEqual(
            new Link({ completed: false, id: 88, notes: '', order: 4, title: 'News', topic_id: null,
              topic_name: null, topic_color: null, url: 'https://a.ch'})
          )
          done()
        }
      )
    })

    it('gets an error when http status not ok', (done) => {
      service.$http = mocks.$httpUpdateFail

      service.updateLink({ id: 5, order: 4 }).catch(
        (error) => {
          expect(error).toEqual({'data': {'data': 'internal server error'}})
          done()
        }
      )
    })

    it('throws error when no parameter is passed', () => {
      service.$http = mocks.$httpUpdateFail
      const call = () => {
        service.updateLink().catch(
          (error) => {
            expect(error).toEqual('This would be the wrong error')
          }
        )
      }

      expect(call).toThrow('Exception: no link to update')
    })

    it('throws error when no id is passed', () => {
      service.$http = mocks.$httpUpdateFail
      const call = () => {
        service.updateLink({ url: 'newUrl'}).catch(
          (error) => {
            expect(error).toEqual('This would be the wrong error')
          }
        )
      }

      expect(call).toThrow('Exception: no link to update')
    })
  })

  describe('#linkParams', () => {
    it('creates params for new link', () => {
      const link = { title: 'Houses', url: 'https://www.exa.com' }
      const params = service.linkParams(link)

      expect(params).toEqual({
        data: {
          type: 'link',
          attributes: {
            title: 'Houses',
            url: 'https://www.exa.com',
          }
        }
      })
    })

    it('adds link on top level', () => {
      const link = { id: 1, title: 'Houses', url: 'https://www.exa.com', notes: 'some', topic_id: 23 }
      const params = service.linkParams(link)

      expect(params).toEqual({
        data: {
          type: 'link',
          attributes: {
            title: 'Houses',
            url: 'https://www.exa.com',
            topic_id: 23,
            notes: 'some'
          },
          id: 1,
        }
      })
    })

    it('adds topic_id to attributes', () => {
      const link = { id: 1, title: 'Houses', url: 'https://www.exa.com', topicId: 4 }
      const params = service.linkParams(link)

      expect(params).toEqual({
        data: {
          type: 'link',
          attributes: {
            title: 'Houses',
            url: 'https://www.exa.com',
            topic_id: 4
          },
          id: 1,
        }
      })
    })
  })

  describe('#deleteLink', () => {
    describe('with http success', () => {
      it('can delete a link', (done) => {
        service.$http = mocks.$httpDeleteSuccess

        service.deleteLink({ id: 1 }).then(
          (data) => {
            expect(data).toBeTruthy()
            done()
          }
        )
      })
    })

    describe('with http error', () => {
      it('gets error when server fails', (done) => {
        service.$http = mocks.$httpDeleteFail
        const call = () => {
          service.deleteLink({ id: 1 }).catch(
            (error) => {
              expect(error).toEqual({ data: { data: 'internal server error' } })
              done()
            }
          )
        }

        call()
      })
    })

    describe('with invalid params', () => {
      it('throws exception when no link is present', () => {
        service.$http = mocks.$httpDeleteFail
        const call = () => {
          service.deleteLink({url: 'newUrl'}).catch(
            (error) => {
              expect(error).toEqual('This would be the wrong error')
            }
          )
        }

        expect(call).toThrow('Exception: no link to delete')
      })

      it('throws error when no parameter is passed', () => {
        service.$http = mocks.$httpDeleteFail
        const call = () => {
          service.deleteLink().catch(
            (error) => {
              expect(error).toEqual('This would be the wrong error')
            }
          )
        }

        expect(call).toThrow('Exception: no link to delete')
      })
    })
  })

  describe('helpers', () => {
    describe('#linkIdentifier', () => {
      it('returns existing title', () => {
        const link = { title: 'Awesome'}
        expect(service.linkIdentifier(link)).toEqual('"Awesome"')
      })

      it('returns id without title', () => {
        const link = { id: '12'}
        expect(service.linkIdentifier(link)).toEqual('ID: 12')
      })

      it('returns empty string without title id or title', () => {
        let link = { id: '', title: ''}
        expect(service.linkIdentifier(link)).toEqual('')

        link = {}
        expect(service.linkIdentifier(link)).toEqual('')

        link = { id: '' }
        expect(service.linkIdentifier(link)).toEqual('')

        link = { title: '' }
        expect(service.linkIdentifier(link)).toEqual('')

        link = null
        expect(service.linkIdentifier(link)).toEqual('')
      })
    })
  })
})
