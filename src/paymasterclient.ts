import {ethers, FetchRequest, JsonRpcApiProviderOptions, Networkish, TransactionRequest} from 'ethers'
import type {AddressLike} from 'ethers/src.ts/address'
import type {BigNumberish} from 'ethers/src.ts/utils'

export type IsSponsorableResponse = {
  Sponsorable: boolean
  SponsorName: string
  SponsorIcon: string
  SponsorWebsite: string
}

export type IsSponsorableOptions = {
  PrivatePolicyUUID?: string
}

export type SendRawTransactionOptions = {
  PrivatePolicyUUID?: string
  UserAgent?: string
}

export enum GaslessTransactionStatus { New = 0, Pending = 1, Confirmed = 2, Failed = 3, Invalid = 4}

export type GaslessTransaction = {
  readonly TxHash: string
  readonly BundleUUID: string
  readonly FromAddress?: AddressLike
  readonly ToAddress?: AddressLike
  readonly Nonce: number
  readonly RawData: string
  readonly Status: GaslessTransactionStatus
  readonly GasUsed: bigint
  readonly GasFee?: BigNumberish
  readonly PolicyUUID: bigint
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

export class PaymasterClient {
  private sponsorClient: ethers.JsonRpcProvider
  private userClient: ethers.JsonRpcProvider

  constructor(
    userUrl: string | FetchRequest,
    sponsorUrl: string | FetchRequest,
    network?: Networkish,
    options?: JsonRpcApiProviderOptions
  ) {
    this.userClient = new ethers.JsonRpcProvider(userUrl, network, options)
    this.sponsorClient = new ethers.JsonRpcProvider(sponsorUrl, network, options)
  }

  async chainID(): Promise<string> {
    return await this.userClient.send('eth_chainId', [])
  }

  async isSponsorable(tx: TransactionRequest, opts: IsSponsorableOptions = {}): Promise<IsSponsorableResponse> {
    if (opts.PrivatePolicyUUID) {
      // Create a new provider with the updated header
      const newConnection = this.sponsorClient._getConnection();
      newConnection.setHeader("X-MegaFuel-Policy-Uuid", opts.PrivatePolicyUUID);
  
      // Create a new provider with the modified connection
      const sponsorProviderWithHeader = new ethers.JsonRpcProvider(
        newConnection,
        (this.sponsorClient as any)._network,
        {
          staticNetwork: (this.sponsorClient as any)._network,
          batchMaxCount: (this.sponsorClient as any).batchMaxCount,
          polling: (this.sponsorClient as any).polling
        }
      );
  
      return await sponsorProviderWithHeader.send('pm_isSponsorable', [tx]);
    }
    return await this.userClient.send('pm_isSponsorable', [tx]);
  }

  async sendRawTransaction(signedTx: string, opts: SendRawTransactionOptions = {}): Promise<string> {
    let sponsorProvider = this.sponsorClient;
  
    if (opts.UserAgent || opts.PrivatePolicyUUID) {
      // Create a new provider with the updated headers
      const newConnection = this.sponsorClient._getConnection();
      
      if (opts.UserAgent) {
        newConnection.setHeader("User-Agent", opts.UserAgent);
      }
      if (opts.PrivatePolicyUUID) {
        newConnection.setHeader("X-MegaFuel-Policy-Uuid", opts.PrivatePolicyUUID);
      }
  
      // Create a new provider with the modified connection
      sponsorProvider = new ethers.JsonRpcProvider(
        newConnection,
        (this.sponsorClient as any)._network,
        {
          staticNetwork: (this.sponsorClient as any)._network,
          batchMaxCount: (this.sponsorClient as any).batchMaxCount,
          polling: (this.sponsorClient as any).polling
        }
      );
    }
  
    if (opts.PrivatePolicyUUID) {
      return await sponsorProvider.send('eth_sendRawTransaction', [signedTx]);
    }
    return await this.userClient.send('eth_sendRawTransaction', [signedTx]);
  }

  async getGaslessTransactionByHash(hash: string): Promise<GaslessTransaction> {
    return await this.userClient.send('eth_getGaslessTransactionByHash', [hash])
  }

  async getSponsorTxByTxHash(hash: string): Promise<SponsorTx> {
    return await this.userClient.send('pm_getSponsorTxByTxHash', [hash])
  }

  async getSponsorTxByBundleUuid(bundleUuid: string): Promise<SponsorTx> {
    return await this.userClient.send('pm_getSponsorTxByBundleUuid', [bundleUuid])
  }

  async getBundleByUuid(bundleUuid: string): Promise<Bundle> {
    return await this.userClient.send('pm_getBundleByUuid', [bundleUuid])
  }

  getSponsorProvider(): ethers.JsonRpcProvider {
    return this.sponsorClient
  }

  getUserProvider(): ethers.JsonRpcProvider {
    return this.userClient
  }
}
