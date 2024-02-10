
const {ccclass, property} = cc._decorator;

@ccclass
export default class cam_ch1 extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null;

    public scene_name;
    

    start () {
        this.scene_name = cc.director.getScene().name;
    }

    update (dt) {
        if(this.scene_name == '1-1'){
            let tar_pos = this.player.getPosition();
            let this_pos = this.node.position;
            if(tar_pos.x >= -140 && tar_pos.x <= 230)
                this.node.setPosition(cc.v2(tar_pos.x, this_pos.y));
        }else if(this.scene_name == '1-2'){
            let tar_pos = this.player.getPosition();
            let this_pos = this.node.position;
            if(tar_pos.x >= 13 && tar_pos.x <= 190)
                this.node.setPosition(cc.v2(tar_pos.x, this_pos.y));
        }else if(this.scene_name == '1-3'){
            let tar_pos = this.player.getPosition();
            let this_pos = this.node.position;
            if(tar_pos.x >= -5 && tar_pos.x <= 955)
                this.node.setPosition(cc.v2(tar_pos.x, this_pos.y));
        }else if(this.scene_name == '1-4'){
            let tar_pos = this.player.getPosition();
            let this_pos = this.node.position;
            if(tar_pos.x >= 11 && tar_pos.x <= 2880)
                this.node.setPosition(cc.v2(tar_pos.x, this_pos.y));
        }

    }
}
