(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/brush.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '554b2koNH1JYYh0xHjoPWhH', 'brush', __filename);
// Script/brush.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.line_point = [];
        _this.graphics = null;
        _this.camera = null;
        _this.rigibodyLogic = null;
        _this.physicsLine = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () {
        this.node.width = cc.winSize.width;
        this.node.height = cc.winSize.height;
        this.graphics = this.getComponent(cc.Graphics);
    };
    NewClass.prototype.start = function () {
        this.onTouch();
        this.camera = cc.find('All Nodes/Canvas/Main Camera');
    };
    // update (dt) {}
    NewClass.prototype.onTouch = function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touch_start, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touch_move, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touch_end, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touch_end, this);
    };
    NewClass.prototype.offTouch = function () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.touch_start, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touch_move, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touch_end, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touch_end, this);
    };
    NewClass.prototype.touch_start = function (event) {
        var camera_pos = this.camera.getPosition();
        var pos = this.node.convertToNodeSpaceAR(event.getLocation());
        this.graphics.moveTo(camera_pos.x + pos.x, camera_pos.y + pos.y);
        this.line_point.push(cc.v2(camera_pos.x + pos.x, camera_pos.y + pos.y));
    };
    NewClass.prototype.touch_move = function (event) {
        //var camera_pos = this.camera.getPosition();
        //let pos = this.node.convertToNodeSpaceAR(event.getLocation());
        //this.graphics.lineTo(camera_pos.x + pos.x, camera_pos.y + pos.y);
        //this.line_point.push(cc.v2(camera_pos.x +pos.x, camera_pos.y + pos.y));
    };
    NewClass.prototype.touch_end = function (event) {
        var camera_pos = this.camera.getPosition();
        var pos = this.node.convertToNodeSpaceAR(event.getLocation());
        this.graphics.lineTo(camera_pos.x + pos.x, camera_pos.y + pos.y);
        this.line_point.push(cc.v2(camera_pos.x + pos.x, camera_pos.y + pos.y));
        this.graphics.stroke();
        this.createRigibody();
        this.offTouch();
    };
    NewClass.prototype.createRigibody = function () {
        cc.log(this.line_point);
        this.node.addComponent(cc.RigidBody);
        this.node.getComponent(cc.RigidBody).gravityScale = 4;
        this.node.addComponent("BrushPhysicsCollider");
        var physicsLine = this.node.getComponent("BrushPhysicsCollider");
        physicsLine.tag = 1;
        physicsLine.lineWidth = 6;
        physicsLine.points = this.line_point;
        physicsLine.friction = 0.2;
        physicsLine.density = 1;
        physicsLine.apply();
    };
    NewClass.prototype.checkIsCanDraw = function (lastPoint, nowPoint) {
        return lastPoint.sub(nowPoint).mag() >= 20;
    };
    __decorate([
        property({ type: [cc.Vec2] })
    ], NewClass.prototype, "line_point", void 0);
    __decorate([
        property(cc.Graphics)
    ], NewClass.prototype, "graphics", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "camera", void 0);
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
        //# sourceMappingURL=brush.js.map
        