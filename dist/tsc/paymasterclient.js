"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymasterClient = exports.GaslessTransactionStatus = void 0;
const tslib_1 = require("tslib");
const ethers_1 = require("ethers");
var GaslessTransactionStatus;
(function (GaslessTransactionStatus) {
    GaslessTransactionStatus[GaslessTransactionStatus["New"] = 0] = "New";
    GaslessTransactionStatus[GaslessTransactionStatus["Pending"] = 1] = "Pending";
    GaslessTransactionStatus[GaslessTransactionStatus["Confirmed"] = 2] = "Confirmed";
    GaslessTransactionStatus[GaslessTransactionStatus["Failed"] = 3] = "Failed";
    GaslessTransactionStatus[GaslessTransactionStatus["Invalid"] = 4] = "Invalid";
})(GaslessTransactionStatus = exports.GaslessTransactionStatus || (exports.GaslessTransactionStatus = {}));
class PaymasterClient extends ethers_1.ethers.JsonRpcProvider {
    constructor(url) {
        super(url);
    }
    ChainID() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.send('eth_chainId', []);
        });
    }
    isSponsorable(tx) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.send('pm_isSponsorable', [tx]);
        });
    }
    sendRawTransaction(signedTx) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.send('eth_sendRawTransaction', [signedTx]);
        });
    }
    getGaslessTransactionByHash(hash) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.send('eth_getGaslessTransactionByHash', [hash]);
        });
    }
}
exports.PaymasterClient = PaymasterClient;
//# sourceMappingURL=paymasterclient.js.map