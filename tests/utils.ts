import {
  SponsorClient,
  PaymasterClient,
  IsSponsorableResponse,
  GaslessTransaction,
  SponsorTx,
  Bundle,
  GaslessTransactionStatus,
} from '../src'
import {CHAIN_ID, SPONSOR_URL, CHAIN_URL, PAYMASTER_URL, PRIVATE_KEY, TOKEN_CONTRACT_ADDRESS, PRIVATE_POLICY_UUID} from './env'
import {ethers} from 'ethers'


export const sponsorClient = new SponsorClient(SPONSOR_URL)

// Provider for assembling the transaction (e.g., testnet)
export const assemblyProvider = new ethers.JsonRpcProvider(CHAIN_URL)

// Provider for sending the transaction (e.g., could be a different network or provider)
export const paymasterClient = PaymasterClient.new(PAYMASTER_URL)
export const privatePaymasterClient = PaymasterClient.newPrivatePaymaster(SPONSOR_URL, PRIVATE_POLICY_UUID)

export const wallet = new ethers.Wallet(PRIVATE_KEY, assemblyProvider)
// ERC20 token ABI (only including the transfer function)
export const tokenAbi = [
  'function transfer(address,uint256) returns (bool)',
]

// Create contract instance
export const tokenContract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, tokenAbi, wallet)

export function transformIsSponsorableResponse(rawResponse: any): IsSponsorableResponse {
  return {
    Sponsorable: rawResponse.sponsorable,
    SponsorName: rawResponse.sponsorName,
    SponsorIcon: rawResponse.sponsorIcon,
    SponsorWebsite: rawResponse.sponsorWebsite,
  }
}

export function transformToGaslessTransaction(rawResponse: any): GaslessTransaction {
  return {
    TxHash: rawResponse.txHash,
    BundleUUID: rawResponse.bundleUuid,
    FromAddress: rawResponse.fromAddress,
    ToAddress: rawResponse.toAddress,
    Nonce: rawResponse.nonce,
    RawData: rawResponse.rawData,
    Status: rawResponse.status,
    GasUsed: rawResponse.gasUsed,
    GasFee: rawResponse.gasFee,
    PolicyUUID: rawResponse.policyUuid,
    Source: rawResponse.source,
    BornBlockNumber: rawResponse.bornBlockNumber,
    ChainID: rawResponse.chainId,
  }
}

export function transformSponsorTxResponse(rawResponse: any): SponsorTx {
  return {
    TxHash: rawResponse.txHash || '',
    Address: rawResponse.address, // Ensure this is handled if it needs special type treatment like AddressLike
    BundleUUID: rawResponse.bundleUuid || '',
    Status: rawResponse.status, // Assuming status is directly assignable
    GasPrice: rawResponse.gasPrice, // Handle if necessary, ensure it's a BigNumberish type if required
    GasFee: rawResponse.gasFee, // Similarly handle BigNumberish
    BornBlockNumber: BigInt(rawResponse.bornBlockNumber || 0), // Default to 0 if undefined
    ChainID: rawResponse.chainId || 0, // Default to 0 if undefined
  }
}

export function transformBundleResponse(rawResponse: any): Bundle {
  return {
    BundleUUID: rawResponse.bundleUuid,
    Status: rawResponse.status as GaslessTransactionStatus, // Cast to GaslessTransactionStatus
    AvgGasPrice: rawResponse.avgGasPrice, // Assume this is BigNumberish already
    BornBlockNumber: BigInt(rawResponse.bornBlockNumber),
    ConfirmedBlockNumber: BigInt(rawResponse.confirmedBlockNumber),
    ConfirmedDate: BigInt(rawResponse.confirmedDate),
    ChainID: parseInt(rawResponse.chainId),
  }
}

// Function to create a delay
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
