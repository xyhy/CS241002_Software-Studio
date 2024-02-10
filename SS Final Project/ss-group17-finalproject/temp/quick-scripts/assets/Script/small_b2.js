(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/small_b2.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7af1fPrHbpL35dgUsw+mh4n', 'small_b2', __filename);
// Script/small_b2.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var small_b2 = /** @class */ (function (_super) {
    __extends(small_b2, _super);
    function small_b2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scale = -1;
        //578, 523
        //247, 534
        //325, 356
        //838, 323
        //530, 268
        //411, 134
        //686, 163
        _this.pos_set = [cc.v2(578, 523), cc.v2(247, 534), cc.v2(325, 356),
            cc.v2(838, 323), cc.v2(530, 268), cc.v2(411, 134), cc.v2(686, 163)];
        return _this;
    }
    small_b2.prototype.start = function () {
        var _this = this;
        this.walk();
        this.schedule(function () { _this.walk(); }, 8);
    };
    small_b2.prototype.walk = function () {
        var _this = this;
        var act = cc.moveBy(1.5, -150, 0).easing(cc.easeIn(6));
        var act2 = cc.moveBy(1.5, 150, 0).easing(cc.easeIn(6));
        var act3 = cc.fadeOut(1.5);
        this.node.scaleX *= this.scale;
        this.node.runAction(cc.sequence(act2, act3));
        this.scheduleOnce(function () {
            _this.node.position = _this.pos_set[_this.random_num(7)];
            _this.node.scaleX *= _this.scale;
            _this.node.runAction(cc.sequence(cc.fadeIn(1.5), act));
        }, 3);
    };
    small_b2.prototype.random_num = function (x) {
        return Math.floor(Math.random() * x);
    };
    small_b2 = __decorate([
        ccclass
    ], small_b2);
    return small_b2;
}(cc.Component));
exports.default = small_b2;

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
        //# sourceMappingURL=small_b2.js.map
        