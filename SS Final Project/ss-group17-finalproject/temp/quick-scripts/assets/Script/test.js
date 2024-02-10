(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/test.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '801d2KpFJJPzrOP/3i5WSnE', 'test', __filename);
// Script/test.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SearchLight = /** @class */ (function (_super) {
    __extends(SearchLight, _super);
    function SearchLight() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.light_strength = 0.05;
        return _this;
    }
    SearchLight.prototype.start = function () {
        var _this = this;
        this._materi = this.node.getComponent(cc.Sprite).getMaterial(0);
        // 计算窗口或界面的宽高比，该例子是屏幕的宽高比
        var ratio = cc.winSize.width / cc.winSize.height;
        // 获取材质并初始化纹理的各个属性
        // 屏幕宽高比，用于纠正坐标
        this._materi.setProperty("wh_ratio", ratio);
        // 光源半径
        this._materi.setProperty("light_radius", 0.02);
        // 光源中心点，默认设置到屏幕外
        this._materi.setProperty("light_center", cc.v2(2.0, 2.0));
        // 环境光强度，就是光源没照到的地方亮度。
        this._materi.setProperty("ambient_strength", 0.05);
        // 光源强度，这里设置为最大1。
        this._materi.setProperty("light_strength", 1);
        // 光源颜色，这里设置为白光
        this._materi.setProperty("light_color", new cc.Vec4(1, 0, 0, 1));
        this.scheduleOnce(function () { _this.start_to_light(); }, 5);
    };
    SearchLight.prototype.update = function (dt) {
        var player_node = cc.find('All Nodes/Canvas/player');
        var center = this.getLightCenter(this.node.convertToWorldSpaceAR(player_node.position));
        this._materi.setProperty("light_center", center);
    };
    SearchLight.prototype.start_to_light = function () {
        var _this = this;
        this.schedule(function () {
            if (_this.light_strength >= 1) {
                _this.light_strength = 1;
            }
            else {
                _this.light_strength += 0.05;
            }
            _this._materi.setProperty("ambient_strength", _this.light_strength);
        }, 0.05);
    };
    /** 根据touch坐标计算光源中心点 */
    SearchLight.prototype.getLightCenter = function (pos) {
        var x = pos.x / (cc.winSize.width / 2) - 1;
        var y = pos.y / (cc.winSize.height / 2) - 1;
        return cc.v2(x, y);
    };
    SearchLight = __decorate([
        ccclass
    ], SearchLight);
    return SearchLight;
}(cc.Component));
exports.default = SearchLight;

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
        //# sourceMappingURL=test.js.map
        