"use strict";
cc._RF.push(module, 'ba73fe5sJxKeKPxdk3FCA/i', 'level_manage');
// Script/level_manage.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.next_scene = "";
        _this.last_scene = "";
        return _this;
        // update (dt) {}
    }
    NewClass.prototype.onLoad = function () {
        cc.director.getPhysicsManager().enabled = true;
    };
    __decorate([
        property(cc.String)
    ], NewClass.prototype, "next_scene", void 0);
    __decorate([
        property(cc.String)
    ], NewClass.prototype, "last_scene", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();