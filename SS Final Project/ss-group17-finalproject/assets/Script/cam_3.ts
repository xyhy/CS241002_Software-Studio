import SceneManage from "./scene_manage";

const {ccclass, property} = cc._decorator;

@ccclass
export default class cam1_0 extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null;

    @property()
    left_limit: number = 0;

    @property()
    right_limit: number = 0;

    @property()
    up_limit: number = 0;

    @property()
    down_limit: number = 0;

    @property()
    is_3_4: boolean = false;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt) {
        var target_pos = this.player.getPosition();
        var cam_pos = this.node.position;
        var cam_x = (target_pos.x >= this.left_limit && target_pos.x <= this.right_limit)?target_pos.x:cam_pos.x;
        var cam_y = (target_pos.y >= this.down_limit && target_pos.y <= this.up_limit)?((this.is_3_4)?target_pos.y+100:target_pos.y):cam_pos.y;
        this.node.setPosition(cc.v2(cam_x, cam_y));
    }
}
