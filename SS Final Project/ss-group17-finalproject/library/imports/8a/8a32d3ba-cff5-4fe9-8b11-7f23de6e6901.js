"use strict";
cc._RF.push(module, '8a32dO6z/VP6YsRfyPebmkB', 'moving_platform');
// Script/moving_platform.ts

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MovingPlatform = /** @class */ (function (_super) {
    __extends(MovingPlatform, _super);
    function MovingPlatform() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.start_position = cc.v2(0, 0);
        _this.end_position = cc.v2(0, 0);
        _this.period = 2;
        _this.automatic = true;
        _this.is_moving = false;
        return _this;
    }
    MovingPlatform.prototype.start = function () {
        this.node.position = this.start_position;
        this.is_moving = false;
        if (this.automatic)
            this.run_moving_action();
    };
    MovingPlatform.prototype.run_moving_action = function () {
        var go_act = cc.moveTo(this.period / 2, this.end_position);
        var back_act = cc.moveTo(this.period / 2, this.start_position);
        go_act.easing(cc.easeQuinticActionInOut());
        back_act.easing(cc.easeQuinticActionInOut());
        this.node.runAction(cc.repeatForever(cc.sequence(go_act, back_act)));
        this.is_moving = true;
    };
    MovingPlatform.prototype.onBeginContact = function (contact, self, other) {
        if (!this.is_moving && other.node.name == "player") {
            this.run_moving_action();
        }
    };
    __decorate([
        property(cc.Vec2)
    ], MovingPlatform.prototype, "start_position", void 0);
    __decorate([
        property(cc.Vec2)
    ], MovingPlatform.prototype, "end_position", void 0);
    __decorate([
        property(cc.Integer)
    ], MovingPlatform.prototype, "period", void 0);
    __decorate([
        property(cc.Boolean)
    ], MovingPlatform.prototype, "automatic", void 0);
    MovingPlatform = __decorate([
        ccclass
    ], MovingPlatform);
    return MovingPlatform;
}(cc.Component));
exports.default = MovingPlatform;

cc._RF.pop();