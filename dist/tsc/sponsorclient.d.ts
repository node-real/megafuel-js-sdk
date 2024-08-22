import { ethers } from 'ethers';
export declare enum WhiteListType {
    FromAccountWhitelist = "FromAccountWhitelist",
    ToAccountWhitelist = "ToAccountWhitelist",
    ContractMethodSigWhitelist = "ContractMethodSigWhitelist",
    BEP20ReceiverWhiteList = "BEP20ReceiverWhiteList"
}
export type WhiteListArgs = {
    PolicyUuid: string;
    WhitelistType: WhiteListType;
    Values: string[];
};
export type GetWhiteListArgs = {
    PolicyUuid: string;
    WhitelistType: WhiteListType;
    Offset: number;
    Limit: number;
};
export declare class SponsorClient extends ethers.JsonRpcProvider {
    constructor(url: string);
    addToWhitelist(params: WhiteListArgs): Promise<boolean>;
    removeFromWhitelist(params: WhiteListArgs): Promise<boolean>;
    emptyWhitelist(params: WhiteListArgs): Promise<boolean>;
    getWhitelist(params: GetWhiteListArgs): Promise<string[]>;
}
