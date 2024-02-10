"use strict";
cc._RF.push(module, '9b316ke3CBDnYJN38nvpRbh', 'title');
// Script/title.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgm = null;
        _this.buzzSound = null;
        _this.animator = null;
        _this.animateState = null;
        return _this;
    }
    NewClass.prototype.onLoad = function () {
        cc.audioEngine.playMusic(this.bgm, true);
        this.animator = this.getComponent(cc.Animation);
        this.schedule(this.glitch, 3);
    };
    NewClass.prototype.start = function () {
        // Keydown event trigger
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    };
    NewClass.prototype.onDestroy = function () {
        cc.audioEngine.stopMusic();
        this.unschedule(this.glitch);
    };
    NewClass.prototype.glitch = function () {
        this.animateState = this.animator.play('title_glitch');
        cc.audioEngine.playEffect(this.buzzSound, false);
    };
    NewClass.prototype.onKeyDown = function (event) {
        cc.find("SceneManager").getComponent("scene_manage").change_scene("chapter select", "fade");
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], NewClass.prototype, "bgm", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], NewClass.prototype, "buzzSound", void 0);
    __decorate([
        property({ type: cc.Animation })
    ], NewClass.prototype, "animator", void 0);
    __decorate([
        property({ type: cc.AnimationState })
    ], NewClass.prototype, "animateState", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();