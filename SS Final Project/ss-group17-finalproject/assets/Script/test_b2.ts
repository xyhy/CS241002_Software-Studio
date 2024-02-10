
const {ccclass, property} = cc._decorator;

@ccclass
export default class bullet_b_test extends cc.Component {

    
    
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        

    }
    shoot(x){
        var act = cc.moveBy(5, -1200, 0);
        var act2 = cc.moveBy(5, 1200, 0);
        var call = cc.callFunc(()=>{this.node.destroy();});
        if(x == 1){
            this.node.scaleX *= -1;
            this.node.runAction(cc.sequence(act2, call));
        }else if(x == 0){
            this.node.runAction(cc.sequence(act, call));
        }
    }

    random_pos(){
        return Math.random() * (850 - 400) + 400;
    }
    random_speed(){
        return Math.random() * (8 - 3) + 3;
    }
    onBeginContact(contact, self, other){
        if(other.node.name == 'boss'){
            //cc.log('player -= 100');
            //other.getComponent('player_boss').player_score -= 100;
            //this.node.destroy();
        }
    }
    // update (dt) {}
}
