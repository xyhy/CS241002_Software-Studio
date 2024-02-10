"use strict";
cc._RF.push(module, 'a6dbdM8VbNFxpbAERuSCcKO', 'level1_box');
// Script/level1_box.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var level1_boss = /** @class */ (function (_super) {
    __extends(level1_boss, _super);
    function level1_boss() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.act_num = 1;
        _this.cam = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    level1_boss.prototype.onLoad = function () {
        cc.director.getPhysicsManager().enabled = true;
    };
    level1_boss.prototype.start = function () {
        var _this = this;
        var act = [cc.moveBy(2, 0, 300), cc.moveBy(2, 0, -300)];
        if (this.node.name == 'box') {
            this.schedule(function () {
                _this.cam.getComponent('cam_1').earthquake();
                _this.node.runAction(act[_this.act_num].easing(cc.easeInOut(2.5)));
                _this.act_num = (_this.act_num + 1) % 2;
            }, 9);
        }
        else if (this.node.name == 'box_player') {
            this.act_num = 0;
            this.schedule(function () {
                _this.cam.getComponent('cam_1').earthquake();
                _this.node.runAction(act[_this.act_num].easing(cc.easeInOut(3)));
                _this.act_num = (_this.act_num + 1) % 2;
            }, 7);
        }
    };
    __decorate([
        property(cc.Node)
    ], level1_boss.prototype, "cam", void 0);
    level1_boss = __decorate([
        ccclass
    ], level1_boss);
    return level1_boss;
}(cc.Component));
exports.default = level1_boss;

cc._RF.pop();