(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/dropping_platform.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8fadcTNVjpHoJBywiQUW50Q', 'dropping_platform', __filename);
// Script/dropping_platform.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DroppingPlatform = /** @class */ (function (_super) {
    __extends(DroppingPlatform, _super);
    function DroppingPlatform() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dropped = false;
        _this.stick = false;
        _this.original_position = null;
        return _this;
    }
    DroppingPlatform.prototype.start = function () {
        this.original_position = this.node.position;
        this.reset();
    };
    DroppingPlatform.prototype.reset = function () {
        this.node.position = this.original_position;
        this.dropped = false;
        this.stick = true;
        this.node.getComponent(cc.RigidBody).type = cc.RigidBodyType.Kinematic;
        this.unscheduleAllCallbacks();
    };
    DroppingPlatform.prototype.onBeginContact = function (contact, self, other) {
        var _this = this;
        if (!this.dropped && other.node.name == "player" && contact.getWorldManifold().normal.y > 0.8) {
            this.dropped = true;
            this.node.runAction(cc.repeat(cc.sequence(cc.rotateBy(0.03, 3), cc.rotateBy(0.06, -6), cc.rotateBy(0.03, 3)), 1));
            this.scheduleOnce(function () {
                _this.stick = false;
                _this.node.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic;
            }, 0.5);
        }
    };
    DroppingPlatform = __decorate([
        ccclass
    ], DroppingPlatform);
    return DroppingPlatform;
}(cc.Component));
exports.default = DroppingPlatform;

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
        //# sourceMappingURL=dropping_platform.js.map
        