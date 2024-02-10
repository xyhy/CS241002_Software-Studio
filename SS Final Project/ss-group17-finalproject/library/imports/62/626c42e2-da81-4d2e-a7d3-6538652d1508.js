"use strict";
cc._RF.push(module, '626c4Li2oFNLqfTZThlLRUI', 'st');
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