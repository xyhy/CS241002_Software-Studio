"use strict";
cc._RF.push(module, '5d5bbmgnSJLrqogbOgsacbz', 'spring');
// Script/spring.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Spring = /** @class */ (function (_super) {
    __extends(Spring, _super);
    function Spring() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.is_vertical = true;
        _this.jump_force = 20;
        _this.spring_jump_sound = null;
        _this.time_buffer = false;
        return _this;
    }
    Spring.prototype.onBeginContact = function (contact, self, other) {
        var _this = this;
        if (other.node.name == "player" && !this.time_buffer) {
            // cc.log("("+contact.getWorldManifold().normal.x + "," + contact.getWorldManifold().normal.y + ")");
            var other_pos = other.node.position;
            var my_pos = this.node.position;
            if (this.is_vertical && (other_pos.y > my_pos.y + this.node.height / 2 || other_pos.y < my_pos.y - this.node.height / 2)) {
                var dir = (other_pos.y > my_pos.y) ? 1 : -1;
                other.node.getComponent("player_boss").call_spring_jump(cc.v2(0, this.jump_force * dir));
                this.node.getComponent(cc.Animation).play("spring_dwai");
                cc.audioEngine.playEffect(this.spring_jump_sound, false);
                this.time_buffer = true;
                this.scheduleOnce(function () { _this.time_buffer = false; }, 0.1);
            }
            else if (!this.is_vertical && (other_pos.x > my_pos.x + this.node.width / 2 || other_pos.x < my_pos.x - this.node.width / 2)) {
                var dir = (other_pos.x > my_pos.x) ? 1 : -1;
                other.node.getComponent("player_boss").call_spring_jump(cc.v2(this.jump_force * dir / 2, this.jump_force));
                this.node.getComponent(cc.Animation).play("spring_dwai");
                cc.audioEngine.playEffect(this.spring_jump_sound, false);
                this.time_buffer = true;
                this.scheduleOnce(function () { _this.time_buffer = false; }, 0.1);
            }
            else {
                // cc.log("hit middle of spring");
            }
        }
    };
    __decorate([
        property(cc.Boolean)
    ], Spring.prototype, "is_vertical", void 0);
    __decorate([
        property(cc.Integer)
    ], Spring.prototype, "jump_force", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Spring.prototype, "spring_jump_sound", void 0);
    Spring = __decorate([
        ccclass
    ], Spring);
    return Spring;
}(cc.Component));
exports.default = Spring;

cc._RF.pop();