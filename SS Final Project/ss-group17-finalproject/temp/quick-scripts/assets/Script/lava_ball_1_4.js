(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/lava_ball_1_4.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e25cfJkjSlNdLlM2j7FnjWu', 'lava_ball_1_4', __filename);
// Script/lava_ball_1_4.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var lava_ball_1_4 = /** @class */ (function (_super) {
    __extends(lava_ball_1_4, _super);
    function lava_ball_1_4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    lava_ball_1_4.prototype.start = function () {
        var _this = this;
        var act = cc.moveBy(this.random_speed(), -5000, 0);
        var call = cc.callFunc(function () { _this.node.destroy(); });
        this.node.position = cc.v2(3900, this.random_pos());
        this.node.runAction(cc.sequence(act, call));
    };
    lava_ball_1_4.prototype.random_pos = function () {
        return Math.random() * (650 - 100) + 100;
    };
    lava_ball_1_4.prototype.random_speed = function () {
        return Math.random() * (24 - 10) + 10;
    };
    lava_ball_1_4.prototype.onBeginContact = function (contact, self, other) {
        if (other.node.name == 'player') {
            cc.log('player -= 100');
            other.getComponent('player_boss').player_score -= 100;
            this.node.destroy();
        }
    };
    lava_ball_1_4 = __decorate([
        ccclass
    ], lava_ball_1_4);
    return lava_ball_1_4;
}(cc.Component));
exports.default = lava_ball_1_4;

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
        //# sourceMappingURL=lava_ball_1_4.js.map
        