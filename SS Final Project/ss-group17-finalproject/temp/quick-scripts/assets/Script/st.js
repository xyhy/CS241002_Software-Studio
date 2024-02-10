(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/st.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '626c4Li2oFNLqfTZThlLRUI', 'st', __filename);
// Script/st.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var st = /** @class */ (function (_super) {
    __extends(st, _super);
    function st() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    st.prototype.start = function () {
        var _this = this;
        this.anim = this.getComponent(cc.Animation);
        this.anim.play('stars');
        this.schedule(function () {
            //cc.find('All Nodes/Canvas/Main Camera').getComponent('cam_1').earthquake();
            _this.anim.play('stars');
        }, 5);
    };
    st = __decorate([
        ccclass
    ], st);
    return st;
}(cc.Component));
exports.default = st;

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
        //# sourceMappingURL=st.js.map
        