(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/regain_gem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '94b57BUzjZAzox2kNO3mJiy', 'regain_gem', __filename);
// Script/regain_gem.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RegainGem = /** @class */ (function (_super) {
    __extends(RegainGem, _super);
    function RegainGem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.regain_gem_sound = null;
        _this.vanish_particle = null;
        _this.is_hiding = false;
        return _this;
    }
    RegainGem.prototype.onLoad = function () {
        this.reset();
        this.object_floating();
    };
    // update (dt) {}
    RegainGem.prototype.reset = function () {
        this.is_hiding = false;
        this.unscheduleAllCallbacks();
        this.node.runAction(cc.show());
    };
    RegainGem.prototype.onBeginContact = function (contact, self, other) {
        var _this = this;
        if (!this.is_hiding && other.node.name == "player") {
            other.node.getComponent("player_boss").regain();
            // cc.log("player regain");
            this.is_hiding = true;
            cc.audioEngine.playEffect(this.regain_gem_sound, false);
            this.create_vanish_particle();
            this.scheduleOnce(function () {
                _this.node.runAction(cc.show());
                _this.is_hiding = false;
            }, 5);
            this.node.runAction(cc.hide());
        }
    };
    RegainGem.prototype.object_floating = function () {
        var a = cc.moveBy(1.5, cc.v2(0, 5));
        var b = cc.moveBy(1.5, cc.v2(0, -5));
        a.easing(cc.easeCubicActionInOut());
        b.easing(cc.easeCubicActionInOut());
        this.node.runAction(cc.repeatForever(cc.sequence(a, b)));
    };
    RegainGem.prototype.create_vanish_particle = function () {
        var p = cc.instantiate(this.vanish_particle);
        p.position = this.node.position;
        this.node.parent.addChild(p);
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], RegainGem.prototype, "regain_gem_sound", void 0);
    __decorate([
        property(cc.Prefab)
    ], RegainGem.prototype, "vanish_particle", void 0);
    RegainGem = __decorate([
        ccclass
    ], RegainGem);
    return RegainGem;
}(cc.Component));
exports.default = RegainGem;

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
        //# sourceMappingURL=regain_gem.js.map
        