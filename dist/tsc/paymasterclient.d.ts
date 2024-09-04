import { ethers, FetchRequest, JsonRpcApiProviderOptions, Networkish, TransactionRequest } from 'ethers';
import type { AddressLike } from 'ethers/src.ts/address';
import type { BigNumberish } from 'ethers/src.ts/utils';
export type IsSponsorableResponse = {
    Sponsorable: boolean;
    SponsorName: string;
    SponsorIcon: string;
    SponsorWebsite: string;
};
export declare enum GaslessTransactionStatus {
    New = 0,
    Pending = 1,
    Confirmed = 2,
    Failed = 3,
    Invalid = 4
}
export type GaslessTransaction = {
    readonly TxHash: string;
    readonly BundleUUID: string;
    readonly FromAddress?: AddressLike;
    readonly ToAddress?: AddressLike;
    readonly Nonce: number;
    readonly RawData: string;
    readonly Status: GaslessTransactionStatus;
    readonly GasUsed: bigint;
    readonly GasFee?: BigNumberish;
    readonly PolicyUUID: bigint;
    readonly Source: string;
    readonly BornBlockNumber: bigint;
    readonly ChainID: number;
};
export type SponsorTx = {
    readonly TxHash: string;
    readonly Address: AddressLike;
    readonly BundleUUID: string;
    readonly Status: GaslessTransactionStatus;
    readonly GasPrice?: BigNumberish;
    readonly GasFee?: BigNumberish;
    readonly BornBlockNumber: bigint;
    readonly ChainID: number;
};
export type Bundle = {
    readonly BundleUUID: string;
    readonly Status: GaslessTransactionStatus;
    readonly AvgGasPrice?: BigNumberish;
    readonly BornBlockNumber: bigint;
    readonly ConfirmedBlockNumber: bigint;
    readonly ConfirmedDate: bigint;
    readonly ChainID: number;
};
export declare class PaymasterClient extends ethers.JsonRpcProvider {
    constructor(url?: string | FetchRequest, network?: Networkish, options?: JsonRpcApiProviderOptions);
    ChainID(): Promise<string>;
    isSponsorable(tx: TransactionRequest): Promise<IsSponsorableResponse>;
    sendRawTransaction(signedTx: string): Promise<string>;
    getGaslessTransactionByHash(hash: string): Promise<GaslessTransaction>;
    getSponsorTxByTxHash(hash: string): Promise<SponsorTx>;
    getSponsorTxByBundleUuid(bundleUuid: string): Promise<SponsorTx>;
    getBundleByUuid(bundleUuid: string): Promise<Bundle>;
}
