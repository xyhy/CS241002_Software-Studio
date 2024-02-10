"use strict";
cc._RF.push(module, '0e228J2LaVA0IN1cIxC90C8', 'cam2_1');
// Script/cam2_1.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var cam2_1 = /** @class */ (function (_super) {
    __extends(cam2_1, _super);
    function cam2_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.player = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    cam2_1.prototype.start = function () {
    };
    cam2_1.prototype.update = function (dt) {
        var tar_pos = this.player.getPosition();
        var this_pos = this.node.position;
        if (tar_pos.x >= 13 && tar_pos.x <= 160)
            this.node.setPosition(cc.v2(tar_pos.x, this_pos.y));
    };
    __decorate([
        property(cc.Node)
    ], cam2_1.prototype, "player", void 0);
    cam2_1 = __decorate([
        ccclass
    ], cam2_1);
    return cam2_1;
}(cc.Component));
exports.default = cam2_1;

cc._RF.pop();