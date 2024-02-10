(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/scene_manage.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8c585VAQEFI86hQQYaxXHp6', 'scene_manage', __filename);
// Script/scene_manage.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SceneManage = /** @class */ (function (_super) {
    __extends(SceneManage, _super);
    function SceneManage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.berry_count = null;
        _this.strawberry_count = 0;
        _this.first_time = true;
        return _this;
    }
    SceneManage.prototype.onLoad = function () {
        cc.game.addPersistRootNode(this.node);
    };
    SceneManage.prototype.start = function () {
        this.node.runAction(cc.fadeOut(2));
        this.strawberry_count = 0;
        this.strawberry_record = [[], [], []];
        this.level_record = [[], [], []];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 5; j++) {
                this.strawberry_record[i].push(false);
                this.level_record[i].push(false);
            }
        }
        this.level_record[0][0] = true;
        this.first_time = true;
    };
    SceneManage.prototype.change_scene = function (scene_name, type) {
        var _this = this;
        this.set_curtain_position();
        this.node.setContentSize(cc.winSize);
        cc.director.preloadScene(scene_name);
        this.node.stopAllActions();
        this.node.runAction(cc.fadeIn(0));
        if (type == "from_right") {
            var move_1 = cc.moveBy(0.5, cc.v2(-1 * cc.winSize.width, 0));
            move_1.easing(cc.easeSineOut());
            this.node.runAction(cc.sequence(cc.moveBy(0, cc.v2(cc.winSize.width, 0)), cc.show(), move_1, cc.callFunc(function () {
                cc.director.loadScene(scene_name, function () {
                    _this.set_curtain_position();
                    _this.node.runAction(cc.sequence(move_1, cc.hide()));
                    _this.create_strawberry_count();
                    _this.preload_next_level();
                });
            })));
        }
        else if (type == "from_left") {
            var move_2 = cc.moveBy(0.5, cc.v2(cc.winSize.width, 0));
            move_2.easing(cc.easeSineInOut());
            this.node.runAction(cc.sequence(cc.moveBy(0, cc.v2(-cc.winSize.width, 0)), cc.show(), move_2, cc.callFunc(function () {
                cc.director.loadScene(scene_name, function () {
                    _this.set_curtain_position();
                    _this.node.runAction(cc.sequence(move_2, cc.hide()));
                    _this.create_strawberry_count();
                    _this.preload_next_level();
                });
            })));
        }
        else if (type == "from_top") {
            var move_3 = cc.moveBy(0.5, cc.v2(0, -cc.winSize.height));
            move_3.easing(cc.easeSineInOut());
            this.node.runAction(cc.sequence(cc.moveBy(0, cc.v2(0, cc.winSize.height)), cc.show(), move_3, cc.callFunc(function () {
                cc.director.loadScene(scene_name, function () {
                    _this.set_curtain_position();
                    _this.node.runAction(cc.sequence(move_3, cc.hide()));
                    _this.create_strawberry_count();
                    _this.preload_next_level();
                });
            })));
        }
        else if (type == "from_bottom") {
            var move_4 = cc.moveBy(0.5, cc.v2(0, cc.winSize.height));
            move_4.easing(cc.easeSineInOut());
            this.node.runAction(cc.sequence(cc.moveBy(0, cc.v2(0, -cc.winSize.height)), cc.show(), move_4, cc.callFunc(function () {
                cc.director.loadScene(scene_name, function () {
                    _this.set_curtain_position();
                    _this.node.runAction(cc.sequence(move_4, cc.hide()));
                    _this.create_strawberry_count();
                    _this.preload_next_level();
                });
            })));
        }
        else if (type == "fade") {
            this.node.runAction(cc.sequence(cc.fadeIn(0.5), cc.callFunc(function () {
                cc.director.loadScene(scene_name, function () {
                    _this.node.runAction(cc.fadeOut(0.5));
                    _this.set_curtain_position();
                    _this.create_strawberry_count();
                    _this.preload_next_level();
                });
            })));
        }
        else {
            cc.log("Error: unknown transition type");
        }
    };
    SceneManage.prototype.die_reload = function () {
        this.first_time = false;
        this.change_scene(cc.director.getScene().name, "from_top");
    };
    SceneManage.prototype.update_strawberry_state = function () {
        if (cc.director.getScene().name[0] == 'a')
            return;
        var level = cc.director.getScene().name;
        if (!this.strawberry_record[parseInt(level[0]) - 1][parseInt(level[2]) - 1]) {
            this.strawberry_count++;
            this.strawberry_record[parseInt(level[0]) - 1][parseInt(level[2]) - 1] = true;
            cc.find("All Nodes/Canvas/Main Camera/strawberry_count").getComponent("strawberry_count").increase(this.strawberry_count);
        }
    };
    SceneManage.prototype.get_strawberry_state = function () {
        var level = cc.director.getScene().name;
        // cc.log("sc=" + this.strawberry_count);
        return this.strawberry_record[parseInt(level[0]) - 1][parseInt(level[2]) - 1];
    };
    SceneManage.prototype.create_strawberry_count = function () {
        if (cc.director.getScene().name[0] == 'a' || cc.director.getScene().name == 'final')
            return;
        var nd = cc.instantiate(this.berry_count);
        nd.name = "strawberry_count";
        cc.find("All Nodes/Canvas/Main Camera").addChild(nd);
        if (cc.director.getScene().name == "chapter select") {
            cc.find("All Nodes/Canvas/Main Camera/strawberry_count").getComponent("strawberry_count").show(this.strawberry_count);
        }
        cc.log("create_strawberry_count");
    };
    SceneManage.prototype.go_next_level = function (scene_name, type) {
        this.first_time = true;
        if (scene_name[0] == "b") {
            if (scene_name == "boss")
                this.level_record[0][4] = true;
            else if (scene_name == "boss_2")
                this.level_record[1][4] = true;
            else
                this.level_record[2][4] = true;
        }
        else {
            this.level_record[parseInt(scene_name[0]) - 1][parseInt(scene_name[2]) - 1] = true;
        }
        this.change_scene(scene_name, type);
    };
    SceneManage.prototype.enter_selected_level = function (scene_name) {
        this.first_time = true;
        this.change_scene(scene_name, "fade");
    };
    SceneManage.prototype.go_animation = function (scene_name) {
        this.first_time = true;
        this.change_scene(scene_name, "fade");
    };
    SceneManage.prototype.set_curtain_position = function () {
        if (cc.director.getScene().name[0] == "a" || cc.director.getScene().name == "final")
            this.node.position = cc.find("Canvas/Main Camera").position.add(cc.v2(480, 320));
        else
            this.node.position = cc.find("All Nodes/Canvas/Main Camera").position.add(cc.v2(480, 320));
    };
    SceneManage.prototype.get_level_record = function () {
        return this.level_record;
    };
    SceneManage.prototype.preload_next_level = function () {
        var name = cc.director.getScene().name;
        switch (name) {
            case "1-1":
                cc.director.preloadScene("1-2");
                break;
            case "1-2":
                cc.director.preloadScene("1-3");
                break;
            case "1-3":
                cc.director.preloadScene("1-4");
                break;
            case "1-4":
                cc.director.preloadScene("boss");
                break;
            case "boss":
                cc.director.preloadScene("animation1");
                break;
            case "animation1":
                cc.director.preloadScene("animation2");
                break;
            case "animation2":
                cc.director.preloadScene("2-1");
                break;
            case "2-1":
                cc.director.preloadScene("2-2");
                break;
            case "2-2":
                cc.director.preloadScene("2-3");
                break;
            case "2-3":
                cc.director.preloadScene("2-4");
                break;
            case "2-4":
                cc.director.preloadScene("boss_2");
                break;
            case "boss_2":
                cc.director.preloadScene("animation3");
                break;
            case "animation3":
                cc.director.preloadScene("3-1");
                break;
            case "3-1":
                cc.director.preloadScene("3-2");
                break;
            case "3-2":
                cc.director.preloadScene("3-3");
                break;
            case "3-3":
                cc.director.preloadScene("3-4");
                break;
            case "3-4":
                cc.director.preloadScene("boss_3");
                break;
            case "boss_3":
                cc.director.preloadScene("animation4");
                break;
            case "animation4":
                cc.director.preloadScene("final");
                break;
            case "final":
                cc.director.preloadScene("chapter select");
                break;
            default: break;
        }
    };
    SceneManage.prototype.get_first_time = function () {
        return this.first_time;
    };
    __decorate([
        property(cc.Prefab)
    ], SceneManage.prototype, "berry_count", void 0);
    SceneManage = __decorate([
        ccclass
    ], SceneManage);
    return SceneManage;
}(cc.Component));
exports.default = SceneManage;

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
        //# sourceMappingURL=scene_manage.js.map
        