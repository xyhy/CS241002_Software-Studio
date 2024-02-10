"use strict";
cc._RF.push(module, '11416PPQ29NmaTqEvn2J4kj', 'level3_boss');
// Script/level3_boss.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var level3_boss = /** @class */ (function (_super) {
    __extends(level3_boss, _super);
    function level3_boss() {
        // LIFE-CYCLE CALLBACKS:
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.player = null;
        _this.hurt_sound = null;
        _this.attack1_sound = null;
        _this.attack2_sound = null;
        _this.block_sound = null;
        _this.scale_check = true;
        _this.life = 5;
        _this.registered = false;
        _this.detect_cooldown = false;
        _this.registered_2 = false;
        _this.registered_3 = false;
        _this.state = -1;
        _this.attack_set = ['attack_b3', 'attack2_b3'];
        _this.check_win = false;
        return _this;
    }
    //-1: start
    //0: stop
    //1: run
    //2: attack
    //3: defence
    //4: hurt
    //5: win
    //6: lose
    level3_boss.prototype.onLoad = function () {
        cc.director.getPhysicsManager().enabled = true;
    };
    level3_boss.prototype.start = function () {
        var _this = this;
        this.anim = this.getComponent(cc.Animation);
        this.anim.on('finished', this.return_idle, this);
        this.anim.play('start_b3');
        this.schedule(function () {
            if (_this.state == 0) {
                _this.check_scale();
            }
        }, 0.5);
        this.schedule(function () {
            if (_this.state == 0) {
                _this.run_to_player();
            }
        }, 4);
        this.schedule(function () {
            if (_this.state != 5 && _this.state != 6)
                _this.check_bullet();
        }, 0.2);
    };
    level3_boss.prototype.check_bullet = function () {
        var _this = this;
        this.player.parent.children.forEach(function (child) {
            if (child.name == 'bullet') {
                if (Math.abs(child.position.x - _this.node.position.x) <= 150
                    && ((child.position.x - _this.node.position.x >= 0
                        && child.scaleX < 0) || (child.position.x - _this.node.position.x < 0 && child.scaleX > 0))
                    && Math.abs(child.position.y - _this.node.position.y) <= 50) {
                    var block_or_not = _this.random_num(11);
                    //cc.log(block_or_not+'out');
                    if (block_or_not <= 8 && !_this.detect_cooldown) {
                        //cc.log(block_or_not);
                        _this.detect_cooldown = true;
                        _this.state = 3;
                        _this.block();
                        _this.scheduleOnce(function () {
                            _this.detect_cooldown = false;
                            //cc.log('set_back');
                        }, 1);
                    }
                }
            }
        });
    };
    level3_boss.prototype.block = function () {
        var s = this.anim.play('block_b3');
        cc.audioEngine.playEffect(this.block_sound, false);
        this.node.stopAllActions();
    };
    level3_boss.prototype.random_num = function (x) {
        return Math.floor(Math.random() * x);
    };
    level3_boss.prototype.check_scale = function () {
        var now = this.player.position.x - this.node.position.x >= 0;
        if (this.scale_check != now && now == true) {
            this.scale_check = now;
            this.node.scaleX = 2.5;
            this.node.position = cc.v2(this.node.position.x + 35, this.node.position.y);
        }
        else if (this.scale_check != now && now == false) {
            this.scale_check = now;
            this.node.scaleX = -2.5;
            this.node.position = cc.v2(this.node.position.x - 35, this.node.position.y);
        }
    };
    level3_boss.prototype.run_to_player = function () {
        var _this = this;
        this.state = 1;
        var player_pos_x;
        this.check_scale();
        if (this.scale_check) {
            player_pos_x = this.player.position.x - 50;
        }
        else {
            player_pos_x = this.player.position.x + 40;
        }
        var duration = Math.abs(this.node.position.x - player_pos_x) / 200;
        this.anim.play('run_b3');
        var act1 = cc.moveTo(duration, cc.v2(player_pos_x, this.node.position.y));
        var act2 = cc.callFunc(function () {
            if (Math.abs(_this.player.position.x - player_pos_x) <= 60) {
                _this.boss_attack();
            }
            else {
                _this.return_idle();
            }
        });
        this.node.runAction(cc.sequence(act1, act2));
    };
    level3_boss.prototype.return_idle = function () {
        if (this.state != 5 && this.state != 6) {
            //this.anim.play('idle_b3');
            //this.state = 0;
            if (this.state == 3) {
                this.run_to_player();
            }
            else {
                this.anim.play('idle_b3');
                this.state = 0;
            }
        }
    };
    level3_boss.prototype.detect_player = function () {
        var dis = Math.abs(this.player.position.x - this.node.position.x);
        if (dis <= 70 && this.state == 0) {
            this.boss_attack();
        }
    };
    level3_boss.prototype.boss_attack = function () {
        var _this = this;
        this.state = 2;
        var num = this.random_num(2);
        this.anim.play(this.attack_set[num]);
        if (num == 0) {
            this.scheduleOnce(function () {
                _this.check_win = true;
                cc.audioEngine.playEffect(_this.attack1_sound, false);
            }, 0.32);
            this.scheduleOnce(function () {
                _this.check_win = false;
            }, 0.44);
            this.scheduleOnce(function () {
                _this.check_win = true;
                cc.audioEngine.playEffect(_this.attack1_sound, false);
            }, 0.62);
            this.scheduleOnce(function () {
                _this.check_win = false;
            }, 0.7);
        }
        else if (num == 1) {
            this.scheduleOnce(function () {
                _this.check_win = true;
                cc.audioEngine.playEffect(_this.attack2_sound, false);
            }, 0.55);
            this.scheduleOnce(function () {
                _this.check_win = false;
            }, 0.69);
        }
    };
    level3_boss.prototype.update = function (dt) {
        if (this.state != 5 && this.state != 6) {
            this.detect_player();
            if (this.check_win) {
                this.check_player_killed();
            }
        }
    };
    level3_boss.prototype.onBeginContact = function (contact, self, other) {
        if (other.node.name == 'player_boss') {
            contact.disabled = true;
        }
        else if (other.node.name == 'bullet') {
            if (this.state != 3 && this.state != 5 && this.state != 6) {
                //this.state = 4;
                //this.anim.pause();
                cc.audioEngine.playEffect(this.hurt_sound, false);
                if (this.life > 1) {
                    this.state = 4;
                    this.anim.play('hurt_b3');
                    this.life--;
                }
                else {
                    cc.log('lose');
                    this.state = 6;
                    this.anim.play('lose_b3');
                    this.node.stopAllActions();
                    this.scheduleOnce(function () {
                        cc.find("SceneManager").getComponent("scene_manage").go_animation("animation4");
                    }, 2);
                }
            }
        }
    };
    level3_boss.prototype.check_player_killed = function () {
        if (this.player.position.x - this.node.position.x >= 0
            && this.player.position.x - this.node.position.x <= 80
            && this.node.scaleX > 0
            && Math.abs(this.player.position.y - this.node.position.y) <= 60) {
            this.state = 5;
            this.anim.play('win_b3');
            this.player.getComponent('player_boss').dead = true;
        }
        if (this.player.position.x - this.node.position.x <= 0
            && this.player.position.x - this.node.position.x >= -80
            && this.node.scaleX < 0
            && Math.abs(this.player.position.y - this.node.position.y) <= 60) {
            this.state = 5;
            this.anim.play('win_b3');
            this.player.getComponent('player_boss').dead = true;
        }
    };
    level3_boss.prototype.onPreSolve = function (contact, self, other) {
        if (other.node.name == 'player_boss')
            contact.disabled = true;
    };
    __decorate([
        property(cc.Node)
    ], level3_boss.prototype, "player", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], level3_boss.prototype, "hurt_sound", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], level3_boss.prototype, "attack1_sound", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], level3_boss.prototype, "attack2_sound", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], level3_boss.prototype, "block_sound", void 0);
    level3_boss = __decorate([
        ccclass
    ], level3_boss);
    return level3_boss;
}(cc.Component));
exports.default = level3_boss;

cc._RF.pop();