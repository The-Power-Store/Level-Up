import { AuthForm, mapLogin } from "./auth-form"
import { expect } from "chai"
import { shallow } from "enzyme"
import React from "react"

describe('AuthForm', () => {
  describe('the mapLogin function', () => {
    let fakeState = { user: { error: 'Error!!' } }

    it('mapLogin should return the correct object', () => {
      expect(mapLogin(fakeState).error).to.be.equal('Error!!')
    })
  })
})