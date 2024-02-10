(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/platform2_1.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f9579a+9elCT63Mo5zvF8c8', 'platform2_1', __filename);
// Script/platform2_1.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var platform2_2_h = /** @class */ (function (_super) {
    __extends(platform2_2_h, _super);
    function platform2_2_h() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    platform2_2_h.prototype.start = function () {
        //this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 100);
        this.platformMove();
    };
    // update(dt){
    // }
    platform2_2_h.prototype.platformMove = function () {
        var easeRate = 2;
        var action = cc.repeatForever(cc.sequence(cc.moveBy(5, 300, 0), cc.moveBy(5, -300, 0)));
        action.easing(cc.easeInOut(easeRate));
        this.scheduleOnce(function () {
            this.node.runAction(action);
        }, 0.5);
    };
    platform2_2_h.prototype.onBeginContact = function (contact, self, other) {
        if (other.node.name != 'player')
            contact.disabled = true;
        if (contact.getWorldManifold().normal.y == -1 || contact.getWorldManifold().normal.x == 1 || contact.getWorldManifold().normal.x == -1) {
            contact.disabled = true;
        }
    };
    platform2_2_h.prototype.onPreSolve = function (contact, self, other) {
        if (other.node.name != 'player')
            contact.disabled = true;
        if (contact.getWorldManifold().normal.y == -1 || contact.getWorldManifold().normal.x == 1 || contact.getWorldManifold().normal.x == -1) {
            contact.disabled = true;
        }
    };
    platform2_2_h.prototype.destroy_plat = function () {
        cc.log('destroy');
        this.node.destroy();
    };
    platform2_2_h = __decorate([
        ccclass
    ], platform2_2_h);
    return platform2_2_h;
}(cc.Component));
exports.default = platform2_2_h;

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
        //# sourceMappingURL=platform2_1.js.map
        