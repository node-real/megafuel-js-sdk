import {ethers, TransactionRequest} from 'ethers'
import type {AddressLike} from 'ethers/src.ts/address'

export type IsSponsorableResponse = {
  Sponsorable: boolean
  SponsorName: string
  SponsorIcon: string
  SponsorWebsite: string
}

export enum GaslessTransactionStatus { New = 0, Pending = 1, Confirmed = 2, Failed = 3, Invalid = 4}

export type GaslessTransaction = {
  readonly TxHash: string
  readonly BundleID: bigint
  readonly FromAddress?: AddressLike
  readonly ToAddress?: AddressLike
  readonly RawData: string
  readonly Status: GaslessTransactionStatus
  readonly GasUsed: bigint
  readonly PolicyID: bigint
  readonly Source: string
  readonly BornBlockNumber: bigint
  readonly ChainID: number
}

export class PaymasterClient extends ethers.JsonRpcProvider {
  constructor(url:string) {
    super(url)
  }

  async ChainID(): Promise<string> {
    return await this.send('eth_chainId', [])
  }

  async isSponsorable(tx: TransactionRequest): Promise<IsSponsorableResponse> {
    return await this.send('pm_isSponsorable', [tx])
  }

  async sendRawTransaction(signedTx: string): Promise<string> {
    return await this.send('eth_sendRawTransaction', [signedTx])
  }

  async getGaslessTransactionByHash(hash: string): Promise<GaslessTransaction> {
    return await this.send('eth_getGaslessTransactionByHash', [hash])
  }
}
