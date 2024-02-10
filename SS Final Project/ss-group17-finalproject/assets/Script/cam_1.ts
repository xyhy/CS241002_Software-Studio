
const {ccclass, property} = cc._decorator;

@ccclass
export default class cam_1 extends cc.Component {

    

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start(){

    }
    
    earthquake(){
        let movement = 3;
        let scale = 5;

        let startingPos = this.node.position;
        let startingScale = this.node.scaleY;
        let act = cc.spawn(
            cc.moveBy(0.02,2,0), 
            cc.scaleBy(0.025,this.getRandom(-scale, scale))
        );
        let act2 = cc.spawn(
            cc.moveBy(0.02,-2,0), 
            cc.scaleBy(0.025,this.getRandom(-scale, scale))
        );
        let act3 = cc.spawn(
            cc.moveBy(0.02,0,1), 
            cc.scaleBy(0.025,this.getRandom(-scale, scale))
        );
        let act4 = cc.spawn(
            cc.moveBy(0.02,0,-1), 
            cc.scaleBy(0.025,this.getRandom(-scale, scale))
        );
        let act_s = cc.sequence(act, act2, act3, act4);
        this.node.runAction(
            cc.sequence(
                act_s,
                act_s,
                act_s,
                act_s,
                act_s,
                act_s,
                act_s,
                act_s,
                act_s,
                act_s,
                act_s,
                act_s,
                act_s,
                act_s,
                act_s,
            )
        );
    }

    getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }
    // update (dt) {}
}
