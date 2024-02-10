(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/level2_boss.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '32b1elld3xNs4ykihW7mMR/', 'level2_boss', __filename);
// Script/level2_boss.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var level2_boss = /** @class */ (function (_super) {
    __extends(level2_boss, _super);
    function level2_boss() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.player = null;
        _this.shadow = null;
        _this.hurt_sound = null;
        _this.dis_sound = null;
        _this.life = 5;
        //-290, 230
        //80, 230
        //200, 25
        //-205, 55
        //-50, -35
        //-200, -165
        //90, -130
        _this.pos_set = [cc.v2(-290, 320), cc.v2(80, 325), cc.v2(200, 120),
            cc.v2(-205, 150), cc.v2(-50, 55),
            cc.v2(-200, -40), cc.v2(90, -35)];
        _this.state = 0;
        //0: not moving
        //1: playing moving anim
        //2: hit
        //3: dead
        //4: win
        _this.is_registered = false;
        _this.is_registered2 = false;
        _this.player_cooldown = false;
        _this.detect_cooldown = false;
        return _this;
    }
    level2_boss.prototype.start = function () {
        var _this = this;
        this.anim = this.getComponent(cc.Animation);
        this.anim.on('finished', this.set_anim, this);
        cc.director.getPhysicsManager().enabled = true;
        this.schedule(function () {
            if (_this.state != 3 && _this.state != 4)
                _this.check_bullet();
        }, 0.2);
    };
    level2_boss.prototype.set_anim = function () {
        if (this.state != 3 && this.state != 4) {
            if (this.state == 2) {
                if (this.life > 0) {
                    this.state = 0;
                    this.set_move_anim();
                }
                else {
                    this.state = 3;
                    this.scheduleOnce(function () {
                        cc.find("SceneManager").getComponent("scene_manage").go_animation("animation3");
                    }, 2);
                }
                return;
            }
            this.state = 0;
        }
    };
    level2_boss.prototype.random_num = function (x) {
        return Math.floor(Math.random() * x);
    };
    level2_boss.prototype.check_bullet = function () {
        var _this = this;
        this.player.parent.children.forEach(function (child_node) {
            if (child_node.name == 'bullet') {
                if (Math.abs(child_node.position.x - _this.node.position.x) <= 80
                    && ((child_node.position.x - _this.node.position.x >= 0
                        && child_node.scaleX < 0) || (child_node.position.x - _this.node.position.x < 0 && child_node.scaleX > 0))
                    && Math.abs(child_node.position.y - _this.node.position.y) <= 50) {
                    var move_or_not = _this.random_num(11);
                    //cc.log(move_or_not+'out');
                    if (move_or_not <= 7 && !_this.detect_cooldown) {
                        //cc.log(move_or_not);
                        _this.detect_cooldown = true;
                        if (_this.state == 0) {
                            _this.set_move_anim();
                        }
                        //this.set_move_anim();
                        //this.move_pos();
                        _this.scheduleOnce(function () {
                            _this.detect_cooldown = false;
                            //cc.log('set_back');
                        }, 1);
                    }
                }
            }
        });
    };
    level2_boss.prototype.check_player = function () {
        var _this = this;
        if (Math.abs(this.player.position.x - this.node.position.x) <= 100
            && Math.abs(this.player.position.y - this.node.position.y) <= 50) {
            if (!this.player_cooldown) {
                this.player_cooldown = true;
                if (this.state == 0) {
                    this.set_move_anim();
                }
                this.scheduleOnce(function () {
                    _this.player_cooldown = false;
                    //cc.log('set_back');
                }, 1);
            }
        }
    };
    level2_boss.prototype.set_move_anim = function () {
        this.state = 1;
        cc.audioEngine.playEffect(this.dis_sound, false);
        //var s = this.anim.play('vanish_b2');
        this.shadow.position = this.node.position;
        this.move_pos();
        var s = this.anim.play('show_b2');
        this.shadow.getComponent(cc.Animation).play();
    };
    level2_boss.prototype.move_pos = function () {
        var new_pos = this.random_num(7);
        this.node.position = this.pos_set[new_pos];
    };
    level2_boss.prototype.check_scale = function () {
        if (this.player.position.x - this.node.position.x >= 0) {
            this.node.scaleX = 1.5;
        }
        else {
            this.node.scaleX = -1.5;
        }
    };
    level2_boss.prototype.onBeginContact = function (contact, self, other) {
        if (other.node.name == 'player_boss') {
            contact.disabled = true;
        }
        else if (other.node.name == 'bullet' && this.state != 3 && this.state != 4) {
            //cc.log('boss hit');
            this.anim.play('hurt_b2');
            cc.audioEngine.playEffect(this.hurt_sound, false);
            this.state = 2;
            this.life--;
            cc.log(this.life);
        }
    };
    level2_boss.prototype.onPreSolve = function (contact, self, other) {
        if (other.node.name == 'player_boss')
            contact.disabled = true;
    };
    level2_boss.prototype.animation_check = function () {
        if (this.state == 0 && !this.anim.getAnimationState('idle_b2').isPlaying) {
            this.anim.play('idle_b2');
        }
    };
    level2_boss.prototype.update = function (dt) {
        //this.check_bullet();
        if (this.state != 3 && this.state != 4) {
            this.check_scale();
            this.animation_check();
            this.check_player();
        }
    };
    __decorate([
        property(cc.Node)
    ], level2_boss.prototype, "player", void 0);
    __decorate([
        property(cc.Node)
    ], level2_boss.prototype, "shadow", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], level2_boss.prototype, "hurt_sound", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], level2_boss.prototype, "dis_sound", void 0);
    level2_boss = __decorate([
        ccclass
    ], level2_boss);
    return level2_boss;
}(cc.Component));
exports.default = level2_boss;

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
        //# sourceMappingURL=level2_boss.js.map
        