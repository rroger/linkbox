import { LinksApiService } from '../../../app/javascript/services/links_api_service'
import { Link } from '../../../app/javascript/models/link'
import * as mocks from '../mocks/links_mocks'

describe('LinksApiService', () => {
  describe('#fetchAll', () => {
    let service

    beforeEach(() => {
      service = new LinksApiService()
    })

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

    it('throws error when http status not ok', (done) => {
      service.$http = mocks.$httpIndexFail

      service.fetchAll().catch(
        (error) => {
          expect(error).toEqual({'data': {'data': 'internal server error'}})
          done()
        }
      )
    })
  })
})
