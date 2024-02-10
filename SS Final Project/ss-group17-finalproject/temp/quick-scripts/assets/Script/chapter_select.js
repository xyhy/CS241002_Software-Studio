(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/chapter_select.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '92e3deAlvxOjpudR7/7p9//', 'chapter_select', __filename);
// Script/chapter_select.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ChapterSelect = /** @class */ (function (_super) {
    __extends(ChapterSelect, _super);
    function ChapterSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgm = null;
        _this.hover_sound = null;
        _this.default_bg = null;
        _this.ch1_bg = null;
        _this.ch2_bg = null;
        _this.ch3_bg = null;
        _this.has_select_limit = false;
        _this.ch1_clicked = false;
        _this.ch2_clicked = false;
        _this.ch3_clicked = false;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    ChapterSelect.prototype.onLoad = function () {
        //Play background music
        cc.audioEngine.playMusic(this.bgm, true);
        //Chapter select buttons
        //Chapter 1
        var ch1Btn = new cc.Component.EventHandler();
        ch1Btn.target = this.node;
        ch1Btn.component = "chapter_select";
        ch1Btn.handler = "ch1OnClick";
        var button_1 = cc.find("All Nodes/Canvas/chapter1_btn").getComponent(cc.Button);
        button_1.clickEvents.push(ch1Btn);
        //Chapter 2
        var ch2Btn = new cc.Component.EventHandler();
        ch2Btn.target = this.node;
        ch2Btn.component = "chapter_select";
        ch2Btn.handler = "ch2OnClick";
        var button_2 = cc.find("All Nodes/Canvas/chapter2_btn").getComponent(cc.Button);
        button_2.clickEvents.push(ch2Btn);
        //Chapter 3
        var ch3Btn = new cc.Component.EventHandler();
        ch3Btn.target = this.node;
        ch3Btn.component = "chapter_select";
        ch3Btn.handler = "ch3OnClick";
        var button_3 = cc.find("All Nodes/Canvas/chapter3_btn").getComponent(cc.Button);
        button_3.clickEvents.push(ch3Btn);
        //Hover event
        //Chapter 1
        cc.find("All Nodes/Canvas/chapter1_btn").on(cc.Node.EventType.MOUSE_ENTER, this.ch1Hover, this);
        cc.find("All Nodes/Canvas/chapter1_btn").on(cc.Node.EventType.MOUSE_LEAVE, this.mouseLeave, this);
        //Chapter 2
        cc.find("All Nodes/Canvas/chapter2_btn").on(cc.Node.EventType.MOUSE_ENTER, this.ch2Hover, this);
        cc.find("All Nodes/Canvas/chapter2_btn").on(cc.Node.EventType.MOUSE_LEAVE, this.mouseLeave, this);
        //Chapter 3
        cc.find("All Nodes/Canvas/chapter3_btn").on(cc.Node.EventType.MOUSE_ENTER, this.ch3Hover, this);
        cc.find("All Nodes/Canvas/chapter3_btn").on(cc.Node.EventType.MOUSE_LEAVE, this.mouseLeave, this);
        //Hide dropdown
        cc.find("All Nodes/Canvas/chapter1_dropdown").active = false;
        cc.find("All Nodes/Canvas/chapter2_dropdown").active = false;
        cc.find("All Nodes/Canvas/chapter3_dropdown").active = false;
        if (this.has_select_limit)
            this.limit_select();
    };
    ChapterSelect.prototype.ch1Hover = function () {
        cc.audioEngine.playEffect(this.hover_sound, false);
        this.node.scaleX = 1;
        this.node.color = cc.color(255, 255, 255);
        this.node.opacity = 100;
        this.node.getComponent(cc.Sprite).spriteFrame = this.ch1_bg;
    };
    ChapterSelect.prototype.ch2Hover = function () {
        cc.audioEngine.playEffect(this.hover_sound, false);
        this.node.color = cc.color(255, 255, 255);
        this.node.opacity = 100;
        this.node.scaleX = -1;
        this.node.getComponent(cc.Sprite).spriteFrame = this.ch2_bg;
    };
    ChapterSelect.prototype.ch3Hover = function () {
        cc.audioEngine.playEffect(this.hover_sound, false);
        this.node.scaleX = 1;
        this.node.color = cc.color(255, 255, 255);
        this.node.opacity = 100;
        this.node.getComponent(cc.Sprite).spriteFrame = this.ch3_bg;
    };
    ChapterSelect.prototype.mouseLeave = function () {
        if (this.ch1_clicked) {
            this.node.scaleX = 1;
            this.node.color = cc.color(255, 255, 255);
            this.node.opacity = 100;
            this.node.getComponent(cc.Sprite).spriteFrame = this.ch1_bg;
        }
        else if (this.ch2_clicked) {
            this.node.scaleX = -1;
            this.node.color = cc.color(255, 255, 255);
            this.node.opacity = 100;
            this.node.getComponent(cc.Sprite).spriteFrame = this.ch2_bg;
        }
        else if (this.ch3_clicked) {
            this.node.scaleX = 1;
            this.node.color = cc.color(255, 255, 255);
            this.node.opacity = 100;
            this.node.getComponent(cc.Sprite).spriteFrame = this.ch3_bg;
        }
        else {
            this.node.scaleX = 1;
            this.node.color = cc.color(0, 0, 0);
            this.node.getComponent(cc.Sprite).spriteFrame = this.default_bg;
        }
    };
    ChapterSelect.prototype.ch1OnClick = function () {
        if (this.ch1_clicked) {
            this.ch1UnClick();
            return;
        }
        if (this.ch2_clicked) {
            this.ch2UnClick();
            this.scheduleOnce(this.ch1OnClick, 0.5);
            return;
        }
        else if (this.ch3_clicked) {
            this.ch3UnClick();
            this.scheduleOnce(this.ch1OnClick, 0.5);
            return;
        }
        this.ch1_clicked = true;
        var dropdown = cc.find("All Nodes/Canvas/chapter1_dropdown");
        dropdown.scaleY = 0;
        dropdown.active = true;
        var scaleTo = cc.scaleTo(0.5, 1, 1);
        dropdown.runAction(scaleTo);
        cc.find("All Nodes/Canvas/chapter2_btn").runAction(cc.moveBy(0.5, 0, -100));
        cc.find("All Nodes/Canvas/chapter3_btn").runAction(cc.moveBy(0.5, 0, -100));
    };
    ChapterSelect.prototype.ch1UnClick = function () {
        this.ch1_clicked = false;
        var dropdown = cc.find("All Nodes/Canvas/chapter1_dropdown");
        var scaleTo = cc.scaleTo(0.5, 1, 0);
        dropdown.runAction(scaleTo);
        this.scheduleOnce(function () { dropdown.active = false; }, 0.5);
        cc.find("All Nodes/Canvas/chapter2_btn").runAction(cc.moveBy(0.5, 0, 100));
        cc.find("All Nodes/Canvas/chapter3_btn").runAction(cc.moveBy(0.5, 0, 100));
    };
    ChapterSelect.prototype.ch2OnClick = function () {
        if (this.ch2_clicked) {
            this.ch2UnClick();
            return;
        }
        if (this.ch1_clicked) {
            this.ch1UnClick();
            this.scheduleOnce(this.ch2OnClick, 0.5);
            return;
        }
        else if (this.ch3_clicked) {
            this.ch3UnClick();
            this.scheduleOnce(this.ch2OnClick, 0.5);
            return;
        }
        this.ch2_clicked = true;
        var dropdown = cc.find("All Nodes/Canvas/chapter2_dropdown");
        dropdown.scaleY = 0;
        dropdown.active = true;
        var scaleTo = cc.scaleTo(0.5, 1, 1);
        dropdown.runAction(scaleTo);
        cc.find("All Nodes/Canvas/chapter3_btn").runAction(cc.moveBy(0.5, 0, -100));
    };
    ChapterSelect.prototype.ch2UnClick = function () {
        this.ch2_clicked = false;
        var dropdown = cc.find("All Nodes/Canvas/chapter2_dropdown");
        var scaleTo = cc.scaleTo(0.5, 1, 0);
        dropdown.runAction(scaleTo);
        this.scheduleOnce(function () { dropdown.active = false; }, 0.5);
        cc.find("All Nodes/Canvas/chapter3_btn").runAction(cc.moveBy(0.5, 0, 100));
    };
    ChapterSelect.prototype.ch3OnClick = function () {
        if (this.ch3_clicked) {
            this.ch3UnClick();
            return;
        }
        if (this.ch1_clicked) {
            this.ch1UnClick();
            this.scheduleOnce(this.ch3OnClick, 0.5);
            return;
        }
        else if (this.ch2_clicked) {
            this.ch2UnClick();
            this.scheduleOnce(this.ch3OnClick, 0.5);
            return;
        }
        this.ch3_clicked = true;
        var dropdown = cc.find("All Nodes/Canvas/chapter3_dropdown");
        dropdown.scaleY = 0;
        dropdown.active = true;
        var scaleTo = cc.scaleTo(0.5, 1, 1);
        dropdown.runAction(scaleTo);
    };
    ChapterSelect.prototype.ch3UnClick = function () {
        this.ch3_clicked = false;
        var dropdown = cc.find("All Nodes/Canvas/chapter3_dropdown");
        var scaleTo = cc.scaleTo(0.5, 1, 0);
        dropdown.runAction(scaleTo);
        this.scheduleOnce(function () { dropdown.active = false; }, 0.5);
    };
    ChapterSelect.prototype.dropdownBtnClick = function (event, data) {
        // cc.find("Canvas").runAction(cc.sequence(
        //     cc.fadeOut(0.2), 
        //     cc.callFunc(function () {
        //          cc.director.loadScene(data);
        //     })
        // ));
        cc.find("SceneManager").getComponent("scene_manage").enter_selected_level(data);
    };
    ChapterSelect.prototype.onDestroy = function () {
        cc.audioEngine.stopMusic();
    };
    ChapterSelect.prototype.limit_select = function () {
        var table = cc.find("SceneManager").getComponent("scene_manage").get_level_record();
        if (!table[1][0])
            cc.find("All Nodes/Canvas/chapter2_btn").active = false;
        if (!table[2][0])
            cc.find("All Nodes/Canvas/chapter3_btn").active = false;
        for (var i = 1; i <= 3; i++) {
            var root = cc.find("All Nodes/Canvas/chapter" + i + "_dropdown");
            for (var j = 1; j <= 5; j++) {
                if (!table[i - 1][j - 1])
                    root.getChildByName(j + "_btn").active = false;
            }
        }
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], ChapterSelect.prototype, "bgm", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], ChapterSelect.prototype, "hover_sound", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], ChapterSelect.prototype, "default_bg", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], ChapterSelect.prototype, "ch1_bg", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], ChapterSelect.prototype, "ch2_bg", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], ChapterSelect.prototype, "ch3_bg", void 0);
    __decorate([
        property(cc.Boolean)
    ], ChapterSelect.prototype, "has_select_limit", void 0);
    ChapterSelect = __decorate([
        ccclass
    ], ChapterSelect);
    return ChapterSelect;
}(cc.Component));
exports.default = ChapterSelect;

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
        //# sourceMappingURL=chapter_select.js.map
        