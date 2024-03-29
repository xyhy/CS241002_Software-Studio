(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/win_tube.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '81addOTZdZKoZyOaGjpGTC+', 'win_tube', __filename);
// Script/win_tube.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WinTube = /** @class */ (function (_super) {
    __extends(WinTube, _super);
    function WinTube() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.next_level = "";
        _this.transition_type = "from_right";
        return _this;
    }
    WinTube.prototype.onBeginContact = function (contact, self, other) {
        if (other.node.name == "player") {
            cc.find("SceneManager").getComponent("scene_manage").go_next_level(this.next_level, this.transition_type);
        }
    };
    __decorate([
        property(cc.String)
    ], WinTube.prototype, "next_level", void 0);
    __decorate([
        property(cc.String)
    ], WinTube.prototype, "transition_type", void 0);
    WinTube = __decorate([
        ccclass
    ], WinTube);
    return WinTube;
}(cc.Component));
exports.default = WinTube;

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
        //# sourceMappingURL=win_tube.js.map
        