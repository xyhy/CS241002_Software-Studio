(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/cam2_4.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bd237TJ8URDBpq+2KuV3TuU', 'cam2_4', __filename);
// Script/cam2_4.ts

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
        if (tar_pos.y >= 35 && tar_pos.y <= 2500)
            this.node.setPosition(cc.v2(this_pos.x, tar_pos.y));
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
        //# sourceMappingURL=cam2_4.js.map
        