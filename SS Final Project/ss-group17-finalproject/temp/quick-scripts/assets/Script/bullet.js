(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/bullet.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c6b765hm8BJy4ZafFfNdV3M', 'bullet', __filename);
// Script/bullet.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.anim = null;
        _this.bulletManager = null;
        return _this;
    }
    // I add this to make the bullet kill one enemy at a time.
    // when created, the bullet need to be placed at correct position and play animation.
    Bullet.prototype.init = function (node) {
        this.anim = this.getComponent(cc.Animation);
        this.setInitPos(node);
        this.bulletMove();
        // this.anim.play('bullet');
    };
    //this function sets the bullet's initial position when it is reused.
    Bullet.prototype.setInitPos = function (node) {
        this.node.parent = node.parent; // don't mount under the player, otherwise it will change direction when player move
        if (node.scaleX > 0) {
            this.node.position = cc.v2(62, 8);
            this.node.scaleX = 1;
        }
        else {
            this.node.position = cc.v2(-62, 8);
            this.node.scaleX = -1;
        }
        this.node.position = this.node.position.addSelf(node.position);
    };
    //make the bullet move from current position
    Bullet.prototype.bulletMove = function () {
        var speed = 0;
        if (this.node.scaleX > 0)
            speed = 400;
        else
            speed = -400;
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(speed, 0);
    };
    //detect collision with enemies
    Bullet.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        //this.node.stopAllActions();
        //this.unscheduleAllCallbacks();
        cc.log('boss hit');
        // for better animation effect, I delay 0.1s when bullet hits the enemy
    };
    Bullet = __decorate([
        ccclass
    ], Bullet);
    return Bullet;
}(cc.Component));
exports.default = Bullet;

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
        //# sourceMappingURL=bullet.js.map
        