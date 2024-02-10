
const {ccclass, property} = cc._decorator;

@ccclass
export default class cam2_1 extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        
    }

    update (dt) {
        let tar_pos = this.player.getPosition();
        let this_pos = this.node.position;
        if(tar_pos.y >= 35 && tar_pos.y <= 2500)
            this.node.setPosition(cc.v2(this_pos.x, tar_pos.y));
    }
}
