import {describe, expect, test} from '@jest/globals'
import {
  paymasterClient,
  wallet,
  tokenAbi,
  transformIsSponsorableResponse,
  transformToGaslessTransaction,
  delay, transformSponsorTxResponse, transformBundleResponse,
  privatePaymasterClient,
} from './utils'
import { TOKEN_CONTRACT_ADDRESS, CHAIN_ID, RECIPIENT_ADDRESS } from './env'
import { ethers } from 'ethers'
import { SendRawTransactionOptions } from '../src'

let TX_HASH = ''

/**
 * Testing suite for Paymaster API functionalities.
 */
describe('paymasterQuery', () => {

  /**
   * Test for retrieving chain ID from the paymaster provider.
   */
  describe('chainID', () => {
    test('chainID should return the expected value', async () => {
      const res = await paymasterClient.chainID()
      expect(res).toEqual('0x61')
    })
  })

  /**
   * Test for checking if a transaction is sponsorable.
   */
  describe('isSponsorable', () => {
    test('should successfully determine if transaction is sponsorable', async () => {
      const tokenContract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, tokenAbi, wallet)
      const tokenAmount = ethers.parseUnits('0', 18)
      const nonce = await paymasterClient.getTransactionCount(wallet.address, 'pending')

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
      const resRaw = await paymasterClient.isSponsorable(safeTransaction)
      const res = transformIsSponsorableResponse(resRaw)
      expect(res.Sponsorable).toEqual(true)

      const signedTx = await wallet.signTransaction(safeTransaction)
      try {
        const tx = await paymasterClient.sendRawTransaction(signedTx)
        TX_HASH = tx
        console.log('Transaction hash received:', TX_HASH)
      } catch (error) {
        console.error('Transaction failed:', error)
      }
    }, 100000) // Extends the default timeout as this test involves network calls
  })

  /**
   * Test for retrieving a gasless transaction by its hash and verifying related transactions.
   */
  describe('getGaslessTransactionByHash', () => {
    test('should confirm and retrieve transaction details', async () => {
      console.log('Waiting for transaction confirmation...')
      await delay(8000)
      console.log('Querying gasless transaction by hash:', TX_HASH)
      const resRaw = await paymasterClient.getGaslessTransactionByHash(TX_HASH)
      const res = transformToGaslessTransaction(resRaw)
      expect(res.ToAddress).toEqual(TOKEN_CONTRACT_ADDRESS.toLowerCase())
      console.log('Querying gasless transaction', res)

      console.log('Retrieving sponsor transaction by bundle UUID:', res.BundleUUID)
      const txRaw = await paymasterClient.getSponsorTxByBundleUuid(res.BundleUUID)
      const tx = transformSponsorTxResponse(txRaw)
      expect(txRaw).not.toBeNull()
      console.log('Sponsor transaction details:', tx)

      const bundleRaw = await paymasterClient.getBundleByUuid(res.BundleUUID)
      const bundle = transformBundleResponse(bundleRaw)
      expect(bundle.BundleUUID).toEqual(res.BundleUUID)
      console.log('Bundle details:', bundle)

      const sponsorTxRaw = await paymasterClient.getSponsorTxByTxHash(tx.TxHash)
      const sponsorTx = transformSponsorTxResponse(sponsorTxRaw)
      console.log('Sponsor transaction:', sponsorTx)
      expect(sponsorTx.TxHash).toEqual(tx.TxHash)
    }, 13000)
  })



    /**
   * Test for checking if a private policy transaction is sponsorable.
   */
    describe('isSponsorable', () => {
      test('should successfully determine if transaction is sponsorable', async () => {
        const tokenContract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, tokenAbi, wallet)
        const tokenAmount = ethers.parseUnits('0', 18)
        const nonce = await privatePaymasterClient.getTransactionCount(wallet.address, 'pending')
  
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

        const resRaw = await privatePaymasterClient.isSponsorable(safeTransaction)
        const res = transformIsSponsorableResponse(resRaw)
        expect(res.Sponsorable).toEqual(true)
  
        const txOpt: SendRawTransactionOptions = {
          UserAgent: "TEST USER AGENT"
        };

        const signedTx = await wallet.signTransaction(safeTransaction)
        try {
          const tx = await privatePaymasterClient.sendRawTransaction(signedTx,txOpt)
          TX_HASH = tx
          console.log('Transaction hash received:', TX_HASH)
        } catch (error) {
          console.error('Transaction failed:', error)
        }
      }, 100000) // Extends the default timeout as this test involves network calls
    })
})
