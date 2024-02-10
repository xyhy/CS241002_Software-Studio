"use strict";
cc._RF.push(module, 'f2875Ip2I5GZZsxAdrYnqoV', 'brush_object');
// Script/brush_object.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BrushObject = /** @class */ (function (_super) {
    __extends(BrushObject, _super);
    function BrushObject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.brush_sound = null;
        _this.vanish_particle = null;
        _this.is_hiding = false;
        return _this;
    }
    BrushObject.prototype.start = function () {
        this.reset();
        this.object_floating();
    };
    BrushObject.prototype.reset = function () {
        this.is_hiding = false;
        this.unscheduleAllCallbacks();
        this.node.runAction(cc.show());
    };
    BrushObject.prototype.object_floating = function () {
        var a = cc.moveBy(1.5, cc.v2(0, 5));
        var b = cc.moveBy(1.5, cc.v2(0, -5));
        a.easing(cc.easeCubicActionInOut());
        b.easing(cc.easeCubicActionInOut());
        this.node.runAction(cc.repeatForever(cc.sequence(a, b)));
    };
    BrushObject.prototype.onBeginContact = function (contact, self, other) {
        if (!this.is_hiding && other.node.name == "player") {
            this.is_hiding = true;
            this.node.runAction(cc.hide());
            cc.audioEngine.playEffect(this.brush_sound, false);
            this.create_vanish_particle();
            if (cc.find('All Nodes/Canvas/Main Camera/brushUI') != null)
                cc.find('All Nodes/Canvas/Main Camera/brushUI').getComponent('brush_UI').createGraphics();
            else
                cc.log("brushUI is null!!!");
        }
    };
    BrushObject.prototype.create_vanish_particle = function () {
        var p = cc.instantiate(this.vanish_particle);
        p.position = this.node.position;
        this.node.parent.addChild(p);
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], BrushObject.prototype, "brush_sound", void 0);
    __decorate([
        property(cc.Prefab)
    ], BrushObject.prototype, "vanish_particle", void 0);
    BrushObject = __decorate([
        ccclass
    ], BrushObject);
    return BrushObject;
}(cc.Component));
exports.default = BrushObject;

cc._RF.pop();