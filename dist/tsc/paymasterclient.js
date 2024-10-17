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
    constructor(url, network, options, privatePolicyUUID) {
        super(url, network, options);
        this.privatePolicyUUID = privatePolicyUUID;
    }
    // Static method to create a new standard PaymasterClient
    static new(url, network, options) {
        return new PaymasterClient(url, network, options);
    }
    // Static method to create a new PaymasterClient with private policy
    static newPrivatePaymaster(url, privatePolicyUUID, network, options) {
        return new PaymasterClient(url, network, options, privatePolicyUUID);
    }
    chainID() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.send('eth_chainId', []);
        });
    }
    isSponsorable(tx) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const policyUUID = this.privatePolicyUUID;
            if (policyUUID) {
                const newConnection = this._getConnection();
                newConnection.setHeader("X-MegaFuel-Policy-Uuid", policyUUID);
                const provider = new ethers_1.ethers.JsonRpcProvider(newConnection, this._network, {
                    staticNetwork: this._network,
                    batchMaxCount: this.batchMaxCount,
                    polling: this.polling
                });
                return yield provider.send('pm_isSponsorable', [tx]);
            }
            return yield this.send('pm_isSponsorable', [tx]);
        });
    }
    sendRawTransaction(signedTx, opts = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const policyUUID = this.privatePolicyUUID;
            if (opts.UserAgent || this.privatePolicyUUID) {
                const newConnection = this._getConnection();
                if (opts.UserAgent) {
                    newConnection.setHeader("User-Agent", opts.UserAgent);
                }
                if (policyUUID) {
                    newConnection.setHeader("X-MegaFuel-Policy-Uuid", policyUUID);
                }
                const provider = new ethers_1.ethers.JsonRpcProvider(newConnection, this._network, {
                    staticNetwork: this._network,
                    batchMaxCount: this.batchMaxCount,
                    polling: this.polling
                });
                return yield provider.send('eth_sendRawTransaction', [signedTx]);
            }
            return yield this.send('eth_sendRawTransaction', [signedTx]);
        });
    }
    getGaslessTransactionByHash(hash) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.send('eth_getGaslessTransactionByHash', [hash]);
        });
    }
    getSponsorTxByTxHash(hash) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.send('pm_getSponsorTxByTxHash', [hash]);
        });
    }
    getSponsorTxByBundleUuid(bundleUuid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.send('pm_getSponsorTxByBundleUuid', [bundleUuid]);
        });
    }
    getBundleByUuid(bundleUuid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.send('pm_getBundleByUuid', [bundleUuid]);
        });
    }
}
exports.PaymasterClient = PaymasterClient;
//# sourceMappingURL=paymasterclient.js.map