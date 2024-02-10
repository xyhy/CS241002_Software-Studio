"use strict";
cc._RF.push(module, 'ba91fjIOZhKv4vDxaHZ0IK6', 'strawberry');
// Script/strawberry.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Strawberry = /** @class */ (function (_super) {
    __extends(Strawberry, _super);
    function Strawberry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.eaten = null;
        _this.fresh = null;
        _this.is_eaten = false;
        _this.eat_sound = null;
        _this.vanish_particle = null;
        _this.is_hiding = false;
        return _this;
    }
    Strawberry.prototype.start = function () {
        this.is_eaten = cc.find("SceneManager").getComponent("scene_manage").get_strawberry_state();
        this.reset();
        this.object_floating();
    };
    // update (dt) {}
    Strawberry.prototype.reset = function () {
        if (this.is_eaten)
            this.node.getComponent(cc.Sprite).spriteFrame = this.eaten;
        else
            this.node.getComponent(cc.Sprite).spriteFrame = this.fresh;
        this.is_hiding = false;
        this.node.runAction(cc.show());
    };
    Strawberry.prototype.onBeginContact = function (contact, self, other) {
        if (!this.is_hiding && other.node.name == "player") {
            this.is_hiding = true;
            this.node.runAction(cc.hide());
            cc.audioEngine.playEffect(this.eat_sound, false);
            this.create_vanish_particle();
            if (!this.is_eaten)
                cc.find("SceneManager").getComponent("scene_manage").update_strawberry_state();
        }
    };
    Strawberry.prototype.object_floating = function () {
        var a = cc.moveBy(1.5, cc.v2(0, 5));
        var b = cc.moveBy(1.5, cc.v2(0, -5));
        a.easing(cc.easeCubicActionInOut());
        b.easing(cc.easeCubicActionInOut());
        this.node.runAction(cc.repeatForever(cc.sequence(a, b)));
    };
    Strawberry.prototype.create_vanish_particle = function () {
        var p = cc.instantiate(this.vanish_particle);
        p.position = this.node.position;
        this.node.parent.addChild(p);
    };
    __decorate([
        property({ type: cc.SpriteFrame })
    ], Strawberry.prototype, "eaten", void 0);
    __decorate([
        property({ type: cc.SpriteFrame })
    ], Strawberry.prototype, "fresh", void 0);
    __decorate([
        property(cc.Boolean)
    ], Strawberry.prototype, "is_eaten", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Strawberry.prototype, "eat_sound", void 0);
    __decorate([
        property(cc.Prefab)
    ], Strawberry.prototype, "vanish_particle", void 0);
    Strawberry = __decorate([
        ccclass
    ], Strawberry);
    return Strawberry;
}(cc.Component));
exports.default = Strawberry;

cc._RF.pop();