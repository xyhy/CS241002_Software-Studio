"use strict";
cc._RF.push(module, '1ce4biY3kBKXZjicTqXjMRa', 'player');
// Script/player.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var player = /** @class */ (function (_super) {
    __extends(player, _super);
    function player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property()
        // FallG: number = 0; //Gravity
        _this.speedupA = 0; //speed increase rate
        _this.speeddownA = 0; //speed decrease rate
        _this.maxSpeedX = 0; //max x-axis move
        _this.maxSpeedY = 900; //fall down max speed
        // @property(cc.Integer)
        // public jumpSpeed: number = 50; //affect jump height
        _this.dashSpeed = 40; // shoot for dash
        _this.bulletPrefab = null;
        _this._currentSpeedX = 0;
        // private _currentSpeedY: number = 0;
        _this.up = false;
        _this.shoot = false;
        _this.left = 0;
        _this.right = 0;
        _this.dead = false;
        _this.onGround = false;
        _this.is_falling = false;
        _this.airshoot = false;
        _this.rebornPosition = cc.v2();
        _this.spring_jumping = false;
        _this.spring_force = cc.v2();
        _this.wind_floating = false;
        _this.wind_force = cc.v2();
        return _this;
    }
    player.prototype.onLoad = function () {
        cc.director.getPhysicsManager().enabled = true;
    };
    player.prototype.start = function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.rebornPosition = this.node.position;
    };
    player.prototype.update = function (dt) {
        this.playermoveX();
        this.playermoveY();
        this.object_effect(dt);
        this.playerAnimation();
        //this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this._currentSpeedX, this._currentSpeedY);
        this.node.x += this._currentSpeedX;
        // this.node.y += this._currentSpeedY;
        cc.log(this._currentSpeedX);
    };
    player.prototype.onKeyDown = function (event) {
        if (event.keyCode == cc.macro.KEY.left) {
            this.left = 1;
            if (this.right == 1 || this.right == 2)
                this.right = 2;
            else
                this.right = 0;
        }
        else if (event.keyCode == cc.macro.KEY.right) {
            this.right = 1;
            if (this.left == 1 || this.left == 2)
                this.left = 2;
            else
                this.left = 0;
        }
        else if (event.keyCode == cc.macro.KEY.space) {
            this.up = true;
        }
        else if (event.keyCode == cc.macro.KEY.enter) {
            this.shoot = true;
            this.createBullet();
        }
    };
    player.prototype.onKeyUp = function (event) {
        if (event.keyCode == cc.macro.KEY.right) {
            this.right = 0;
            if (this.left == 2)
                this.left = 1;
        }
        else if (event.keyCode == cc.macro.KEY.left) {
            this.left = 0;
            if (this.right == 2)
                this.right = 1;
        }
        else if (event.keyCode == cc.macro.KEY.space) {
            this.up = false;
        }
        else if (event.keyCode == cc.macro.KEY.enter) {
            this.shoot = false;
        }
    };
    player.prototype.playermoveX = function () {
        if (this.left == 1) {
            if (this._currentSpeedX <= -this.maxSpeedX) {
                this._currentSpeedX = -this.maxSpeedX;
            }
            else {
                this._currentSpeedX -= this.speedupA;
            }
        }
        else if (this.right == 1) {
            if (this._currentSpeedX >= this.maxSpeedX) {
                this._currentSpeedX = this.maxSpeedX;
            }
            else {
                this._currentSpeedX += this.speedupA;
            }
        }
        else {
            if (this._currentSpeedX != 0) {
                if (this._currentSpeedX > 0 && this._currentSpeedX > this.speeddownA) {
                    this._currentSpeedX -= this.speeddownA;
                }
                else if (this._currentSpeedX > 0 && this._currentSpeedX <= this.speeddownA) {
                    this._currentSpeedX = 0;
                }
                else if (this._currentSpeedX < 0 && this._currentSpeedX < -this.speeddownA) {
                    this._currentSpeedX += this.speeddownA;
                }
                else if (this._currentSpeedX < 0 && this._currentSpeedX >= -this.speeddownA) {
                    this._currentSpeedX = 0;
                }
            }
        }
    };
    player.prototype.playermoveY = function () {
        if (this.up && this.onGround) {
            this.jump();
        }
        else {
            this.playerfall();
        }
    };
    player.prototype.playerAnimation = function () {
        this.node.scaleX = (this.left) ? -1 : (this.right) ? 1 : this.node.scaleX;
    };
    player.prototype.dash = function () {
        var move = null;
        if (this.node.scaleX > 0) {
            move = cc.moveBy(0.1, -1 * this.dashSpeed, 0);
        }
        else {
            move = cc.moveBy(0.1, this.dashSpeed, 0);
        }
        this.node.runAction(move);
    };
    player.prototype.playerfall = function () {
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
    player.prototype.jump = function () {
        this.onGround = false;
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 900);
    };
    player.prototype.reborn = function () {
        if (this.dead) {
            this._currentSpeedX = 0;
            this.node.position = this.rebornPosition;
        }
    };
    player.prototype.createBullet = function () {
        if (this.onGround) {
            var bullet = cc.instantiate(this.bulletPrefab);
            bullet.getComponent('bullet').init(this.node);
            this.dash();
            this.airshoot = false;
        }
        else {
            if (this.airshoot) {
            }
            else {
                var bullet = cc.instantiate(this.bulletPrefab);
                bullet.getComponent('bullet').init(this.node);
                this.dash();
                this.airshoot = true;
            }
        }
    };
    player.prototype.onBeginContact = function (contact, self, other) {
        if (other.tag == 1) {
            this.onGround = true;
            this.airshoot = false;
        }
        else if (other.tag == 2 || other.tag == 3) {
            this.dead = true;
            this.reborn();
        }
    };
    player.prototype.onEndContact = function (contact, self, other) {
        if (other.tag == 1) {
            this.onGround = false;
        }
    };
    player.prototype.regain = function () {
        this.airshoot = false;
    };
    player.prototype.call_spring_jump = function (f) {
        cc.log(f);
        this.spring_jumping = true;
        this.spring_force = f;
    };
    player.prototype.call_wind_floating = function (f, wind_switch) {
        this.wind_floating = wind_switch;
        if (wind_switch)
            this.wind_force = f;
    };
    player.prototype.object_effect = function (dt) {
        var origin_v = this.node.getComponent(cc.RigidBody).linearVelocity;
        if (this.spring_jumping) {
            this.spring_jumping = false;
            this._currentSpeedX = this.spring_force.x / 30;
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(origin_v.x, this.spring_force.y / 2);
            this.airshoot = false;
        }
        if (this.wind_floating) {
            this.node.getComponent(cc.RigidBody).linearVelocity = origin_v.add(this.wind_force);
            cc.log("winding: " + this.wind_force.y);
            this.wind_floating = false;
        }
    };
    __decorate([
        property()
    ], player.prototype, "speedupA", void 0);
    __decorate([
        property()
    ], player.prototype, "speeddownA", void 0);
    __decorate([
        property()
    ], player.prototype, "maxSpeedX", void 0);
    __decorate([
        property()
    ], player.prototype, "maxSpeedY", void 0);
    __decorate([
        property(cc.Integer)
    ], player.prototype, "dashSpeed", void 0);
    __decorate([
        property(cc.Prefab)
    ], player.prototype, "bulletPrefab", void 0);
    player = __decorate([
        ccclass
    ], player);
    return player;
}(cc.Component));
exports.default = player;

cc._RF.pop();