import { ethers, FetchRequest, JsonRpcApiProviderOptions, Networkish } from 'ethers';
export declare enum WhiteListType {
    FromAccountWhitelist = "FromAccountWhitelist",
    ToAccountWhitelist = "ToAccountWhitelist",
    ContractMethodSigWhitelist = "ContractMethodSigWhitelist",
    BEP20ReceiverWhiteList = "BEP20ReceiverWhiteList"
}
export type WhiteListArgs = {
    policyUuid: string;
    whitelistType: WhiteListType;
    values: string[];
};
export type GetWhiteListArgs = {
    policyUuid: string;
    whitelistType: WhiteListType;
    offset: number;
    limit: number;
};
export declare class SponsorClient extends ethers.JsonRpcProvider {
    constructor(url?: string | FetchRequest, network?: Networkish, options?: JsonRpcApiProviderOptions);
    addToWhitelist(params: WhiteListArgs): Promise<boolean>;
    removeFromWhitelist(params: WhiteListArgs): Promise<boolean>;
    emptyWhitelist(params: WhiteListArgs): Promise<boolean>;
    getWhitelist(params: GetWhiteListArgs): Promise<string[]>;
}
