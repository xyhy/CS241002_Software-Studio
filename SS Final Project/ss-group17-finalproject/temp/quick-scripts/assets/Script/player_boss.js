(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/player_boss.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3bfa5zAC/VKkKF9Hk67IpBC', 'player_boss', __filename);
// Script/player_boss.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var player_boss = /** @class */ (function (_super) {
    __extends(player_boss, _super);
    function player_boss() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.walk_sound = null;
        _this.jump_sound = null;
        _this.hang_sound = null;
        _this.shoot_sound = null;
        _this.onground_sound = null;
        _this.death_sound = null;
        _this.maxSpeedX = 0;
        _this.maxSpeedY = 900;
        _this.dashSpeed = 60;
        _this.upA = 0;
        _this.downA = 0;
        _this.jump_speed = 900;
        _this.bulletPrefab = null;
        _this._currentSpeedX = 0;
        //private _currentSpeedY: number = 0;
        _this.player_score = 50000;
        _this.up = false;
        _this.shoot = false;
        _this.left = 0;
        _this.right = 0;
        _this.dead = false;
        _this.onGround = false;
        _this.onGroundSound = false;
        _this.airshoot = false;
        _this.rebornPosition = cc.v2();
        _this.spring_jumping = false;
        _this.spring_force = cc.v2();
        _this.wind_floating = false;
        _this.wind_force = cc.v2();
        _this.is_falling = false;
        _this.hanging = false;
        _this.play_hang = false;
        return _this;
    }
    player_boss.prototype.onload = function () {
        //this.anim = this.getComponent(cc.Animation);
    };
    player_boss.prototype.start = function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.rebornPosition = this.node.position;
        this.anim = this.getComponent(cc.Animation);
    };
    player_boss.prototype.update = function (dt) {
        if (this.dead) {
            this.player_dead();
        }
        else {
            this.playermoveX();
            this.playermoveY();
            this.object_effect();
            this.playerAnimation();
            this.hang_pos();
            //this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this._currentSpeedX, this._currentSpeedY);
            this.node.x += this._currentSpeedX;
        }
    };
    player_boss.prototype.hang_pos = function () {
        if (this.hanging) {
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
        }
    };
    player_boss.prototype.onKeyDown = function (event) {
        if (event.keyCode == cc.macro.KEY.left) {
            if (this.hanging && this.node.scaleX > 0) {
                this.hanging = false;
            }
            this.left = 1;
            this.right = 0;
            /*
            if(this.right==1 || this.right==2) this.right = 2;
            else this.right = 0;
*/
        }
        if (event.keyCode == cc.macro.KEY.right) {
            if (this.hanging && this.node.scaleX < 0) {
                this.hanging = false;
            }
            this.right = 1;
            this.left = 0;
            /*
            if(this.left==1 || this.left==2) this.left = 2;
            else this.left = 0;
*/
        }
        if (event.keyCode == cc.macro.KEY.enter) {
            this.shoot = true;
            this.createBullet();
        }
        if (event.keyCode == cc.macro.KEY.space) {
            this.up = true;
        }
    };
    player_boss.prototype.onKeyUp = function (event) {
        if (event.keyCode == cc.macro.KEY.right) {
            this.right = 0;
            //this.right = 0;
            //if(this.left==2) this.left=1;
        }
        if (event.keyCode == cc.macro.KEY.left) {
            this.left = 0;
            //this.left = 0;
            //if(this.right==2) this.right=1;
        }
        if (event.keyCode == cc.macro.KEY.enter) {
            this.shoot = false;
        }
        if (event.keyCode == cc.macro.KEY.space) {
            this.up = false;
        }
    };
    player_boss.prototype.playermoveX = function () {
        if (this.left == 1 && !this.hanging) {
            //this._currentSpeedX -= this.upA;
            if (this._currentSpeedX <= -this.maxSpeedX) {
                this._currentSpeedX = -this.maxSpeedX;
            }
            else {
                this._currentSpeedX -= this.upA;
            }
        }
        else if (this.right == 1 && !this.hanging) {
            //this._currentSpeedX += this.upA;
            if (this._currentSpeedX >= this.maxSpeedX) {
                this._currentSpeedX = this.maxSpeedX;
            }
            else {
                this._currentSpeedX += this.upA;
            }
        }
        else {
            if (this._currentSpeedX != 0) {
                if (this._currentSpeedX > 0 && this._currentSpeedX > this.downA) {
                    this._currentSpeedX -= this.downA;
                }
                else if (this._currentSpeedX > 0 && this._currentSpeedX <= this.downA) {
                    this._currentSpeedX = 0;
                }
                else if (this._currentSpeedX < 0 && this._currentSpeedX < -this.downA) {
                    this._currentSpeedX += this.downA;
                }
                else if (this._currentSpeedX < 0 && this._currentSpeedX >= -this.downA) {
                    this._currentSpeedX = 0;
                }
            }
        }
    };
    player_boss.prototype.playermoveY = function () {
        this.playerfall();
        if ((this.up && this.onGround) || (this.up && this.hanging)) {
            this.jump();
        }
    };
    player_boss.prototype.playerAnimation = function () {
        this.node.scaleX = (this.left) ? -1.5 : (this.right) ? 1.5 : this.node.scaleX;
        if (this.hanging) {
            if (!this.anim.getAnimationState('playerb_hang').isPlaying && this.play_hang) {
                this.hang();
            }
            //this.anim.play('hang');
        }
        else if (this.up || !this.onGround) {
            if (!this.anim.getAnimationState('playerb_jump').isPlaying)
                this.anim.play('playerb_jump');
        }
        else if (this.left || this.right) {
            if (!this.anim.getAnimationState('playerb_run').isPlaying)
                this.anim.play('playerb_run');
        }
        else {
            if (!this.anim.getAnimationState('playerb_idle').isPlaying)
                this.anim.play('playerb_idle');
        }
    };
    player_boss.prototype.hang = function () {
        var _this = this;
        cc.audioEngine.playEffect(this.hang_sound, false);
        var s = this.anim.play('playerb_hang');
        s.on('finished', function () {
            _this.play_hang = false;
        }, this);
        //this.play_hang = false;
    };
    player_boss.prototype.dash = function () {
        var move = null;
        if (this.node.scaleX > 0) {
            move = cc.moveBy(0.1, -1 * this.dashSpeed, 0);
        }
        else {
            move = cc.moveBy(0.1, this.dashSpeed, 0);
        }
        this.node.runAction(move);
    };
    player_boss.prototype.playerfall = function () {
        var origin_x = this.getComponent(cc.RigidBody).linearVelocity.x;
        var origin_y = this.getComponent(cc.RigidBody).linearVelocity.y;
        if (!this.onGround && origin_y <= 0)
            this.is_falling = true;
        if (!this.onGround && origin_y >= this.maxSpeedY) {
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(origin_x, this.maxSpeedY);
        }
        /*if(!this.onGround){
            this._currentSpeedY -= this.G;
            if(this._currentSpeedY <= this.maxSpeedY){
                this._currentSpeedY = this._currentSpeedY;
            }
        }else{
            this._currentSpeedY = 0;
        }*/
    };
    player_boss.prototype.jump = function () {
        this.onGroundSound = false;
        cc.audioEngine.playEffect(this.jump_sound, false);
        if (this.hanging) {
            var scale_x = this.node.scaleX > 0 ? -1 : 1;
            this.hanging = false;
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(scale_x * 100, this.jump_speed);
            //this.node.scaleX = scale_x*1.5;
        }
        else {
            this.onGround = false;
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, this.jump_speed);
        }
    };
    player_boss.prototype.reborn = function () {
        if (this.dead) {
            this._currentSpeedX = 0;
            //this._currentSpeedY = 0;
            this.node.position = this.rebornPosition;
        }
    };
    player_boss.prototype.createBullet = function () {
        if (this.onGround) {
            cc.audioEngine.playEffect(this.shoot_sound, false);
            var bullet = cc.instantiate(this.bulletPrefab);
            bullet.getComponent('bullet').init(this.node);
            this.dash();
            this.airshoot = false;
        }
        else {
            if (this.airshoot) {
            }
            else {
                cc.audioEngine.playEffect(this.shoot_sound, false);
                var bullet = cc.instantiate(this.bulletPrefab);
                bullet.getComponent('bullet').init(this.node);
                this.dash();
                this.airshoot = true;
            }
        }
    };
    player_boss.prototype.onBeginContact = function (contact, self, other) {
        if (other.tag == 1) {
            var colli = contact.getWorldManifold().normal.x;
            var colli_y = contact.getWorldManifold().normal.y;
            cc.log(colli);
            if ((colli > 0 && this.node.scaleX > 0 && colli_y == 0 && !this.onGround) || (colli < 0 && this.node.scaleX < 0 && colli_y == 0 && !this.onGround)) {
                this.hanging = true;
                this.play_hang = true;
                //this.hang();
            }
            else {
                this.hanging = false;
                this.is_falling = false;
                this.onGround = true;
                if (colli_y == -1 && !this.onGroundSound) {
                    cc.audioEngine.playEffect(this.onground_sound, false);
                    this.onGroundSound = true;
                }
            }
            this.airshoot = false;
        }
        else if (other.tag == 2 || other.tag == 3) {
            this.dead = true;
            //this.reborn();
        }
    };
    player_boss.prototype.onEndContact = function (contact, self, other) {
        if (other.tag == 1) {
            this.onGround = false;
            this.hanging = false;
        }
    };
    player_boss.prototype.regain = function () {
        this.airshoot = false;
    };
    player_boss.prototype.call_spring_jump = function (f) {
        this.spring_jumping = true;
        this.spring_force = f;
    };
    player_boss.prototype.call_wind_floating = function (f, wind_switch) {
        this.wind_floating = wind_switch;
        if (wind_switch)
            this.wind_force = f;
    };
    player_boss.prototype.object_effect = function () {
        var origin_v = this.node.getComponent(cc.RigidBody).linearVelocity;
        if (this.spring_jumping) {
            this.spring_jumping = false;
            this._currentSpeedX = this.spring_force.x / 30;
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(origin_v.x, this.spring_force.y / 2);
            this.airshoot = false;
        }
        if (this.wind_floating) {
            this.node.getComponent(cc.RigidBody).linearVelocity = origin_v.add(this.wind_force);
            // cc.log("winding: " + this.wind_force.y);
            this.wind_floating = false;
        }
    };
    player_boss.prototype.player_dead = function () {
        var _this = this;
        if (!this.anim.getAnimationState('playerb_dead').isPlaying) {
            cc.audioEngine.playEffect(this.death_sound, false);
            var s = this.anim.play('playerb_dead');
            s.on('finished', function () {
                _this.node.active = false;
                cc.find("SceneManager").getComponent("scene_manage").die_reload();
            }, this);
        }
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], player_boss.prototype, "walk_sound", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], player_boss.prototype, "jump_sound", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], player_boss.prototype, "hang_sound", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], player_boss.prototype, "shoot_sound", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], player_boss.prototype, "onground_sound", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], player_boss.prototype, "death_sound", void 0);
    __decorate([
        property()
    ], player_boss.prototype, "maxSpeedX", void 0);
    __decorate([
        property()
    ], player_boss.prototype, "maxSpeedY", void 0);
    __decorate([
        property()
    ], player_boss.prototype, "dashSpeed", void 0);
    __decorate([
        property()
    ], player_boss.prototype, "upA", void 0);
    __decorate([
        property()
    ], player_boss.prototype, "downA", void 0);
    __decorate([
        property()
    ], player_boss.prototype, "jump_speed", void 0);
    __decorate([
        property(cc.Prefab)
    ], player_boss.prototype, "bulletPrefab", void 0);
    player_boss = __decorate([
        ccclass
    ], player_boss);
    return player_boss;
}(cc.Component));
exports.default = player_boss;

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
        //# sourceMappingURL=player_boss.js.map
        