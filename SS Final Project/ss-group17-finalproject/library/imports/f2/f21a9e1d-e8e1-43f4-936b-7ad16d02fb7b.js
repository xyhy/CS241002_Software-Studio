"use strict";
cc._RF.push(module, 'f21a94d6OFD9JNretFtAvt7', 'cam2_2');
// Script/cam2_2.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var cam2_2 = /** @class */ (function (_super) {
    __extends(cam2_2, _super);
    function cam2_2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.player = null;
        _this.left_limit = 0;
        _this.right_limit = 0;
        _this.up_limit = 0;
        _this.down_limit = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    cam2_2.prototype.start = function () {
    };
    cam2_2.prototype.update = function (dt) {
        var target_pos = this.player.getPosition();
        var cam_pos = this.node.position;
        var cam_x = (target_pos.x >= this.left_limit && target_pos.x <= this.right_limit) ? target_pos.x : cam_pos.x;
        var cam_y = (target_pos.y >= this.down_limit && target_pos.y <= this.up_limit) ? target_pos.y : cam_pos.y;
        this.node.setPosition(cc.v2(cam_x, cam_y));
    };
    __decorate([
        property(cc.Node)
    ], cam2_2.prototype, "player", void 0);
    __decorate([
        property()
    ], cam2_2.prototype, "left_limit", void 0);
    __decorate([
        property()
    ], cam2_2.prototype, "right_limit", void 0);
    __decorate([
        property()
    ], cam2_2.prototype, "up_limit", void 0);
    __decorate([
        property()
    ], cam2_2.prototype, "down_limit", void 0);
    cam2_2 = __decorate([
        ccclass
    ], cam2_2);
    return cam2_2;
}(cc.Component));
exports.default = cam2_2;

cc._RF.pop();