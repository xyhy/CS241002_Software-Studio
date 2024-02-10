(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/test_b2.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b9d89SGtEhLgKKI5sx0+wix', 'test_b2', __filename);
// Script/test_b2.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var bullet_b_test = /** @class */ (function (_super) {
    __extends(bullet_b_test, _super);
    function bullet_b_test() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    bullet_b_test.prototype.start = function () {
    };
    bullet_b_test.prototype.shoot = function (x) {
        var _this = this;
        var act = cc.moveBy(5, -1200, 0);
        var act2 = cc.moveBy(5, 1200, 0);
        var call = cc.callFunc(function () { _this.node.destroy(); });
        if (x == 1) {
            this.node.scaleX *= -1;
            this.node.runAction(cc.sequence(act2, call));
        }
        else if (x == 0) {
            this.node.runAction(cc.sequence(act, call));
        }
    };
    bullet_b_test.prototype.random_pos = function () {
        return Math.random() * (850 - 400) + 400;
    };
    bullet_b_test.prototype.random_speed = function () {
        return Math.random() * (8 - 3) + 3;
    };
    bullet_b_test.prototype.onBeginContact = function (contact, self, other) {
        if (other.node.name == 'boss') {
            //cc.log('player -= 100');
            //other.getComponent('player_boss').player_score -= 100;
            //this.node.destroy();
        }
    };
    bullet_b_test = __decorate([
        ccclass
    ], bullet_b_test);
    return bullet_b_test;
}(cc.Component));
exports.default = bullet_b_test;

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
        //# sourceMappingURL=test_b2.js.map
        