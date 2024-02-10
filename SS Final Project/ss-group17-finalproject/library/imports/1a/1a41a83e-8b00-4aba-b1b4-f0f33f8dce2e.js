"use strict";
cc._RF.push(module, '1a41ag+iwBKurG08PM/jc4u', 'cam_1');
// Script/cam_1.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var cam_1 = /** @class */ (function (_super) {
    __extends(cam_1, _super);
    function cam_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    cam_1.prototype.start = function () {
    };
    cam_1.prototype.earthquake = function () {
        var movement = 3;
        var scale = 5;
        var startingPos = this.node.position;
        var startingScale = this.node.scaleY;
        var act = cc.spawn(cc.moveBy(0.02, 2, 0), cc.scaleBy(0.025, this.getRandom(-scale, scale)));
        var act2 = cc.spawn(cc.moveBy(0.02, -2, 0), cc.scaleBy(0.025, this.getRandom(-scale, scale)));
        var act3 = cc.spawn(cc.moveBy(0.02, 0, 1), cc.scaleBy(0.025, this.getRandom(-scale, scale)));
        var act4 = cc.spawn(cc.moveBy(0.02, 0, -1), cc.scaleBy(0.025, this.getRandom(-scale, scale)));
        var act_s = cc.sequence(act, act2, act3, act4);
        this.node.runAction(cc.sequence(act_s, act_s, act_s, act_s, act_s, act_s, act_s, act_s, act_s, act_s, act_s, act_s, act_s, act_s, act_s));
    };
    cam_1.prototype.getRandom = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    cam_1 = __decorate([
        ccclass
    ], cam_1);
    return cam_1;
}(cc.Component));
exports.default = cam_1;

cc._RF.pop();