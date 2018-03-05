import {expect} from 'chai'
import {fetchAllProducts, update} from './product'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from './history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {products: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchAllProducts', () => {
    it('dispatches the GET_ALL_PRODUCTS action', () => {
      const fakeProducts = [{title: 'a wand', description: 'it makes magic', price: '500'}, {title: 'some potion', description: 'it changes you', price: '1000'}]
      mockAxios.onGet('/api/products').replyOnce(200, fakeProducts)
      return store.dispatch(fetchAllProducts())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_ALL_PRODUCTS')
          expect(actions[0].products).to.be.equal(fakeProducts)
        })
    })
  })

  describe('update', () => {
    it('dispatches the UPDATE_PRODUCT action', () => {
      mockAxios.onPut('/')
    })
  })
})

