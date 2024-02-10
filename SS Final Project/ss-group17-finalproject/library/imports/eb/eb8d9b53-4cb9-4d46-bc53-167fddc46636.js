"use strict";
cc._RF.push(module, 'eb8d9tTTLlNRrxTFn/dxGY2', 'lava_gen_1_4');
// Script/lava_gen_1_4.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var lava_gen_1_4 = /** @class */ (function (_super) {
    __extends(lava_gen_1_4, _super);
    function lava_gen_1_4() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lava_ball = null;
        return _this;
        // update (dt) {}
    }
    lava_gen_1_4.prototype.start = function () {
        var _this = this;
        for (var i = 0; i < 4; i++) {
            var new_lava = cc.instantiate(this.lava_ball);
            new_lava.parent = this.node.parent;
        }
        this.schedule(function () {
            for (var i = 0; i < 4; i++) {
                var new_lava = cc.instantiate(_this.lava_ball);
                new_lava.parent = _this.node.parent;
            }
        }, 10);
    };
    __decorate([
        property(cc.Prefab)
    ], lava_gen_1_4.prototype, "lava_ball", void 0);
    lava_gen_1_4 = __decorate([
        ccclass
    ], lava_gen_1_4);
    return lava_gen_1_4;
}(cc.Component));
exports.default = lava_gen_1_4;

cc._RF.pop();