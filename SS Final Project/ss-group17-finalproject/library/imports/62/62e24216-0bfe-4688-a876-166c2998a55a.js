"use strict";
cc._RF.push(module, '62e24IWC/5GiKh2FmwpmKVa', 'button_object');
// Script/button_object.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.class_name = '';
        _this.click_sound = null;
        _this.pressed = false;
        return _this;
    }
    NewClass.prototype.start = function () {
        this.reset();
    };
    NewClass.prototype.reset = function () {
        this.node.getComponent(cc.Animation).play("button_unpressed");
        this.pressed = false;
    };
    NewClass.prototype.onBeginContact = function (contact, self, other) {
        if (!this.pressed && (other.node.name == "player" || other.node.name == "bullet")) {
            this.node.parent.getComponent(this.class_name).button_pressed();
            this.pressed = true;
            this.node.getComponent(cc.Animation).play("button_pressed");
            cc.audioEngine.playEffect(this.click_sound, false);
        }
    };
    __decorate([
        property(cc.String)
    ], NewClass.prototype, "class_name", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], NewClass.prototype, "click_sound", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();