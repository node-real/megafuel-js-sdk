"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SponsorClient = exports.WhiteListType = void 0;
const tslib_1 = require("tslib");
const ethers_1 = require("ethers");
var WhiteListType;
(function (WhiteListType) {
    WhiteListType["FromAccountWhitelist"] = "FromAccountWhitelist";
    WhiteListType["ToAccountWhitelist"] = "ToAccountWhitelist";
    WhiteListType["ContractMethodSigWhitelist"] = "ContractMethodSigWhitelist";
    WhiteListType["BEP20ReceiverWhiteList"] = "BEP20ReceiverWhiteList";
})(WhiteListType = exports.WhiteListType || (exports.WhiteListType = {}));
class SponsorClient extends ethers_1.ethers.JsonRpcProvider {
    constructor(url) {
        super(url);
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
}
exports.SponsorClient = SponsorClient;
//# sourceMappingURL=sponsorclient.js.map