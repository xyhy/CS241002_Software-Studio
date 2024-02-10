"use strict";
cc._RF.push(module, '80a53EyHFxDa7Fd70krQ45k', 'cam_3');
// Script/cam_3.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var cam1_0 = /** @class */ (function (_super) {
    __extends(cam1_0, _super);
    function cam1_0() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.player = null;
        _this.left_limit = 0;
        _this.right_limit = 0;
        _this.up_limit = 0;
        _this.down_limit = 0;
        _this.is_3_4 = false;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    cam1_0.prototype.start = function () {
    };
    cam1_0.prototype.update = function (dt) {
        var target_pos = this.player.getPosition();
        var cam_pos = this.node.position;
        var cam_x = (target_pos.x >= this.left_limit && target_pos.x <= this.right_limit) ? target_pos.x : cam_pos.x;
        var cam_y = (target_pos.y >= this.down_limit && target_pos.y <= this.up_limit) ? ((this.is_3_4) ? target_pos.y + 100 : target_pos.y) : cam_pos.y;
        this.node.setPosition(cc.v2(cam_x, cam_y));
    };
    __decorate([
        property(cc.Node)
    ], cam1_0.prototype, "player", void 0);
    __decorate([
        property()
    ], cam1_0.prototype, "left_limit", void 0);
    __decorate([
        property()
    ], cam1_0.prototype, "right_limit", void 0);
    __decorate([
        property()
    ], cam1_0.prototype, "up_limit", void 0);
    __decorate([
        property()
    ], cam1_0.prototype, "down_limit", void 0);
    __decorate([
        property()
    ], cam1_0.prototype, "is_3_4", void 0);
    cam1_0 = __decorate([
        ccclass
    ], cam1_0);
    return cam1_0;
}(cc.Component));
exports.default = cam1_0;

cc._RF.pop();