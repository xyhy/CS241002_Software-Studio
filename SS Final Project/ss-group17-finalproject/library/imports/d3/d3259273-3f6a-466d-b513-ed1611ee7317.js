"use strict";
cc._RF.push(module, 'd3259JzP2pGbbUT7RYR7nMX', 'cam_ch1');
// Script/cam_ch1.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var cam_ch1 = /** @class */ (function (_super) {
    __extends(cam_ch1, _super);
    function cam_ch1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.player = null;
        return _this;
    }
    cam_ch1.prototype.start = function () {
        this.scene_name = cc.director.getScene().name;
    };
    cam_ch1.prototype.update = function (dt) {
        if (this.scene_name == '1-1') {
            var tar_pos = this.player.getPosition();
            var this_pos = this.node.position;
            if (tar_pos.x >= -140 && tar_pos.x <= 230)
                this.node.setPosition(cc.v2(tar_pos.x, this_pos.y));
        }
        else if (this.scene_name == '1-2') {
            var tar_pos = this.player.getPosition();
            var this_pos = this.node.position;
            if (tar_pos.x >= 13 && tar_pos.x <= 190)
                this.node.setPosition(cc.v2(tar_pos.x, this_pos.y));
        }
        else if (this.scene_name == '1-3') {
            var tar_pos = this.player.getPosition();
            var this_pos = this.node.position;
            if (tar_pos.x >= -5 && tar_pos.x <= 955)
                this.node.setPosition(cc.v2(tar_pos.x, this_pos.y));
        }
        else if (this.scene_name == '1-4') {
            var tar_pos = this.player.getPosition();
            var this_pos = this.node.position;
            if (tar_pos.x >= 11 && tar_pos.x <= 2880)
                this.node.setPosition(cc.v2(tar_pos.x, this_pos.y));
        }
    };
    __decorate([
        property(cc.Node)
    ], cam_ch1.prototype, "player", void 0);
    cam_ch1 = __decorate([
        ccclass
    ], cam_ch1);
    return cam_ch1;
}(cc.Component));
exports.default = cam_ch1;

cc._RF.pop();