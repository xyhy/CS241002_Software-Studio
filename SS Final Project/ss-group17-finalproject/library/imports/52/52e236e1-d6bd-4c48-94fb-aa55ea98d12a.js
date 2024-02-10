"use strict";
cc._RF.push(module, '52e23bh1r1MSJT7qlXqmNEq', 'wind_barrel');
// Script/wind_barrel.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WindBarrel = /** @class */ (function (_super) {
    __extends(WindBarrel, _super);
    function WindBarrel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.effect_length = 100;
        _this.wind_force = 100;
        _this.wind_effect = null;
        _this.wind_sound = null;
        _this.player_on = false;
        _this.player_ref = null;
        _this.angle = 0;
        _this.audio_id = -1;
        return _this;
    }
    WindBarrel.prototype.update = function () {
        if (this.player_on) {
            var dist = this.player_ref.position.add(this.node.position.neg()).mag() - this.node.height / 2 - this.player_ref.height / 2;
            var f = void 0;
            var rate = void 0;
            // cc.log("dist:" + dist);
            if (dist < this.effect_length / 4)
                rate = 1.2;
            else if (dist < this.effect_length / 2)
                rate = 1;
            else if (dist < this.effect_length)
                rate = (this.effect_length - dist) / this.effect_length * 1.8 + 0.1;
            else
                rate = 0;
            // cc.log("rate:" + rate);
            f = cc.v2(Math.cos(this.angle) / 3, Math.sin(this.angle)).mul(this.wind_force * rate);
            this.player_ref.getComponent("player_boss").call_wind_floating(f, true);
        }
    };
    WindBarrel.prototype.onLoad = function () {
        var sensors = this.getComponents(cc.PhysicsBoxCollider);
        var org_sw = sensors[0].size.width;
        sensors[1].size = cc.size(org_sw, this.effect_length * 2);
        sensors[1].offset = cc.v2(0, this.node.height + this.effect_length);
        this.angle = (this.node.angle + 90) / 180 * Math.PI;
    };
    WindBarrel.prototype.start = function () {
        this.wind_effect_setting();
    };
    WindBarrel.prototype.onBeginContact = function (contact, self, other) {
        if (self.sensor && other.node.name == "player") {
            this.player_on = true;
            this.player_ref = other.node;
            this.audio_id = cc.audioEngine.playEffect(this.wind_sound, true);
        }
    };
    WindBarrel.prototype.onEndContact = function (contact, self, other) {
        if (self.sensor && other.node.name == "player") {
            this.player_on = false;
            other.node.getComponent("player_boss").call_wind_floating(cc.v2(0, 0), false);
            cc.audioEngine.stopEffect(this.audio_id);
        }
    };
    WindBarrel.prototype.wind_effect_setting = function () {
        // let delay = [0, 2, 1.4, 0.6];
        var interval = this.effect_length / 200;
        var path = cc.v2(0, this.node.height / 2 + this.effect_length);
        var move = cc.moveBy(interval, path);
        var back = cc.moveBy(0.5, path.neg());
        var back_and_forth = cc.sequence(cc.show(), move, cc.hide(), back);
        for (var i = 0; i < 8; i++) {
            var target = this.node.getChildByName("wind_effect_" + i);
            if (target == null) {
                target = cc.instantiate(this.wind_effect);
                target.name = "wind_effect_" + i;
                this.node.addChild(target);
            }
            target.runAction(cc.hide());
            target.position = cc.v2(this.node.width * (i - 3.5) / 9, this.node.height / 2);
            target.runAction(cc.repeatForever(back_and_forth));
        }
    };
    __decorate([
        property(cc.Float)
    ], WindBarrel.prototype, "effect_length", void 0);
    __decorate([
        property(cc.Float)
    ], WindBarrel.prototype, "wind_force", void 0);
    __decorate([
        property(cc.Prefab)
    ], WindBarrel.prototype, "wind_effect", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], WindBarrel.prototype, "wind_sound", void 0);
    WindBarrel = __decorate([
        ccclass
    ], WindBarrel);
    return WindBarrel;
}(cc.Component));
exports.default = WindBarrel;

cc._RF.pop();