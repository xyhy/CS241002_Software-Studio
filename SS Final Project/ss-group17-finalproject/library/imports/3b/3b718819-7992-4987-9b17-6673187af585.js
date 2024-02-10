"use strict";
cc._RF.push(module, '3b718gZeZJJh5sXZnMYevWF', 'ch1_1');
// Script/ch1_1.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ch1_1 = /** @class */ (function (_super) {
    __extends(ch1_1, _super);
    function ch1_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dialog = null;
        return _this;
        // update (dt) {}
    }
    ch1_1.prototype.start = function () {
        this.scene_name = cc.director.getScene().name;
        var dialog_box = cc.instantiate(this.dialog);
        dialog_box.parent = cc.find('All Nodes/Canvas/Main Camera');
        if (this.scene_name == '1-1') {
            dialog_box.getComponent('dialogue').init([{ role: '我', content: '這是哪裡？我在這裡多久了？' }, { role: '我', content: '.....' }]);
        }
        else if (this.scene_name == '1-2') {
            dialog_box.getComponent('dialogue').init([{ role: '提示', content: '試試跳躍到牆壁上！' }]);
        }
        else if (this.scene_name == 'boss') {
            dialog_box.getComponent('dialogue').init([{ role: '守門人', content: '你是誰！？' }]);
        }
    };
    __decorate([
        property(cc.Prefab)
    ], ch1_1.prototype, "dialog", void 0);
    ch1_1 = __decorate([
        ccclass
    ], ch1_1);
    return ch1_1;
}(cc.Component));
exports.default = ch1_1;

cc._RF.pop();