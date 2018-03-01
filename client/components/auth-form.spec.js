import{ UserHome, mapState } from './user-home'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'


describe('authForm',()=>{
  describe('The login form function', ()=>{
    let fakeState = {name:'heygirl',displayName:'login',user:'kdjsfla'}
  })
  it('should return a login form object', ()=>{
    expect(mapState(fakeState).name).to.be.equal('heygirl')
  })
})
