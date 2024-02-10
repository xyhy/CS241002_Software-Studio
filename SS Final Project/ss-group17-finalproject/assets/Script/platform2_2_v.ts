
const {ccclass, property} = cc._decorator;

@ccclass
export default class platform2_2_v extends cc.Component {
    

    start () {
        //this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 100);
        this.platformMove();

    }
    
    // update(dt){

    // }

    platformMove()
    {
        let easeRate: number = 5;
        var action = cc.repeatForever(
                cc.sequence(cc.moveBy(5,-350,0), cc.moveBy(2,0,500), cc.moveBy(2,0,-500), cc.moveBy(5,350,0))
            )
        action.easing(cc.easeInOut(easeRate));
        this.scheduleOnce(function(){
            this.node.runAction(action)
        }, 0.5);
    }
    
    onBeginContact(contact, self, other){
        if(other.node.name != 'player')
            contact.disabled = true;
        if(contact.getWorldManifold().normal.y == -1 || contact.getWorldManifold().normal.x == 1 || contact.getWorldManifold().normal.x == -1){
            contact.disabled = true;
        }
    }
    
    onPreSolve(contact, self, other){
        if(other.node.name != 'player')
            contact.disabled = true;
        if(contact.getWorldManifold().normal.y == -1 || contact.getWorldManifold().normal.x == 1 || contact.getWorldManifold().normal.x == -1){
            contact.disabled = true;
        }
        
        
    }

    destroy_plat(){
        cc.log('destroy');
        this.node.destroy();
    }
}
