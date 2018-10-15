import { BaseApiService } from '../../../app/javascript/services/base_api_service'
import { Topic } from '../../../app/javascript/models/topic'
import * as mocks from '../mocks/topics_mocks'

describe('BaseApiService', () => {
  describe('#fetchAll', () => {
    let service

    beforeEach(() => {
      service = new BaseApiService()
    })

    it('returns items of type itemClass',  (done) =>  {
      service.$http = mocks.$httpIndexSuccess

      service.fetchAll('/topics', Topic).then(
        (data) => {
          expect(data).toEqual([
            new Topic({ id: '55', name: 'One mores' }),
            new Topic({ id: '52', name: 'So goodOk' }),
            new Topic({ id: '111', name: 'Totaly New Topic' }),
            new Topic({ id: '112', name: 'Typography' })
          ])
          done()
        }
      )
    })

    it('throws error when http status not ok', (done) => {
      service.$http = mocks.$httpIndexFail

      service.fetchAll('/topics', Topic).catch(
        (error) => {
          expect(error).toEqual({'body': {'data': 'internal server error'}})
          done()
        }
      )
    })
  })
})
