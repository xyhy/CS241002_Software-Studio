"use strict";
cc._RF.push(module, 'b8231AYC0dDWKCddd9rFVb3', 'saw_blade');
// Script/saw_blade.ts

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SawBlade = /** @class */ (function (_super) {
    __extends(SawBlade, _super);
    function SawBlade() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SawBlade.prototype.onLoad = function () {
        this.node.getComponent(cc.PhysicsCircleCollider).radius = this.node.width / 2;
    };
    SawBlade.prototype.start = function () {
        this.node.runAction(cc.repeatForever(cc.rotateBy(0.2, 360)));
    };
    SawBlade = __decorate([
        ccclass
    ], SawBlade);
    return SawBlade;
}(cc.Component));
exports.default = SawBlade;

cc._RF.pop();