"use strict";
cc._RF.push(module, 'e9c157McTVFSIm0CddtcpmL', 'platform_boss1');
// Script/platform_boss1.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var platform_boss1 = /** @class */ (function (_super) {
    __extends(platform_boss1, _super);
    function platform_boss1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dir = null;
        _this.state = null;
        //1: spikes out
        _this.cooldown = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    platform_boss1.prototype.start = function () {
        //this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 100);
        if (this.dir == 0)
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 70);
        else if (this.dir == 1)
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, -70);
    };
    platform_boss1.prototype.update = function (dt) {
        if (this.node.getChildByName('spikes'))
            this.state = this.node.getChildByName('spikes').getComponent('spikes').state;
    };
    platform_boss1.prototype.onBeginContact = function (contact, self, other) {
        var _this = this;
        if (other.node.name == 'ceiling') {
            cc.log('touched ceiling');
            this.destroy_plat();
            return;
        }
        if (other.node.name != 'player')
            contact.disabled = true;
        if (contact.getWorldManifold().normal.y == -1 || contact.getWorldManifold().normal.x == 1 || contact.getWorldManifold().normal.x == -1) {
            contact.disabled = true;
        }
        if (other.node.name == 'player' && this.state && !this.cooldown) {
            cc.log('in state = 1');
            this.cooldown = 1;
            //cc.log('player_score -= 100');
            other.getComponent('player_boss').dead = true;
            this.scheduleOnce(function () {
                _this.cooldown = 0;
            }, 1);
        }
    };
    platform_boss1.prototype.onPreSolve = function (contact, self, other) {
        if (other.node.name != 'player')
            contact.disabled = true;
        if (contact.getWorldManifold().normal.y == -1 || contact.getWorldManifold().normal.x == 1 || contact.getWorldManifold().normal.x == -1) {
            contact.disabled = true;
        }
    };
    platform_boss1.prototype.destroy_plat = function () {
        cc.log('destroy');
        this.node.destroy();
    };
    platform_boss1 = __decorate([
        ccclass
    ], platform_boss1);
    return platform_boss1;
}(cc.Component));
exports.default = platform_boss1;

cc._RF.pop();