(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/spike2-1.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9774ft86NROV64iFxvHPuou', 'spike2-1', __filename);
// Script/spike2-1.ts

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
            _this.anim.play('spike_out 2-1');
            setTimeout(function () {
                _this.state = 1;
                //cc.log('out');
            }, 100);
            setTimeout(function () {
                _this.state = 0;
                //cc.log('in');
            }, 50);
        }, 3);
    };
    spikes = __decorate([
        ccclass
    ], spikes);
    return spikes;
}(cc.Component));
exports.default = spikes;

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
        //# sourceMappingURL=spike2-1.js.map
        