
const {ccclass, property} = cc._decorator;

@ccclass
export default class lava_ball_1_4 extends cc.Component {

    

    start () {
        var act = cc.moveBy(this.random_speed(), -5000, 0);
        var call = cc.callFunc(()=>{this.node.destroy();});
        this.node.position = cc.v2(3900, this.random_pos());
        this.node.runAction(cc.sequence(act, call));

    }
    random_pos(){
        return Math.random() * (650 - 100) + 100;
    }
    random_speed(){
        return Math.random() * (24 - 10) + 10;
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
