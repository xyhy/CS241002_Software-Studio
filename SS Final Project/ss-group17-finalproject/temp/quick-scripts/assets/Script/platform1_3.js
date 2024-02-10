(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/platform1_3.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '850e4B9qgBEvL+bWCKOq5gF', 'platform1_3', __filename);
// Script/platform1_3.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var platform1_3 = /** @class */ (function (_super) {
    __extends(platform1_3, _super);
    function platform1_3() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.platform = [];
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    platform1_3.prototype.start = function () {
        this.generate_1();
        this.schedule(this.generate_1, 3);
        this.generate_2();
        this.schedule(this.generate_2, 3);
        this.generate_3();
        this.schedule(this.generate_3, 3);
    };
    platform1_3.prototype.generate_1 = function () {
        var new_type = 0;
        var new_plat = cc.instantiate(this.platform[new_type]);
        new_plat.position = this.node.convertToNodeSpaceAR(cc.v2(323.782, 377.413));
        new_plat.getComponent('platform_boss1').dir = 1;
        new_plat.getComponent('platform_boss1').type = new_type;
        new_plat.parent = this.node;
    };
    platform1_3.prototype.generate_2 = function () {
        var new_type = 0;
        var new_plat = cc.instantiate(this.platform[new_type]);
        new_plat.position = this.node.convertToNodeSpaceAR(cc.v2(641.558, 163.839));
        new_plat.getComponent('platform_boss1').dir = 0;
        new_plat.getComponent('platform_boss1').type = new_type;
        new_plat.parent = this.node;
    };
    platform1_3.prototype.generate_3 = function () {
        var new_type = 0;
        var new_plat = cc.instantiate(this.platform[new_type]);
        new_plat.position = this.node.convertToNodeSpaceAR(cc.v2(1532.498, 376.506));
        new_plat.getComponent('platform_boss1').dir = 1;
        new_plat.getComponent('platform_boss1').type = new_type;
        new_plat.parent = this.node;
    };
    platform1_3.prototype.random_platform = function () {
        return Math.floor(Math.random() * 2);
    };
    // update (dt) {}
    platform1_3.prototype.random_x = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    __decorate([
        property([cc.Prefab])
    ], platform1_3.prototype, "platform", void 0);
    platform1_3 = __decorate([
        ccclass
    ], platform1_3);
    return platform1_3;
}(cc.Component));
exports.default = platform1_3;

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
        //# sourceMappingURL=platform1_3.js.map
        