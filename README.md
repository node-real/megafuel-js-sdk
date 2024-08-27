# megafuel-js-sdk

This is Javascript SDK for the MegaFuel clients, it provides a simple way to interact with the MegaFuel.

For more information, please refer to the [API documentation](https://docs.nodereal.io/docs/megafuel-api).

## Quick Start
1. Install dependency
 ```shell
 $ npm install
 ```

2. Example
```js
import {ethers} from "ethers";
import {SponsorClient, WhitelistType} from 'megafuel-js-sdk';

const SPONSOR_URL = "https://sponsor-api.nodereal.io";
const CHAIN_ID = "97";

const client = new SponsorClient(SPONSOR_URL, null, { staticNetwork: ethers.Network.from(Number(CHAIN_ID)) });

try {
  // sponsor the tx that interact with the stable coin ERC20 contract
  const res1 = await client.addToWhitelist({
    PolicyUUID: "xxxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
    WhitelistType: WhitelistType.ToAccountWhitelist,
    Values: ["0x64544969ed7EBf5f083679233325356EbE738930"]
  });
  console.log("Added ERC20 contract address to whitelist ", res1);
} catch (error){
  console.error("Error:", error)
}
```

3. More examples can be found in the [examples](https://github.com/node-real/megafuel-client-example).

