
const {ccclass, property} = cc._decorator;

@ccclass
export default class level1_boss extends cc.Component {

    private act_num: number = 1;

    @property(cc.Node)
    cam: cc.Node = null;

    

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
    }

    start () {
        var act = [cc.moveBy(2, 0, 300), cc.moveBy(2, 0, -300)];
        if(this.node.name == 'box'){
            this.schedule(()=>{
                this.cam.getComponent('cam_1').earthquake();
                this.node.runAction(act[this.act_num].easing(cc.easeInOut(2.5)));
                this.act_num = (this.act_num+1)%2;
            }, 9);

        }else if(this.node.name == 'box_player'){
            this.act_num = 0;
            this.schedule(()=>{
                this.cam.getComponent('cam_1').earthquake();
                this.node.runAction(act[this.act_num].easing(cc.easeInOut(3)));
                this.act_num = (this.act_num+1)%2;
            }, 7);
        }
    }

    
}
