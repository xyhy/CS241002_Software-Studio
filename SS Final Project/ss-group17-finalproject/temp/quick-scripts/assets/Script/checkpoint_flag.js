(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/checkpoint_flag.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c14aecmhdVCiJDhmZObzrlW', 'checkpoint_flag', __filename);
// Script/checkpoint_flag.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.is_checked = false;
        _this.check_sound = null;
        return _this;
    }
    NewClass.prototype.start = function () {
        if (this.is_checked)
            this.node.getComponent(cc.Animation).play("flag_green_floating");
        else
            this.node.getComponent(cc.Animation).play("flag_floating");
    };
    NewClass.prototype.onBeginContact = function (contact, self, other) {
        if (!this.is_checked && other.node.name == "player") {
            this.is_checked = true;
            this.node.getComponent(cc.Animation).play("flag_green_floating");
            cc.audioEngine.playEffect(this.check_sound, false);
            // cc.find("GameManager").getComponent("game_manage").checkpoint_update();
            cc.log("checkpoint_update!");
        }
    };
    __decorate([
        property(cc.Boolean)
    ], NewClass.prototype, "is_checked", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], NewClass.prototype, "check_sound", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

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
        //# sourceMappingURL=checkpoint_flag.js.map
        