(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/spikes.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '81abevdZy1JtLAoIrb7wJgt', 'spikes', __filename);
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
        //# sourceMappingURL=spikes.js.map
        