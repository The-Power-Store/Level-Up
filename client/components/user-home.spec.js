import { UserHome, mapState } from './user-home';
import { expect } from 'chai';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

describe('UserHome', () => {
  describe('the mapState function', () => {
    let fakeState = {user: {email: 'hello@aol.com'}}

    it('should return an email object', () => {
      expect(mapState(fakeState).email).to.be.equal('hello@aol.com')
    })
  })
})

describe('the plain component', () => {
  let userHome = shallow(<UserHome email={'johnandkate@fullstack.com'}/>)

  it('should render a component with the correct email', () => {
    expect(userHome
        .find('h3')
        .text()).to.be.equal('Welcome, johnandkate@fullstack.com');
  })

})

import{ UserHome, mapState } from './user-home'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'


describe('UserHome',()=>{
  describe('The map state function', ()=>{
    let fakeState = {user:{email:'hellow@aol.com'}}
  })
  it('should return an email object', ()=>{
    expect(mapState(fakeState).email).to.be.equal('hello@aol.com')
  })
})