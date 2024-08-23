import {ethers, FetchRequest, JsonRpcApiProviderOptions, Networkish} from 'ethers'

export enum WhitelistType {
  FromAccountWhitelist = 'FromAccountWhitelist',
  ToAccountWhitelist = 'ToAccountWhitelist',
  ContractMethodSigWhitelist = 'ContractMethodSigWhitelist',
  BEP20ReceiverWhiteList = 'BEP20ReceiverWhiteList'
}

export type WhiteListArgs = {
  PolicyUUID: string
  WhitelistType: WhitelistType
  Values: string[]
}

export type GetWhiteListArgs = {
  PolicyUUID: string
  WhitelistType: WhitelistType
  Offset: number
  Limit: number
}

export class SponsorClient extends ethers.JsonRpcProvider {
  constructor(url?: string | FetchRequest, network?: Networkish, options?: JsonRpcApiProviderOptions) {
    super(url, network, options);
  }

  async addToWhitelist(params: WhiteListArgs): Promise<boolean> {
    return this.send('pm_addToWhitelist', [params])
  }

  async removeFromWhitelist(params: WhiteListArgs): Promise<boolean> {
    return this.send('pm_rmFromWhitelist', [params])
  }

  async emptyWhitelist(params: WhiteListArgs): Promise<boolean> {
    return this.send('pm_emptyWhitelist', [params])
  }

  async getWhitelist(params: GetWhiteListArgs): Promise<string[]> {
    return this.send('pm_getWhitelist', [params])
  }
}
