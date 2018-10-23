import { BaseApiService } from '../../../app/javascript/services/base_api_service'
import { Link } from '../../../app/javascript/models/link'
import { Topic } from '../../../app/javascript/models/topic'
import * as mocks from '../mocks/links_mocks'

describe('BaseApiService', () => {
  let service

  beforeEach(() => {
    service = new BaseApiService()
  })

  describe('#fetchAll', () => {
    it('returns items of type itemClass',  (done) =>  {
      service.$http = mocks.$httpIndexSuccess

      service.fetchAll('/links', Link).then(
        (data) => {
          expect(data).toEqual(
            [
              new Link({ completed: false, id: '8', notes: 'Some other notes', order: null, title: 'flexbox', topic_id: 4,
                topic_name: 'UI Elements', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'}),
              new Link({ completed: false, id: '9', notes: 'Hint of Andres', order: null, title: 'css tricks',
                topic_id: 4, topic_name: 'UI Elements', url: 'https://css-tricks.com/'}),
              new Link({ completed: true, id: '10', notes: '', order: null, title: 'Example 6', topic_id: 1,
                topic_name: 'Typography', url: 'https://example6.com'})
            ]
          )
          done()
        }
      )
    })

    it('throws error when http status not ok', (done) => {
      service.$http = mocks.$httpIndexFail

      service.fetchAll('/topics', Link).catch(
        (error) => {
          expect(error).toEqual({'data': {'data': 'internal server error'}})
          done()
        }
      )
    })
  })

  describe('#createObjectsFromResponse', () => {
    beforeEach(() => {
      service.createObject = jest.fn()
    })

    it('can handle single objects', () => {
      const response = {
        data: {
          data: {
            id: 1,
            type: 'topic',
            attributes: {
              name: 'Architecture'
            }
          }
        }
      }
      service.createObjectsFromResponse(response, Topic)

      expect(service.createObject).toHaveBeenCalledWith(
        {
          id: 1,
          type: 'topic',
          attributes: {
            name: 'Architecture'
          }
        },
        Topic
      )
    })

    it('can handle arrays', () => {
      const response = {
        data: {
          data: [
            { id: 1,
              type: 'topic',
              attributes: {
                name: 'Architecture'
              }
            },
            { id: 2,
              type: 'topic',
              attributes: {
                name: 'Things'
              }
            }
          ]
        }
      }
      service.createObjectsFromResponse(response, Topic)

      expect(service.createObject).toHaveBeenCalledWith(
        {
          id: 1,
          type: 'topic',
          attributes: {
            name: 'Architecture'
          }
        },
        Topic
      )
      expect(service.createObject).toHaveBeenCalledWith(
        {
          id: 2,
          type: 'topic',
          attributes: {
            name: 'Things'
          }
        },
        Topic
      )
      expect(service.createObject).toHaveBeenCalledTimes(2)
    })
  })

  describe('#createObject', () => {
    it('can create objects', () => {
      const raw = {
        data: {
          id: 1,
          type: 'topic',
          attributes: {
            name: 'Architecture'
          }
        }
      }

      expect(service.createObject(raw.data, Topic)).toEqual(
        new Topic({ id: 1, name: 'Architecture' })
      )
    })

    describe('with invalid parameters', () => {
      it('throws error when attributes empty', () => {
        const raw = {
          data: {
            id: 1,
            type: 'topic',
            attributes: {
            }
          }
        }
        const call = () => { service.createObject(raw.data, Topic) }

        expect(call).toThrow('Invalid Parameters')
      })

      it('throws error when id empty', () => {
        const raw = {
          data: {
            type: 'topic',
            attributes: {
              name: 'Arch'
            }
          }
        }
        const call = () => { service.createObject(raw.data, Topic) }

        expect(call).toThrow('Invalid Parameters')
      })
    })
  })
})
