(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/lava_ball.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7fccbfQ7vdBIK7Jt4cT26VK', 'lava_ball', __filename);
// Script/lava_ball.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var lava_ball = /** @class */ (function (_super) {
    __extends(lava_ball, _super);
    function lava_ball() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    lava_ball.prototype.start = function () {
        var _this = this;
        var act = cc.moveBy(this.random_speed(), -1200, -600);
        var call = cc.callFunc(function () { _this.node.destroy(); });
        this.node.position = cc.v2(1035, this.random_pos());
        this.node.runAction(cc.sequence(act, call));
    };
    lava_ball.prototype.random_pos = function () {
        return Math.random() * (850 - 400) + 400;
    };
    lava_ball.prototype.random_speed = function () {
        return Math.random() * (8 - 3) + 3;
    };
    lava_ball.prototype.onBeginContact = function (contact, self, other) {
        if (other.node.name == 'player') {
            cc.log('player -= 100');
            other.getComponent('player_boss').player_score -= 100;
            this.node.destroy();
        }
    };
    lava_ball = __decorate([
        ccclass
    ], lava_ball);
    return lava_ball;
}(cc.Component));
exports.default = lava_ball;

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
        //# sourceMappingURL=lava_ball.js.map
        