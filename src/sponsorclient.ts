import {ethers, FetchRequest, JsonRpcApiProviderOptions, Networkish} from 'ethers'
import type {AddressLike} from 'ethers/src.ts/address'
import type {BigNumberish} from 'ethers/src.ts/utils'

export enum WhitelistType {
  FromAccountWhitelist = 'FromAccountWhitelist',
  ToAccountWhitelist = 'ToAccountWhitelist',
  ContractMethodSigWhitelist = 'ContractMethodSigWhitelist',
  BEP20ReceiverWhiteList = 'BEP20ReceiverWhiteList'
}

export type WhitelistArgs = {
  PolicyUUID: string
  WhitelistType: WhitelistType
  Values: string[]
}

export type EmptyWhitelistArgs = {
  PolicyUUID: string
  WhitelistType: WhitelistType
}

export type GetWhitelistArgs = {
  PolicyUUID: string
  WhitelistType: WhitelistType
  Offset: number
  Limit: number
}

export type UserSpendData = {
  UserAddress: AddressLike
  GasCost?: BigNumberish
  GasCostCurDay?: BigNumberish
  TxCountCurDay: bigint
  UpdateAt: bigint
  ChainID: number
}

export type PolicySpendData = {
  Cost?: BigNumberish
  UpdateAt: bigint
  ChainID: number
}

export class SponsorClient extends ethers.JsonRpcProvider {
  constructor(url?: string | FetchRequest, network?: Networkish, options?: JsonRpcApiProviderOptions) {
    super(url, network, options)
  }

  async addToWhitelist(params: WhitelistArgs): Promise<boolean> {
    return this.send('pm_addToWhitelist', [params])
  }

  async removeFromWhitelist(params: WhitelistArgs): Promise<boolean> {
    return this.send('pm_rmFromWhitelist', [params])
  }

  async emptyWhitelist(params: EmptyWhitelistArgs): Promise<boolean> {
    return this.send('pm_emptyWhitelist', [params])
  }

  async getWhitelist(params: GetWhitelistArgs): Promise<string[]> {
    return this.send('pm_getWhitelist', [params])
  }

  async getUserSpendData(fromAddress: AddressLike, policyUUID: string): Promise<UserSpendData> {
    return this.send('pm_getUserSpendData', [fromAddress, policyUUID])
  }

  async getPolicySpendData(policyUUID: string): Promise<PolicySpendData> {
    return this.send('pm_getPolicySpendData', [policyUUID])
  }
}