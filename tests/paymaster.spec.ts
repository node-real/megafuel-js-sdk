import {describe, expect, test} from '@jest/globals'
import {
  paymasterProvider,
  wallet,
  tokenAbi,
  transformIsSponsorableResponse,
  transformToGaslessTransaction,
  delay, transformSponsorTxResponse,
} from './utils'
import {TOKEN_CONTRACT_ADDRESS, CHAIN_ID, RECIPIENT_ADDRESS} from './env'
import {ethers} from 'ethers'


let TX_HASH = ''

/**
 * test paymaster apis
 */

describe('paymasterQuery', () => {

  describe('chainID', () => {
    test('it works', async () => {
      const res = await paymasterProvider.chainID()
      expect(res).toEqual('0x61')
    })
  })

  describe('isSponsorable', () => {
    test('it works', async () => {
      // Create contract instance
      const tokenContract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, tokenAbi, wallet)

      // Transaction details
      const tokenAmount = ethers.parseUnits('1.0', 18) // Amount of tokens to send (adjust decimals as needed)
      // Get the current nonce for the sender's address
      const nonce = await paymasterProvider.getTransactionCount(wallet.address, 'pending')


      // Create the transaction object
      const transaction = await tokenContract.transfer.populateTransaction(RECIPIENT_ADDRESS.toLowerCase(), tokenAmount)

      // Add nonce and gas settings
      transaction.from = wallet.address
      console.log('wallet.address:', transaction.from)
      transaction.nonce = nonce
      transaction.gasLimit = BigInt(100000) // Adjust gas limit as needed for token transfers
      transaction.chainId = BigInt(CHAIN_ID)
      transaction.gasPrice = BigInt(0) // Set gas price to 0

      const safeTransaction = {
        ...transaction,
        gasLimit: transaction.gasLimit.toString(),
        chainId: transaction.chainId.toString(),
        gasPrice: transaction.gasPrice.toString(),
      }
      console.log(safeTransaction)
      const resRaw = await paymasterProvider.isSponsorable(safeTransaction)
      const res = transformIsSponsorableResponse(resRaw)
      console.log(res)
      expect(res.Sponsorable).toEqual(true)

      const signedTx = await wallet.signTransaction(safeTransaction)
      try {
        const tx = await paymasterProvider.sendRawTransaction(signedTx)
        TX_HASH = tx
        console.log('Transaction sent:', tx)
        console.log('TX_HASH:', TX_HASH)
      } catch (error) {
        console.error('Error sending transaction:', error)
      }
    }, 100000)
  })

  describe('getGaslessTransactionByHash', () => {
    test('it works', async () => {
      console.log('Waiting for the transaction to be confirmed and queryable on the blockchain.')
      await delay(8000)
      console.log('getGaslessTransactionByHash TX_HASH:', TX_HASH)
      const resRaw = await paymasterProvider.getGaslessTransactionByHash(TX_HASH)
      const res = transformToGaslessTransaction(resRaw)
      console.log(res)
      expect(res.ToAddress).toEqual(TOKEN_CONTRACT_ADDRESS.toLowerCase())

      console.log('getSponsorTxByBundleUuid res.BundleUUID:', res.BundleUUID)
      const txRaw = await paymasterProvider.getSponsorTxByBundleUuid(res.BundleUUID)
      const tx = transformSponsorTxResponse(txRaw)
      expect(resRaw).not.toBeNull()
      console.log(tx)

      const bundle = await paymasterProvider.getBundleByUuid(res.BundleUUID)
      expect(bundle).not.toBeNull()
      console.log(bundle)

      const sponsorTx = await paymasterProvider.getSponsorTxByTxHash(tx.TxHash)
      console.log('sponsorTx: ', sponsorTx)
      expect(sponsorTx).not.toBeNull()
    }, 13000)
  })
})
