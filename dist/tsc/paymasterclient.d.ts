import { ethers, FetchRequest, JsonRpcApiProviderOptions, Networkish, TransactionRequest } from 'ethers';
import type { AddressLike } from 'ethers/src.ts/address';
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
    readonly BundleID: bigint;
    readonly FromAddress?: AddressLike;
    readonly ToAddress?: AddressLike;
    readonly RawData: string;
    readonly Status: GaslessTransactionStatus;
    readonly GasUsed: bigint;
    readonly PolicyID: bigint;
    readonly Source: string;
    readonly BornBlockNumber: bigint;
    readonly ChainID: number;
};
export declare class PaymasterClient extends ethers.JsonRpcProvider {
    constructor(url?: string | FetchRequest, network?: Networkish, options?: JsonRpcApiProviderOptions);
    ChainID(): Promise<string>;
    isSponsorable(tx: TransactionRequest): Promise<IsSponsorableResponse>;
    sendRawTransaction(signedTx: string): Promise<string>;
    getGaslessTransactionByHash(hash: string): Promise<GaslessTransaction>;
}
