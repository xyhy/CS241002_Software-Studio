(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/collide_2.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1345dozFd5O140a1JuboHw+', 'collide_2', __filename);
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
        //# sourceMappingURL=collide_2.js.map
        