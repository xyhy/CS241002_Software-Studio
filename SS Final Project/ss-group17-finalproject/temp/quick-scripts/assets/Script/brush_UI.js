(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/brush_UI.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7c662zcjPhCFrM1Mpq/kJJs', 'brush_UI', __filename);
// Script/brush_UI.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.graphics = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () {
        cc.director.getPhysicsManager().enabled = true;
        this.node.on(cc.Node.EventType.TOUCH_START, this.touch_start, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touch_move, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touch_end, this);
    };
    NewClass.prototype.start = function () {
        //this.createGraphics();
    };
    NewClass.prototype.touch_start = function (event) {
    };
    NewClass.prototype.touch_move = function (event) {
    };
    NewClass.prototype.touch_end = function (event) {
        //this.createGraphics();
    };
    NewClass.prototype.createGraphics = function () {
        var graphics_node = cc.instantiate(this.graphics);
        console.log("~~~~~~~~~~~~~~", graphics_node);
        graphics_node.x = 0;
        this.node.addChild(graphics_node);
    };
    __decorate([
        property(cc.Prefab)
    ], NewClass.prototype, "graphics", void 0);
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
        //# sourceMappingURL=brush_UI.js.map
        