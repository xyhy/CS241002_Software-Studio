(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/strawberry_count.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '48eb7c72qVLgKv4zS+qZLGv', 'strawberry_count', __filename);
// Script/strawberry_count.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var StrawberryCount = /** @class */ (function (_super) {
    __extends(StrawberryCount, _super);
    function StrawberryCount() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StrawberryCount.prototype.onLoad = function () {
        this.node.position = cc.v2(-425, 260);
        this.node.runAction(cc.hide());
    };
    StrawberryCount.prototype.show = function (count) {
        this.node.getChildByName("count").getComponent(cc.Label).string = count.toString();
        this.node.runAction(cc.show());
    };
    StrawberryCount.prototype.increase = function (count) {
        var _this = this;
        this.node.getChildByName("count").getComponent(cc.Label).string = (count - 1).toString();
        this.node.runAction(cc.sequence(cc.show(), cc.fadeIn(0.2), cc.moveBy(0.5, 0, 0), cc.callFunc(function () { _this.node.getChildByName("count").getComponent(cc.Label).string = count.toString(); cc.log("hey"); }), cc.moveBy(1, 0, 0), cc.fadeOut(0.3), cc.hide()));
    };
    StrawberryCount = __decorate([
        ccclass
    ], StrawberryCount);
    return StrawberryCount;
}(cc.Component));
exports.default = StrawberryCount;

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
        //# sourceMappingURL=strawberry_count.js.map
        