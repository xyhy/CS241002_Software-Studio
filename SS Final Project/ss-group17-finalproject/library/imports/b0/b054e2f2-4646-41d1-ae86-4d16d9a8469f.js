"use strict";
cc._RF.push(module, 'b054eLyRkZB0a6GTRbZqEaf', 'platform2_2_v');
// Script/platform2_2_v.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var platform2_2_v = /** @class */ (function (_super) {
    __extends(platform2_2_v, _super);
    function platform2_2_v() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    platform2_2_v.prototype.start = function () {
        //this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 100);
        this.platformMove();
    };
    // update(dt){
    // }
    platform2_2_v.prototype.platformMove = function () {
        var easeRate = 5;
        var action = cc.repeatForever(cc.sequence(cc.moveBy(5, -350, 0), cc.moveBy(2, 0, 500), cc.moveBy(2, 0, -500), cc.moveBy(5, 350, 0)));
        action.easing(cc.easeInOut(easeRate));
        this.scheduleOnce(function () {
            this.node.runAction(action);
        }, 0.5);
    };
    platform2_2_v.prototype.onBeginContact = function (contact, self, other) {
        if (other.node.name != 'player')
            contact.disabled = true;
        if (contact.getWorldManifold().normal.y == -1 || contact.getWorldManifold().normal.x == 1 || contact.getWorldManifold().normal.x == -1) {
            contact.disabled = true;
        }
    };
    platform2_2_v.prototype.onPreSolve = function (contact, self, other) {
        if (other.node.name != 'player')
            contact.disabled = true;
        if (contact.getWorldManifold().normal.y == -1 || contact.getWorldManifold().normal.x == 1 || contact.getWorldManifold().normal.x == -1) {
            contact.disabled = true;
        }
    };
    platform2_2_v.prototype.destroy_plat = function () {
        cc.log('destroy');
        this.node.destroy();
    };
    platform2_2_v = __decorate([
        ccclass
    ], platform2_2_v);
    return platform2_2_v;
}(cc.Component));
exports.default = platform2_2_v;

cc._RF.pop();