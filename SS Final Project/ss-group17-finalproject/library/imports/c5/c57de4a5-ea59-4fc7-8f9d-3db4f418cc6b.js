"use strict";
cc._RF.push(module, 'c57deSl6llPx4+dPbT0GMxr', 'plat_gen');
// Script/plat_gen.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var plat_gen = /** @class */ (function (_super) {
    __extends(plat_gen, _super);
    function plat_gen() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.platform = [];
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    plat_gen.prototype.start = function () {
        var _this = this;
        this.generate_up();
        this.schedule(this.generate_up, 3);
        setTimeout(function () {
            _this.generate_down();
            _this.schedule(_this.generate_down, 3);
        }, 1000);
    };
    plat_gen.prototype.generate_up = function () {
        var new_type = 0;
        var new_plat = cc.instantiate(this.platform[new_type]);
        new_plat.position = this.node.convertToNodeSpaceAR(cc.v2(this.random_x(170, 401), -180));
        new_plat.getComponent('platform_boss1').dir = 0;
        new_plat.getComponent('platform_boss1').type = new_type;
        new_plat.parent = this.node;
    };
    plat_gen.prototype.generate_down = function () {
        var new_type = this.random_platform();
        var new_plat = cc.instantiate(this.platform[new_type]);
        new_plat.position = this.node.convertToNodeSpaceAR(cc.v2(this.random_x(550, 721), 800));
        new_plat.getComponent('platform_boss1').dir = 1;
        new_plat.getComponent('platform_boss1').type = new_type;
        new_plat.parent = this.node;
    };
    plat_gen.prototype.random_platform = function () {
        return Math.floor(Math.random() * 2);
    };
    // update (dt) {}
    plat_gen.prototype.random_x = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    __decorate([
        property([cc.Prefab])
    ], plat_gen.prototype, "platform", void 0);
    plat_gen = __decorate([
        ccclass
    ], plat_gen);
    return plat_gen;
}(cc.Component));
exports.default = plat_gen;
//up: 170~400 y = -180
//down: 550~720 y = 800

cc._RF.pop();