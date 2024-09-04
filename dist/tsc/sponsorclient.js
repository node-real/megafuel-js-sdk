"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SponsorClient = exports.WhitelistType = void 0;
const tslib_1 = require("tslib");
const ethers_1 = require("ethers");
var WhitelistType;
(function (WhitelistType) {
    WhitelistType["FromAccountWhitelist"] = "FromAccountWhitelist";
    WhitelistType["ToAccountWhitelist"] = "ToAccountWhitelist";
    WhitelistType["ContractMethodSigWhitelist"] = "ContractMethodSigWhitelist";
    WhitelistType["BEP20ReceiverWhiteList"] = "BEP20ReceiverWhiteList";
})(WhitelistType = exports.WhitelistType || (exports.WhitelistType = {}));
class SponsorClient extends ethers_1.ethers.JsonRpcProvider {
    constructor(url, network, options) {
        super(url, network, options);
    }
    addToWhitelist(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.send('pm_addToWhitelist', [params]);
        });
    }
    removeFromWhitelist(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.send('pm_rmFromWhitelist', [params]);
        });
    }
    emptyWhitelist(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.send('pm_emptyWhitelist', [params]);
        });
    }
    getWhitelist(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.send('pm_getWhitelist', [params]);
        });
    }
    getUserSpendData(fromAddress, policyUUID) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.send('pm_getUserSpendData', [fromAddress, policyUUID]);
        });
    }
    getPolicySpendData(policyUUID) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.send('pm_getPolicySpendData', [policyUUID]);
        });
    }
}
exports.SponsorClient = SponsorClient;
//# sourceMappingURL=sponsorclient.js.map