(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/platform2_4.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a4863qkSnRES4G4vcglplxG', 'platform2_4', __filename);
// Script/platform2_4.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var platform2_4 = /** @class */ (function (_super) {
    __extends(platform2_4, _super);
    function platform2_4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    platform2_4.prototype.start = function () {
        //this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 100);
        this.platformMove();
    };
    // update(dt){
    // }
    platform2_4.prototype.platformMove = function () {
        var easeRate = 2;
        var action = cc.repeatForever(cc.sequence(cc.moveBy(2, 0, 150), cc.moveBy(2, 0, -150)));
        action.easing(cc.easeInOut(easeRate));
        this.scheduleOnce(function () {
            this.node.runAction(action);
        }, 0.5);
    };
    platform2_4.prototype.onBeginContact = function (contact, self, other) {
        if (other.node.name != 'player')
            contact.disabled = true;
        if (contact.getWorldManifold().normal.y == -1 || contact.getWorldManifold().normal.x == 1 || contact.getWorldManifold().normal.x == -1) {
            contact.disabled = true;
        }
    };
    platform2_4.prototype.onPreSolve = function (contact, self, other) {
        if (other.node.name != 'player')
            contact.disabled = true;
        if (contact.getWorldManifold().normal.y == -1 || contact.getWorldManifold().normal.x == 1 || contact.getWorldManifold().normal.x == -1) {
            contact.disabled = true;
        }
    };
    platform2_4.prototype.destroy_plat = function () {
        cc.log('destroy');
        this.node.destroy();
    };
    platform2_4 = __decorate([
        ccclass
    ], platform2_4);
    return platform2_4;
}(cc.Component));
exports.default = platform2_4;

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
        //# sourceMappingURL=platform2_4.js.map
        