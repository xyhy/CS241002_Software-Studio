"use strict";
cc._RF.push(module, '1345dozFd5O140a1JuboHw+', 'collide_2');
// Script/collide_2.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var collide_2 = /** @class */ (function (_super) {
    __extends(collide_2, _super);
    function collide_2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // LIFE-CYCLE CALLBACKS:
    collide_2.prototype.onLoad = function () {
        cc.director.getPhysicsManager().enabled = true;
    };
    collide_2.prototype.start = function () {
    };
    collide_2.prototype.onBeginContact = function (contact, self, other) {
        //cc.log(contact.getWorldManifold().normal.y)
        if (contact.getWorldManifold().normal.y < 0) {
            contact.disabled = true;
        }
    };
    collide_2 = __decorate([
        ccclass
    ], collide_2);
    return collide_2;
}(cc.Component));
exports.default = collide_2;
// || contact.getWorldManifold().normal.x == 1 || contact.getWorldManifold().normal.x == -1

cc._RF.pop();