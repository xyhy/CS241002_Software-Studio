"use strict";
cc._RF.push(module, 'b4163Dc71FEGY26U9pshr+/', 'ch3_dialogue');
// Script/ch3_dialogue.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ch1_1 = /** @class */ (function (_super) {
    __extends(ch1_1, _super);
    function ch1_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dialog = null;
        _this.scene_name = '';
        _this.dialogue_3_1 = [{ role: '女孩', content: '跑什麼啊，這一切都已經無法挽回了' },
            { role: '女孩', content: '難道你想要在我落到山谷以前到谷底接住我嗎？就算是夢也太誇張囉！' }];
        return _this;
        // update (dt) {}
    }
    /*
    public dialogue_3_2 = [{role:'學姊', content:'要是當時聽我的話，中途折返了不就好了嗎'},
    {role:'學姊', content: '還想用我自己的話來鼓勵我？是會不會太尷尬啊？'}];
    public dialogue_3_3 = [{role:'學姊', content:'我知道的，你喜歡我吧？所以才不管期末考要跟我一起上山'},
    {role:'學姊', content: '結果我只是禮貌性的抱了一下，你就飄起來啦？真是噁心'}];
    public dialogue_3_4 = [{role:'學姊', content:'當初你剛加入登山社時，我只是看你可憐，跟你聊幾句天，就被你當成天使啦？'},
    {role:'學姊', content: '真沒想到你用這種方式來報答我！'}];
    */
    ch1_1.prototype.onload = function () {
    };
    ch1_1.prototype.start = function () {
        this.scene_name = cc.director.getScene().name;
        //var dialog_box = cc.instantiate(this.dialog);
        cc.log(this.scene_name);
        //dialog_box.parent = this.node;
        if (this.scene_name == '3-1') {
            var dialog_box = cc.instantiate(this.dialog);
            dialog_box.parent = this.node;
            dialog_box.getComponent('dialogue').init(this.dialogue_3_1);
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