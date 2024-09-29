# megafuel-js-sdk

This JavaScript SDK is thin wrapper of MegaFuel clients, offering a streamlined interface to interact with the MegaFuel. For more information, please refer to the [API documentation](https://docs.nodereal.io/reference/pm-issponsorable).

## Network Endpoint

|    Network    |        [Paymaster]( https://docs.nodereal.io/reference/pm-issponsorable)        |   [Sponsor](https://docs.nodereal.io/reference/pm-addtowhitelist)    |
|:-------------:|:-------------------------------------------------------------------------------:|:--------------------------------------------------------------------:|
|  BSC mainnet  |                        https://bsc-megafuel.nodereal.io                         |     https://open-platform-ap.nodereal.io/{YOUR_API_KEY}/megafuel     |
|  BSC testnet  |                    https://bsc-megafuel-testnet.nodereal.io                     | https://open-platform-ap.nodereal.io/{YOUR_API_KEY}/megafuel-testnet |
| opBNB mainnet |                       https://opbnb-megafuel.nodereal.io                        |     https://open-platform-ap.nodereal.io/{YOUR_API_KEY}/megafuel     |
| opBNB testnet |                   https://opbnb-megafuel-testnet.nodereal.io                    | https://open-platform-ap.nodereal.io/{YOUR_API_KEY}/megafuel-testnet |

## Quick Start
1. Install dependency

```shell
 $ npm install megafuel-js-sdk
 ```

2. Example
```js
import 'dotenv/config';
import {ethers} from "ethers";
import {PaymasterClient, SponsorClient} from 'megafuel-js-sdk';

const PAYMASTER_URL = "https://bsc-megafuel.nodereal.io"
const SPONSOR_URL = "https://open-platform-ap.nodereal.io/{YOUR_API_KEY}/megafuel"

const POLICY_UUID = "a2381160-xxxx-xxxx-xxxxceca86556834"
const TOKEN_CONTRACT_ADDRESS = "0xeD2.....12Ee"
const RECIPIENT_ADDRESS = "0x8e9......3EA2"
const YOUR_PRIVATE_KEY = "69......929"

const paymasterClient = new PaymasterClient(PAYMASTER_URL);
const network = await paymasterClient.getNetwork();
const sponsorClient = new SponsorClient(SPONSOR_URL, null, {staticNetwork: ethers.Network.from(Number(network.chainId))});

try {
  // sponsor the tx that interact with the stable coin ERC20 contract
  const res = await sponsorClient.addToWhitelist({
    PolicyUUID: POLICY_UUID,
    WhitelistType: WhitelistType.ToAccountWhitelist,
    Values: [RECIPIENT_ADDRESS]
  });
  console.log("Added ERC20 contract address to whitelist ", res);
} catch (error) {
  console.error("Error:", error)
}

const wallet = new ethers.Wallet(YOUR_PRIVATE_KEY);
const tokenAbi = ["function transfer(address,uint256) returns (bool)"]; // ERC20 token ABI (only including the transfer function)
const tokenContract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, tokenAbi, wallet); // Create contract instance
// Get the current nonce for the sender's address
const nonce = await paymasterClient.getTransactionCount(wallet.address, 'pending');
const tokenAmount = ethers.parseUnits('1.0', 18); // Amount of tokens to send (adjust decimals as needed)
const transaction = await tokenContract.transfer.populateTransaction(RECIPIENT_ADDRESS, tokenAmount);

// Add nonce and gas settings
transaction.from = wallet.address;
transaction.nonce = nonce;
transaction.gasLimit = 100000; // Adjust gas limit as needed for token transfers
transaction.chainId = network.chainId;
transaction.gasPrice = 0; // Set gas price to 0

try {
  const sponsorableInfo = await paymasterClient.isSponsorable(transaction);
  console.log('Sponsorable Information:', sponsorableInfo);
} catch (error) {
  console.error('Error checking sponsorable status:', error);
}

try {
  // Sign the transaction
  const signedTx = await wallet.signTransaction(transaction);
  // Send the raw transaction using the sending provider
  const tx = await paymasterClient.sendRawTransaction(signedTx);
  console.log('Transaction sent:', tx);
} catch (error) {
  console.error('Error sending transaction:', error);
}
```

More examples can be found in the [examples](https://github.com/node-real/megafuel-client-example).

