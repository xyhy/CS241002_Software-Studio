(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/pause.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '45af0TxTcVNjZvEEC/c716U', 'pause', __filename);
// Script/pause.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgm = null;
        _this.isPaused = false;
        return _this;
    }
    NewClass.prototype.onLoad = function () {
        this.node.getChildByName('pause').active = false;
        cc.audioEngine.playMusic(this.bgm, true);
    };
    NewClass.prototype.start = function () {
        // Keydown event trigger
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    };
    NewClass.prototype.onDestroy = function () {
        cc.audioEngine.stopMusic();
    };
    NewClass.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case cc.macro.KEY.escape: {
                cc.log(this.isPaused);
                cc.log(this.node.parent);
                if (!this.isPaused) {
                    cc.log('pause');
                    if (this.node.parent.getChildByName('dialog-box') != null) {
                        this.node.parent.getChildByName('dialog-box').active = false;
                    }
                    cc.director.pause();
                    this.node.getChildByName('pause').active = true;
                    this.isPaused = true;
                }
                else {
                    cc.log('resume');
                    if (this.node.parent.getChildByName('dialog-box') != null) {
                        this.node.parent.getChildByName('dialog-box').active = true;
                    }
                    cc.director.resume();
                    this.node.getChildByName('pause').active = false;
                    this.isPaused = false;
                }
                break;
            }
        }
    };
    NewClass.prototype.pauseBtnClick = function (event, data) {
        if (data == 'resume') {
            cc.log('resume');
            if (this.node.parent.getChildByName('dialog-box') != null) {
                this.node.parent.getChildByName('dialog-box').active = true;
            }
            cc.director.resume();
            this.node.getChildByName('pause').active = false;
            this.isPaused = false;
        }
        else if (data == 'restart') {
            cc.log('restart');
            cc.director.resume();
            cc.find("SceneManager").getComponent("scene_manage").die_reload();
        }
        else if (data == 'exit') {
            cc.log('exit');
            cc.director.resume();
            cc.find("All Nodes").runAction(cc.sequence(cc.fadeOut(0.2), cc.callFunc(function () {
                cc.director.loadScene('chapter select');
            })));
        }
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], NewClass.prototype, "bgm", void 0);
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
        //# sourceMappingURL=pause.js.map
        