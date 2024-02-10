"use strict";
cc._RF.push(module, 'e46dfok/FNMy6IkGSzG00sM', 'timer');
// Script/timer.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ticktock = null;
        _this.player = null;
        _this.time = 10;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () { };
    NewClass.prototype.start = function () {
        this.schedule(function () {
            this.node.getComponent(cc.Label).string = this.time;
            this.time -= 1;
            cc.audioEngine.playEffect(this.ticktock, false);
        }, 1, 300, 0.5);
    };
    NewClass.prototype.update = function (dt) {
        if (this.time == -1) {
            this.player.getComponent("player_boss").dead = true;
        }
        if (this.player.getComponent("player_boss").dead) {
            this.unscheduleAllCallbacks();
        }
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], NewClass.prototype, "ticktock", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "player", void 0);
    __decorate([
        property()
    ], NewClass.prototype, "time", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();