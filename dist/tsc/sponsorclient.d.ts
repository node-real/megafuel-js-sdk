import { ethers, FetchRequest, JsonRpcApiProviderOptions, Networkish } from 'ethers';
export declare enum WhitelistType {
    FromAccountWhitelist = "FromAccountWhitelist",
    ToAccountWhitelist = "ToAccountWhitelist",
    ContractMethodSigWhitelist = "ContractMethodSigWhitelist",
    BEP20ReceiverWhiteList = "BEP20ReceiverWhiteList"
}
export type WhiteListArgs = {
    PolicyUUID: string;
    WhitelistType: WhitelistType;
    Values: string[];
};
export type GetWhiteListArgs = {
    PolicyUUID: string;
    WhitelistType: WhitelistType;
    Offset: number;
    Limit: number;
};
export declare class SponsorClient extends ethers.JsonRpcProvider {
    constructor(url?: string | FetchRequest, network?: Networkish, options?: JsonRpcApiProviderOptions);
    addToWhitelist(params: WhiteListArgs): Promise<boolean>;
    removeFromWhitelist(params: WhiteListArgs): Promise<boolean>;
    emptyWhitelist(params: WhiteListArgs): Promise<boolean>;
    getWhitelist(params: GetWhiteListArgs): Promise<string[]>;
}
