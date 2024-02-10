(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/level1_boss.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bf607B3P81KmJmJ9mjjo44j', 'level1_boss', __filename);
// Script/level1_boss.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var level1_boss = /** @class */ (function (_super) {
    __extends(level1_boss, _super);
    function level1_boss() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ball = null;
        _this.summon_effect = null;
        _this.thunder = null;
        _this.thunder_sound = null;
        _this.hurt_sound = null;
        _this.anim = null;
        _this.attack = false;
        _this.life = 3;
        _this.dead = false;
        _this.win = false;
        return _this;
    }
    //public summon = null;
    level1_boss.prototype.start = function () {
        this.set_attack();
        //this.scheduleOnce(()=>{this.get_thunder();}, 2);
    };
    level1_boss.prototype.set_attack = function () {
        var _this = this;
        this.anim = this.getComponent(cc.Animation);
        this.anim.on('finished', this.set_anim, this);
        this.attack = true;
        this.anim.play('attack');
        this.get_thunder();
        this.summon_effect.getComponent(cc.Animation).play('summon');
        this.schedule(function () {
            if (!_this.anim.getAnimationState('attack').isPlaying && !_this.dead) {
                _this.anim.play('attack');
                _this.attack = true;
                _this.get_thunder();
                _this.summon_effect.getComponent(cc.Animation).play('summon');
            }
        }, 15);
    };
    level1_boss.prototype.set_anim = function () {
        if (this.attack) {
            this.gen_lavaball();
            this.attack = false;
        }
        if (!this.anim.getAnimationState('idle').isPlaying && !this.dead)
            this.anim.play('idle');
    };
    level1_boss.prototype.get_thunder = function () {
        var _this = this;
        var act1 = cc.fadeOut(0.2);
        var act2 = cc.callFunc(function () { _this.thunder.opacity = 255; });
        var act3 = cc.fadeOut(1);
        cc.audioEngine.playEffect(this.thunder_sound, false);
        this.thunder.opacity = 255;
        this.thunder.runAction(cc.sequence(act1, act2, act3));
    };
    level1_boss.prototype.gen_lavaball = function () {
        for (var i = 0; i < 10; i++) {
            var new_ball = cc.instantiate(this.ball);
            new_ball.parent = cc.find('All Nodes/Canvas').parent;
        }
    };
    level1_boss.prototype.update = function (dt) {
        this.summon_effect.position = this.node.position;
    };
    level1_boss.prototype.onBeginContact = function (contact, self, other) {
        if (other.node.name == 'player') {
            contact.disabled = true;
        }
        else if (other.node.name == 'bullet') {
            cc.log('boss hit');
            //this.anim.play('damage');
            cc.audioEngine.playEffect(this.hurt_sound, false);
            if (this.life > 1) {
                this.life--;
                this.anim.play('damage');
            }
            else {
                if (!this.dead && !this.win) {
                    this.anim.play('dead_b1');
                    this.dead = true;
                    this.scheduleOnce(function () {
                        cc.find("SceneManager").getComponent("scene_manage").go_animation("animation1");
                    }, 2);
                }
            }
        }
    };
    __decorate([
        property(cc.Prefab)
    ], level1_boss.prototype, "ball", void 0);
    __decorate([
        property(cc.Node)
    ], level1_boss.prototype, "summon_effect", void 0);
    __decorate([
        property(cc.Node)
    ], level1_boss.prototype, "thunder", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], level1_boss.prototype, "thunder_sound", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], level1_boss.prototype, "hurt_sound", void 0);
    level1_boss = __decorate([
        ccclass
    ], level1_boss);
    return level1_boss;
}(cc.Component));
exports.default = level1_boss;

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
        //# sourceMappingURL=level1_boss.js.map
        