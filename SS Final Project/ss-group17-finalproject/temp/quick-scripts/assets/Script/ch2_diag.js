(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/ch2_diag.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2c534Qa7yNHwJpeSWqHZUcn', 'ch2_diag', __filename);
// Script/ch2_diag.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ch2_diag = /** @class */ (function (_super) {
    __extends(ch2_diag, _super);
    function ch2_diag() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dialog = null;
        _this.scene_name = '';
        _this.dialogue_2_1 = [{ role: '我', content: '這個場景...' }];
        _this.dialogue_2_3 = [{ role: '我', content: '天色好像變差了...' }, { role: '我', content: '總覺得似曾相似...' }];
        _this.dialogue_2_4 = [{ role: '學姊', content: '那個...我們要不要在這裡折返？' },
            { role: '我', content: '咦！' }, { role: '學姊', content: '天色越來越差了' },
            { role: '學姊', content: '這樣子可能會來不及在入夜前下山' },
            { role: '我', content: '可是只剩下三分之一的路程了吧' },
            { role: '我', content: '要在這裡放棄嗎？' }];
        _this.dialogue_2_5 = [{ role: '怪物', content: '抱歉，你們不能再前進了。' }];
        return _this;
        // update (dt) {}
    }
    ch2_diag.prototype.onload = function () {
    };
    ch2_diag.prototype.start = function () {
        this.scene_name = cc.director.getScene().name;
        if (this.scene_name == '2-1') {
            var dialog_box = cc.instantiate(this.dialog);
            dialog_box.parent = this.node;
            dialog_box.getComponent('dialogue').init(this.dialogue_2_1);
        }
        else if (this.scene_name == '2-3') {
            var dialog_box = cc.instantiate(this.dialog);
            dialog_box.parent = this.node;
            dialog_box.getComponent('dialogue').init(this.dialogue_2_3);
        }
        else if (this.scene_name == '2-4') {
            var dialog_box = cc.instantiate(this.dialog);
            dialog_box.parent = this.node;
            dialog_box.getComponent('dialogue').init(this.dialogue_2_4);
        }
        else if (this.scene_name == 'boss_2') {
            var dialog_box = cc.instantiate(this.dialog);
            dialog_box.parent = this.node;
            dialog_box.getComponent('dialogue').init(this.dialogue_2_5);
        }
    };
    __decorate([
        property(cc.Prefab)
    ], ch2_diag.prototype, "dialog", void 0);
    ch2_diag = __decorate([
        ccclass
    ], ch2_diag);
    return ch2_diag;
}(cc.Component));
exports.default = ch2_diag;

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
        //# sourceMappingURL=ch2_diag.js.map
        