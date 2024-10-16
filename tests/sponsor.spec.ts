import {describe, expect, test} from '@jest/globals'
import {WhitelistType} from '../src'
import {POLICY_UUID, ACCOUNT_ADDRESS, CONTRACT_METHOD, TOKEN_CONTRACT_ADDRESS, CHAIN_ID, RECIPIENT_ADDRESS, PRIVATE_POLICY_UUID} from './env'
import {ethers} from 'ethers'
import {IsSponsorableOptions, SendRawTransactionOptions} from '../src/paymasterclient'
import {
  sponsorClient,
  wallet,
  tokenAbi,
  transformIsSponsorableResponse,
} from './utils'

let TX_HASH = ''

/**
 * Test suite for Sponsor API methods involving whitelist management and spend data retrieval.
 */
describe('sponsorQuery', () => {
  /**
   * Tests adding an account address to the 'From Account' whitelist.
   */
  describe('addToWhitelist FromAccountWhitelist', () => {
    test('should add an account address to FromAccountWhitelist successfully', async () => {
      const res = await sponsorClient.addToWhitelist({
        PolicyUUID: POLICY_UUID,
        WhitelistType: WhitelistType.FromAccountWhitelist,
        Values: [ACCOUNT_ADDRESS],
      })

      expect(res).toEqual(true)
      console.log('FromAccountWhitelist addition response:', res)
    })
  })

  /**
   * Tests adding an account address to the 'To Account' whitelist.
   */
  describe('addToWhitelist ToAccountWhitelist', () => {
    test('should add an account address to ToAccountWhitelist successfully', async () => {
      const res = await sponsorClient.addToWhitelist({
        PolicyUUID: POLICY_UUID,
        WhitelistType: WhitelistType.ToAccountWhitelist,
        Values: [ACCOUNT_ADDRESS],
      })

      expect(res).toEqual(true)
      console.log('ToAccountWhitelist addition response:', res)
    })
  })

  /**
   * Tests adding an account address to the BEP20 receiver whitelist.
   */
  describe('addToWhitelist BEP20ReceiverWhiteList', () => {
    test('should add an account address to BEP20ReceiverWhiteList successfully', async () => {
      const res = await sponsorClient.addToWhitelist({
        PolicyUUID: POLICY_UUID,
        WhitelistType: WhitelistType.BEP20ReceiverWhiteList,
        Values: [ACCOUNT_ADDRESS],
      })

      expect(res).toEqual(true)
      console.log('BEP20ReceiverWhiteList addition response:', res)
    })
  })

  /**
   * Tests adding a contract method signature to the whitelist.
   */
  describe('addToWhitelist ContractMethodSigWhitelist', () => {
    test('should add a contract method signature to ContractMethodSigWhitelist successfully', async () => {
      const res = await sponsorClient.addToWhitelist({
        PolicyUUID: POLICY_UUID,
        WhitelistType: WhitelistType.ContractMethodSigWhitelist,
        Values: [CONTRACT_METHOD],
      })

      expect(res).toEqual(true)
      console.log('ContractMethodSigWhitelist addition response:', res)
    })
  })

  /**
   * Tests retrieving whitelists of contract method signatures.
   */
  describe('getWhitelist', () => {
    test('should retrieve contract method signatures successfully', async () => {
      const res = await sponsorClient.getWhitelist({
        PolicyUUID: POLICY_UUID,
        WhitelistType: WhitelistType.ContractMethodSigWhitelist,
        Offset: 0,
        Limit: 10,
      })

      expect(res[0]).toEqual(CONTRACT_METHOD)
      console.log('Retrieved ContractMethodSigWhitelist:', res)
    })
  })

  /**
   * Tests removing an account address from a whitelist.
   */
  describe('removeFromWhitelist', () => {
    test('should remove an account address from FromAccountWhitelist successfully', async () => {
      const res = await sponsorClient.removeFromWhitelist({
        PolicyUUID: POLICY_UUID,
        WhitelistType: WhitelistType.FromAccountWhitelist,
        Values: [ACCOUNT_ADDRESS],
      })

      expect(res).toEqual(true)
      console.log('FromAccountWhitelist removal response:', res)
    })
  })

  /**
   * Tests verifying the removal of an account address from a whitelist.
   */
  describe('getWhitelist', () => {
    test('should not contain account address post-removal', async () => {
      const res = await sponsorClient.getWhitelist({
        PolicyUUID: POLICY_UUID,
        WhitelistType: WhitelistType.FromAccountWhitelist,
        Offset: 0,
        Limit: 10,
      })
      if (res !== null && res !== undefined) {
        expect(res).not.toContain(ACCOUNT_ADDRESS)
      }
      console.log('FromAccountWhitelist post-removal check:', res)
    })
  })

  /**
   * Tests clearing all entries from a specific whitelist type.
   */
  describe('emptyWhitelist', () => {
    test('should clear all entries from BEP20ReceiverWhiteList successfully', async () => {
      const res = await sponsorClient.emptyWhitelist({
        PolicyUUID: POLICY_UUID,
        WhitelistType: WhitelistType.BEP20ReceiverWhiteList,
      })

      expect(res).toEqual(true)
      console.log('BEP20ReceiverWhiteList clearance response:', res)
    })
  })

  /**
   * Tests verifying the emptiness of a whitelist.
   */
  describe('getWhitelist', () => {
    test('should confirm the whitelist is empty', async () => {
      const res = await sponsorClient.getWhitelist({
        PolicyUUID: POLICY_UUID,
        WhitelistType: WhitelistType.BEP20ReceiverWhiteList,
        Offset: 0,
        Limit: 10,
      })

      expect(res).toBeNull()
      console.log('BEP20ReceiverWhiteList emptiness check:', res)
    })
  })

  /**
   * Tests retrieving user spend data.
   */
  describe('getUserSpendData', () => {
    test('should return not null for user spend data', async () => {
      const res = await sponsorClient.getUserSpendData(ACCOUNT_ADDRESS, POLICY_UUID)

      expect(res).not.toBeNull()
      console.log('User spend data:', res)
    })
  })

  /**
   * Tests retrieving policy spend data.
   */
  describe('getPolicySpendData', () => {
    test('should retrieve policy spend data successfully', async () => {
      const res = await sponsorClient.getPolicySpendData(POLICY_UUID)
      expect(res.ChainID).not.toBeNull()
      console.log('Policy spend data:', res)
    })
  })

  /**
   * Tests re-adding an account address to the 'From Account' whitelist after previous tests.
   */
  describe('addToWhitelist FromAccountWhitelist', () => {
    test('should re-add an account address to FromAccountWhitelist successfully after removal', async () => {
      const res = await sponsorClient.addToWhitelist({
        PolicyUUID: POLICY_UUID,
        WhitelistType: WhitelistType.FromAccountWhitelist,
        Values: [ACCOUNT_ADDRESS],
      })

      expect(res).toEqual(true)
      console.log('Re-addition to FromAccountWhitelist response:', res)
    })
  })


    /**
   * Test for checking if a private policy transaction is sponsorable.
   */
    describe('isSponsorable', () => {
      test('should successfully determine if transaction is sponsorable', async () => {
        const tokenContract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, tokenAbi, wallet)
        const tokenAmount = ethers.parseUnits('0', 18)
        const nonce = await sponsorClient.getTransactionCount(wallet.address, 'pending')
  
        const transaction = await tokenContract.transfer.populateTransaction(RECIPIENT_ADDRESS.toLowerCase(), tokenAmount)
        transaction.from = wallet.address
        transaction.nonce = nonce
        transaction.gasLimit = BigInt(100000)
        transaction.chainId = BigInt(CHAIN_ID)
        transaction.gasPrice = BigInt(0)
  
        const safeTransaction = {
          ...transaction,
          gasLimit: transaction.gasLimit.toString(),
          chainId: transaction.chainId.toString(),
          gasPrice: transaction.gasPrice.toString(),
        }
  
        console.log('Prepared transaction:', safeTransaction)

        const opt: IsSponsorableOptions = {
          PrivatePolicyUUID: PRIVATE_POLICY_UUID
        };

        const resRaw = await sponsorClient.isSponsorable(safeTransaction, opt)
        const res = transformIsSponsorableResponse(resRaw)
        expect(res.Sponsorable).toEqual(true)
  
        const txOpt: SendRawTransactionOptions = {
          PrivatePolicyUUID: PRIVATE_POLICY_UUID,
          UserAgent: "TEST USER AGENT"
        };

        const signedTx = await wallet.signTransaction(safeTransaction)
        try {
          const tx = await sponsorClient.sendRawTransaction(signedTx,txOpt)
          TX_HASH = tx
          console.log('Transaction hash received:', TX_HASH)
        } catch (error) {
          console.error('Transaction failed:', error)
        }
      }, 100000) // Extends the default timeout as this test involves network calls
    })
})
