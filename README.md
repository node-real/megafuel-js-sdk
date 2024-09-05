# megafuel-js-sdk

This JavaScript SDK is thin wrapper of MegaFuel clients, offering a streamlined interface to interact with the MegaFuel. For more information, please refer to the [API documentation](https://docs.nodereal.io/docs/megafuel-api).

## Network Endpoint

- BSC mainet: https://bsc-megafuel.nodereal.io
- BSC testnet: https://bsc-megafuel-testnet.nodereal.io
-
## Quick Start
1. Install dependency
Configure dependency in your `package.json` file:
"dependencies": {
   "megafuel-js-sdk": "^0.0.5"
}

then run:
```shell
 $ npm install
 ```

2. Example
```js
import 'dotenv/config';
import {ethers} from "ethers";
import { PaymasterClient } from 'megafuel-js-sdk';

const PAYMASTER_URL="https://bsc-megafuel-testnet.nodereal.io"
const CHAIN_URL="https://data-seed-prebsc-2-s1.binance.org:8545/"
const SPONSOR_URL="https://open-platform.nodereal.io/<api-key>/megafuel-testnet"
const CHAIN_ID="97"

const POLICY_UUID="a2381160-xxxx-xxxx-xxxxceca86556834"
const TOKEN_CONTRACT_ADDRESS="0xeD2.....12Ee"
const RECIPIENT_ADDRESS="0x8e9......3EA2"
const YOUR_PRIVATE_KEY="69......929"

const client = new SponsorClient(SPONSOR_URL, null, { staticNetwork: ethers.Network.from(Number(CHAIN_ID)) });

try {
  // sponsor the tx that interact with the stable coin ERC20 contract
  const res1 = await client.addToWhitelist({
    PolicyUUID: POLICY_UUID,
    WhitelistType: WhitelistType.ToAccountWhitelist,
    Values: [RECIPIENT_ADDRESS]
  });
  console.log("Added ERC20 contract address to whitelist ", res1);
} catch (error){
  console.error("Error:", error)
}

// Provider for assembling the transaction (e.g., mainnet)
const assemblyProvider = new ethers.JsonRpcProvider(CHAIN_URL);

// Provider for sending the transaction (e.g., could be a different network or provider)
const paymasterProvider = new PaymasterClient(PAYMASTER_URL);

const wallet = new ethers.Wallet(YOUR_PRIVATE_KEY, assemblyProvider);
// ERC20 token ABI (only including the transfer function)
const tokenAbi = [
  "function transfer(address,uint256) returns (bool)"
];

// Create contract instance
const tokenContract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, tokenAbi, wallet);

// Transaction details
const tokenAmount = ethers.parseUnits('1.0', 18); // Amount of tokens to send (adjust decimals as needed)

try {
  // Get the current nonce for the sender's address
  const nonce = await assemblyProvider.getTransactionCount(wallet.address);

  // Create the transaction object
  const transaction = await tokenContract.transfer.populateTransaction(RECIPIENT_ADDRESS, tokenAmount);

  // Add nonce and gas settings
  transaction.from = wallet.address;
  transaction.nonce = nonce;
  transaction.gasLimit = 100000; // Adjust gas limit as needed for token transfers
  transaction.chainId = 97;
  transaction.gasPrice = 0; // Set gas price to 0

  try {
    const sponsorableInfo = await paymasterProvider.isSponsorable(transaction);
    console.log('Sponsorable Information:', sponsorableInfo);
  } catch (error) {
    console.error('Error checking sponsorable status:', error);
  }

  // Sign the transaction
  const signedTx = await wallet.signTransaction(transaction);

  // Send the raw transaction using the sending provider
  const tx = await paymasterProvider.sendRawTransaction(signedTx);
  console.log('Transaction sent:', tx);

} catch (error) {
  console.error('Error sending transaction:', error);
}
```

More examples can be found in the [examples](https://github.com/node-real/megafuel-client-example).

