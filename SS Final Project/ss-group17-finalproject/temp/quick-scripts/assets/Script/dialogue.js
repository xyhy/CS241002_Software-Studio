(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/dialogue.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'aa674xpT1VM9orAfuIzdj6/', 'dialogue', __filename);
// Script/dialogue.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //Label of text content.
        _this.textLabel = null;
        //Label of role name (who is talking).
        _this.nameLabel = null;
        //Sprite of dialog box.
        _this.picSprite = null;
        //Index of current sentence.
        _this.textIndex = 0;
        //Sound effect of typing
        _this.typingSound = null;
        _this.isEnd = false;
        //Array includes every sentences, role name, and text content.
        _this.textContentArr = null;
        //To record the text content of current sentence.
        _this.curText = null;
        //To show if current sentence is still playing (typing).
        _this.textEnd = true;
        //To calculate typing time of each word.
        _this.totalTime = 0;
        _this.content = [{ role: '姓名', content: '對話框內容縮排測試對話框內容縮排測試' },
            { role: '姓名', content: '第二句話內容測試' }];
        return _this;
    }
    NewClass.prototype.onLoad = function () {
        //Initialize.
        //this.init(this.content);
        //Keyboard event listener (when SHIFT is pressed, change to next sentence).
        cc.systemEvent.on('keydown', this.onKeyDown, this);
        this.schedule(function () { this.nextTextContent(); }, 2);
        //Mouse event listener (when Mouse down, change to next sentence).
        //this.node.on(cc.Node.EventType.MOUSE_DOWN, this.nextTextContent, this);
    };
    NewClass.prototype.update = function (dt) {
        if (!this.curText)
            return;
        this.totalTime += dt;
        if (this.totalTime >= 0.1) { //Typing 1 word every 0.1 sec
            if (this.textLabel.string.length < this.curText.length) {
                cc.audioEngine.playEffect(this.typingSound, false);
                this.textLabel.string = this.curText.slice(0, this.textLabel.string.length + 1);
            }
            else {
                this.textEnd = true;
                this.curText = null;
            }
            this.totalTime = 0;
        }
    };
    NewClass.prototype.onDestroy = function () {
        cc.systemEvent.off('keydown', this.onKeyDown, this);
    };
    NewClass.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case cc.macro.KEY.shift: {
                this.nextTextContent();
                break;
            }
        }
    };
    //Initialize.
    NewClass.prototype.init = function (textContentArr) {
        if (cc.find("SceneManager").getComponent("scene_manage").get_first_time()) {
            this.textIndex = -1;
            this.node.active = true;
            this.textContentArr = textContentArr;
            this.nextTextContent();
        }
        else
            this.node.destroy();
    };
    //Change to next sentence.
    NewClass.prototype.nextTextContent = function () {
        //If current sentence are still playing, can't change to next dialog.
        if (!this.textEnd)
            return;
        if (++this.textIndex < this.textContentArr.length) { //Have another words to say
            this.setTextContent(this.textContentArr[this.textIndex]);
        }
        else {
            this.closeDialogBox();
        }
    };
    //Change the text context of each sentence.
    NewClass.prototype.setTextContent = function (textContent) {
        if (!this.textEnd)
            return;
        this.textEnd = false;
        this.nameLabel.string = textContent.role;
        this.textLabel.string = '';
        this.curText = textContent.content;
    };
    //Close the dialog box.
    NewClass.prototype.closeDialogBox = function () {
        this.isEnd = true;
        this.node.runAction(cc.fadeOut(0.2));
        this.unschedule(function () { this.nextTextContent(); });
        this.scheduleOnce(function () { this.node.destroy(); }, 0.2);
        if (cc.director.getScene().name[0] == 'a') {
            cc.log("finish");
            cc.find("anima").getComponent("anima").animation_finish();
        }
    };
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "textLabel", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "nameLabel", void 0);
    __decorate([
        property(cc.Sprite)
    ], NewClass.prototype, "picSprite", void 0);
    __decorate([
        property()
    ], NewClass.prototype, "textIndex", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], NewClass.prototype, "typingSound", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

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
        //# sourceMappingURL=dialogue.js.map
        