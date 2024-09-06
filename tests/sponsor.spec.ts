import {describe, expect, test} from '@jest/globals'
import {client} from './utils'
import {WhitelistType} from '../src'
import {POLICY_UUID, ACCOUNT_ADDRESS, CONTRACT_METHOD} from './env'


/**
 * test sponsor apis
 */

describe('sponsorQuery', () => {
  describe('addToWhitelist FromAccountWhitelist', () => {
    test('it works', async () => {
      const res = await client.addToWhitelist({
        PolicyUUID: POLICY_UUID,
        WhitelistType: WhitelistType.FromAccountWhitelist,
        Values: [ACCOUNT_ADDRESS],
      })

      expect(res).toEqual(true)
      console.log(res)
    })
  })

  describe('addToWhitelist ToAccountWhitelist', () => {
    test('it works', async () => {
      const res = await client.addToWhitelist({
        PolicyUUID: POLICY_UUID,
        WhitelistType: WhitelistType.ToAccountWhitelist,
        Values: [ACCOUNT_ADDRESS],
      })

      expect(res).toEqual(true)
      console.log(res)
    })
  })
  describe('addToWhitelist BEP20ReceiverWhiteList', () => {
    test('it works', async () => {
      const res = await client.addToWhitelist({
        PolicyUUID: POLICY_UUID,
        WhitelistType: WhitelistType.BEP20ReceiverWhiteList,
        Values: [ACCOUNT_ADDRESS],
      })

      expect(res).toEqual(true)
      console.log(res)
    })
  })

  describe('addToWhitelist ContractMethodSigWhitelist', () => {
    test('it works', async () => {
      const res = await client.addToWhitelist({
        PolicyUUID: POLICY_UUID,
        WhitelistType: WhitelistType.ContractMethodSigWhitelist,
        Values: [CONTRACT_METHOD],
      })

      expect(res).toEqual(true)
    })
  })

  describe('getWhitelist', () => {
    test('it works', async () => {
      const res = await client.getWhitelist({
        PolicyUUID: POLICY_UUID,
        WhitelistType: WhitelistType.ContractMethodSigWhitelist,
        Offset: 0,
        Limit: 10,
      })

      expect(res[0]).toEqual(CONTRACT_METHOD)
    })
  })

  describe('removeFromWhitelist', () => {
    test('it works', async () => {
      const res = await client.removeFromWhitelist({
        PolicyUUID: POLICY_UUID,
        WhitelistType: WhitelistType.FromAccountWhitelist,
        Values: [ACCOUNT_ADDRESS],
      })

      expect(res).toEqual(true)
    })
  })

  describe('getWhitelist', () => {
    test('it works', async () => {
      const res = await client.getWhitelist({
        PolicyUUID: POLICY_UUID,
        WhitelistType: WhitelistType.FromAccountWhitelist,
        Offset: 0,
        Limit: 10,
      })
      if (res !== null && res !== undefined) {
        expect(res).not.toContain(ACCOUNT_ADDRESS)
      }
    })
  })

  describe('emptyWhitelist', () => {
    test('it works', async () => {
      const res = await client.emptyWhitelist({
        PolicyUUID: POLICY_UUID,
        WhitelistType: WhitelistType.BEP20ReceiverWhiteList,
      })

      expect(res).toEqual(true)
    })
  })

  describe('getWhitelist', () => {
    test('it works', async () => {
      const res = await client.getWhitelist({
        PolicyUUID: POLICY_UUID,
        WhitelistType: WhitelistType.BEP20ReceiverWhiteList,
        Offset: 0,
        Limit: 10,
      })

      expect(res).toBeNull()
    })
  })

  describe('getUserSpendData', () => {
    test('it works', async () => {
      const res = await client.getUserSpendData(ACCOUNT_ADDRESS, POLICY_UUID)

      expect(res).toBeNull()
    })
  })

  describe('getPolicySpendData', () => {
    test('it works', async () => {
      const res = await client.getPolicySpendData(POLICY_UUID)
      expect(res.ChainID).not.toBeNull()
    })
  })

  describe('addToWhitelist FromAccountWhitelist', () => {
    test('it works', async () => {
      const res = await client.addToWhitelist({
        PolicyUUID: POLICY_UUID,
        WhitelistType: WhitelistType.FromAccountWhitelist,
        Values: [ACCOUNT_ADDRESS],
      })

      expect(res).toEqual(true)
      console.log(res)
    })
  })
})
