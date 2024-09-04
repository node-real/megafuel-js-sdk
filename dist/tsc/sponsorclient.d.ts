import { ethers, FetchRequest, JsonRpcApiProviderOptions, Networkish } from 'ethers';
import type { AddressLike } from 'ethers/src.ts/address';
import type { BigNumberish } from 'ethers/src.ts/utils';
export declare enum WhitelistType {
    FromAccountWhitelist = "FromAccountWhitelist",
    ToAccountWhitelist = "ToAccountWhitelist",
    ContractMethodSigWhitelist = "ContractMethodSigWhitelist",
    BEP20ReceiverWhiteList = "BEP20ReceiverWhiteList"
}
export type WhitelistArgs = {
    PolicyUUID: string;
    WhitelistType: WhitelistType;
    Values: string[];
};
export type EmptyWhitelistArgs = {
    PolicyUUID: string;
    WhitelistType: WhitelistType;
};
export type GetWhitelistArgs = {
    PolicyUUID: string;
    WhitelistType: WhitelistType;
    Offset: number;
    Limit: number;
};
export type UserSpendData = {
    UserAddress: AddressLike;
    GasCost?: BigNumberish;
    GasCostCurDay?: BigNumberish;
    TxCountCurDay: bigint;
    UpdateAt: bigint;
    ChainID: number;
};
export type PolicySpendData = {
    Cost?: BigNumberish;
    UpdateAt: bigint;
    ChainID: number;
};
export declare class SponsorClient extends ethers.JsonRpcProvider {
    constructor(url?: string | FetchRequest, network?: Networkish, options?: JsonRpcApiProviderOptions);
    addToWhitelist(params: WhitelistArgs): Promise<boolean>;
    removeFromWhitelist(params: WhitelistArgs): Promise<boolean>;
    emptyWhitelist(params: EmptyWhitelistArgs): Promise<boolean>;
    getWhitelist(params: GetWhitelistArgs): Promise<string[]>;
    getUserSpendData(fromAddress: AddressLike, policyUUID: string): Promise<UserSpendData>;
    getPolicySpendData(policyUUID: string): Promise<PolicySpendData>;
}
