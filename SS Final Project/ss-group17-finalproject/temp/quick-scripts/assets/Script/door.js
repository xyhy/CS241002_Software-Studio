(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/door.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '80dd1oJPmJJE6MbhaE8tNG+', 'door', __filename);
// Script/door.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Door = /** @class */ (function (_super) {
    __extends(Door, _super);
    function Door() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.duration = 2;
        _this.gate_open_sound = null;
        _this.button_number = 1;
        _this.is_opened = false;
        _this.mask = null;
        _this.body = null;
        _this.button = null;
        return _this;
        // update (dt) {}
    }
    Door.prototype.onLoad = function () {
        this.mask = this.node.getChildByName("mask");
        this.body = this.mask.getChildByName("body");
        this.button = this.node.getChildByName("button");
        this.mask.setContentSize(this.body.getContentSize());
        this.reset();
    };
    Door.prototype.reset = function () {
        this.is_opened = false;
        this.body.position = cc.v2(0, 0);
        if (this.body.getComponent(cc.PhysicsBoxCollider) == null) {
            this.body.addComponent(cc.PhysicsBoxCollider);
            this.body.getComponent(cc.PhysicsBoxCollider).size = this.body.getContentSize();
            this.body.getComponent(cc.PhysicsBoxCollider).offset = cc.v2(0, 0);
        }
        this.unscheduleAllCallbacks();
        this.button.getComponent("button_object").reset();
    };
    Door.prototype.button_pressed = function () {
        if (!this.is_opened) {
            this.button_number--;
            if (this.button_number == 0) {
                this.is_opened = true;
                this.body.runAction(cc.moveBy(this.duration, 0, this.body.height));
                this.body.removeComponent(cc.PhysicsBoxCollider);
                cc.audioEngine.playEffect(this.gate_open_sound, false);
            }
        }
    };
    __decorate([
        property(cc.Float)
    ], Door.prototype, "duration", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Door.prototype, "gate_open_sound", void 0);
    __decorate([
        property(cc.Integer)
    ], Door.prototype, "button_number", void 0);
    Door = __decorate([
        ccclass
    ], Door);
    return Door;
}(cc.Component));
exports.default = Door;

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
        //# sourceMappingURL=door.js.map
        