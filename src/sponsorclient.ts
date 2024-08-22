import {ethers} from 'ethers'

export enum WhiteListType {
  FromAccountWhitelist = 'FromAccountWhitelist',
  ToAccountWhitelist = 'ToAccountWhitelist',
  ContractMethodSigWhitelist = 'ContractMethodSigWhitelist',
  BEP20ReceiverWhiteList = 'BEP20ReceiverWhiteList'
}

export type WhiteListArgs = {
  policyUuid: string
  whitelistType: WhiteListType
  values: string[]
}

export type GetWhiteListArgs = {
  policyUuid: string
  whitelistType: WhiteListType
  offset: number
  limit: number
}

export class SponsorClient extends ethers.JsonRpcProvider {
  constructor(url:string) {
    super(url)
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
