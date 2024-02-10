(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/platform1_4.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '42c32lSPkND2JKnyNspfXdW', 'platform1_4', __filename);
// Script/platform1_4.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var platform1_4 = /** @class */ (function (_super) {
    __extends(platform1_4, _super);
    function platform1_4() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.platform = [];
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    platform1_4.prototype.start = function () {
        this.generate_1();
        this.schedule(this.generate_1, 3);
        this.generate_2();
        this.schedule(this.generate_2, 3);
    };
    platform1_4.prototype.generate_1 = function () {
        var new_type = 0;
        var new_plat = cc.instantiate(this.platform[new_type]);
        new_plat.position = this.node.convertToNodeSpaceAR(cc.v2(1022.465, 122.513));
        new_plat.getComponent('platform_boss1').dir = 0;
        new_plat.getComponent('platform_boss1').type = new_type;
        new_plat.parent = this.node;
    };
    platform1_4.prototype.generate_2 = function () {
        var new_type = 0;
        var new_plat = cc.instantiate(this.platform[new_type]);
        new_plat.position = this.node.convertToNodeSpaceAR(cc.v2(2648.547, 394.753));
        new_plat.getComponent('platform_boss1').dir = 1;
        new_plat.getComponent('platform_boss1').type = new_type;
        new_plat.parent = this.node;
    };
    platform1_4.prototype.random_platform = function () {
        return Math.floor(Math.random() * 2);
    };
    // update (dt) {}
    platform1_4.prototype.random_x = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    __decorate([
        property([cc.Prefab])
    ], platform1_4.prototype, "platform", void 0);
    platform1_4 = __decorate([
        ccclass
    ], platform1_4);
    return platform1_4;
}(cc.Component));
exports.default = platform1_4;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=platform1_4.js.map
        