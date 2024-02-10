(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/final.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9e3c0InOadGEpzsek2sWIfe', 'final', __filename);
// Script/final.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dialog = null;
        _this.bgm = null;
        _this.player = null;
        _this.nurse = null;
        _this.dialogue_cnt = 0;
        _this.anim_2 = false;
        _this.anim_5 = false;
        _this.stopUpdate = false;
        _this.dialogue_final = [{ role: '我', content: '嗚...這裡是...' },
            { role: '護士', content: '這裡是醫院，你被直昇機載到這裡之後已經昏睡三天了' },
            { role: '我', content: '...學姊呢？跟我一起的一個大學女生？' },
            { role: '護士', content: '很遺憾，我們到現場時他已經...' },
            { role: '我', content: '是嗎...' },
            { role: '護士', content: '（醫生，六號床的患者已經醒了...噢？她的母親？他才剛醒來，可能先不要給他太多刺激比較好...）' }];
        return _this;
    }
    default_1.prototype.onLoad = function () {
        cc.audioEngine.playMusic(this.bgm, true);
        cc.find('ending').active = false;
    };
    default_1.prototype.start = function () {
        var dialog_box = cc.instantiate(this.dialog);
        dialog_box.parent = this.node;
        dialog_box.getComponent('dialogue').init(this.dialogue_final);
        //cc.find('Canvas/dialog-cover').on(cc.Node.EventType.MOUSE_DOWN, this.changeDialog, this);
        this.nurse.runAction(cc.sequence(cc.fadeIn(0.3), cc.moveBy(0.6, -100, -40), cc.moveBy(1.1, -160, 0)));
        this.nurse.getComponent(cc.Animation).play('nurse_walk');
        this.scheduleOnce(function () {
            this.nurse.getComponent(cc.Animation).stop();
        }, 2);
    };
    default_1.prototype.update = function (dt) {
        if (this.stopUpdate)
            return;
        if (this.node.getComponentInChildren('dialogue').textIndex == 2) {
            if (!this.anim_2) {
                this.player.runAction(cc.moveBy(0.4, 100, 0));
                this.player.getComponent(cc.Animation).play('playerb_run');
                this.scheduleOnce(function () {
                    this.player.getComponent(cc.Animation).stop();
                    this.player.getComponent(cc.Animation).play('playerb_idle');
                }, 0.4);
            }
            this.anim_2 = true;
        }
        if (this.node.getComponentInChildren('dialogue').textIndex == 5) {
            if (!this.anim_5) {
                this.nurse.scaleX = -3.2;
                this.nurse.runAction(cc.sequence(cc.moveBy(1.1, 160, 0), cc.moveBy(0.6, 100, 40)));
                this.nurse.getComponent(cc.Animation).play('nurse_walk');
                this.scheduleOnce(function () {
                    this.nurse.runAction(cc.fadeOut(0.2));
                }, 1.8);
            }
            this.anim_5 = true;
        }
        if (this.node.getComponentInChildren('dialogue').isEnd) {
            cc.log('end');
            this.scheduleOnce(function () {
                this.node.runAction(cc.fadeOut(0.2));
            }, 1);
            this.scheduleOnce(function () {
                cc.find('ending').active = true;
                cc.find('ending').runAction(cc.fadeIn(0.5));
            }, 1.2);
            this.scheduleOnce(function () {
                cc.find("SceneManager").getComponent("scene_manage").change_scene("chapter select", "fade");
            }, 6);
            this.node.getComponentInChildren('dialogue').isEnd = false;
            this.stopUpdate = true;
        }
    };
    __decorate([
        property(cc.Prefab)
    ], default_1.prototype, "dialog", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], default_1.prototype, "bgm", void 0);
    __decorate([
        property(cc.Node)
    ], default_1.prototype, "player", void 0);
    __decorate([
        property(cc.Node)
    ], default_1.prototype, "nurse", void 0);
    default_1 = __decorate([
        ccclass
    ], default_1);
    return default_1;
}(cc.Component));
exports.default = default_1;

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
        //# sourceMappingURL=final.js.map
        