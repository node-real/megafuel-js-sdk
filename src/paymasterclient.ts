import {ethers, FetchRequest, JsonRpcApiProviderOptions, Networkish, TransactionRequest} from 'ethers'
import type {AddressLike} from 'ethers/src.ts/address'
import type {BigNumberish} from 'ethers/src.ts/utils'

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

export type SponsorTx = {
  readonly TxHash: string
  readonly Address: AddressLike
  readonly BundleUUID: string
  readonly Status: GaslessTransactionStatus
  readonly GasPrice?: BigNumberish
  readonly GasFee?: BigNumberish
  readonly BornBlockNumber: bigint
  readonly ChainID: number
}

export type Bundle = {
  readonly BundleUUID: string
  readonly Status: GaslessTransactionStatus
  readonly AvgGasPrice?: BigNumberish
  readonly BornBlockNumber: bigint
  readonly ConfirmedBlockNumber: bigint
  readonly ConfirmedDate: bigint
  readonly ChainID: number
}

export class PaymasterClient extends ethers.JsonRpcProvider {
  constructor(url?: string | FetchRequest, network?: Networkish, options?: JsonRpcApiProviderOptions) {
    super(url, network, options)
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

  async getSponsorTxByTxHash(hash: string): Promise<SponsorTx> {
    return await this.send('pm_getSponsorTxByTxHash', [hash])
  }

  async getSponsorTxByBundleUUID(bundleUUID: string): Promise<SponsorTx> {
    return await this.send('pm_getSponsorTxByBundleUUID', [bundleUUID])
  }

  async getBundleByUUID(bundleUUID: string): Promise<Bundle> {
    return await this.send('pm_getBundleByUUID', [bundleUUID])
  }
}
