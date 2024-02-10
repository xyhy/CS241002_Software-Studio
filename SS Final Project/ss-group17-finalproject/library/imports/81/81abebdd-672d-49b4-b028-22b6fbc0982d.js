"use strict";
cc._RF.push(module, '81abevdZy1JtLAoIrb7wJgt', 'spikes');
// Script/spikes.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var spikes = /** @class */ (function (_super) {
    __extends(spikes, _super);
    function spikes() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = null;
        _this.anim = null;
        return _this;
    }
    spikes.prototype.start = function () {
        var _this = this;
        this.state = 0;
        this.anim = this.getComponent(cc.Animation);
        this.schedule(function () {
            _this.anim.play('spike_out');
            setTimeout(function () {
                _this.state = 1;
                //cc.log('out');
            }, 440);
            setTimeout(function () {
                _this.state = 0;
                //cc.log('in');
            }, 1500);
        }, 6);
    };
    spikes = __decorate([
        ccclass
    ], spikes);
    return spikes;
}(cc.Component));
exports.default = spikes;

cc._RF.pop();