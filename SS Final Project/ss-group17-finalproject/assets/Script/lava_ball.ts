
const {ccclass, property} = cc._decorator;

@ccclass
export default class lava_ball extends cc.Component {

    
    
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        var act = cc.moveBy(this.random_speed(), -1200, -600);
        var call = cc.callFunc(()=>{this.node.destroy();});
        this.node.position = cc.v2(1035, this.random_pos());
        this.node.runAction(cc.sequence(act, call));

    }

    random_pos(){
        return Math.random() * (850 - 400) + 400;
    }
    random_speed(){
        return Math.random() * (8 - 3) + 3;
    }
    onBeginContact(contact, self, other){
        if(other.node.name == 'player'){
            cc.log('player -= 100');
            other.getComponent('player_boss').player_score -= 100;
            this.node.destroy();
        }
    }
    // update (dt) {}
}
