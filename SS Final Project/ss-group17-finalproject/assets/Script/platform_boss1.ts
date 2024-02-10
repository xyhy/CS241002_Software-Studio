
const {ccclass, property} = cc._decorator;

@ccclass
export default class platform_boss1 extends cc.Component {

    public dir: number = null;

    
    private state: number = null;
    //1: spikes out

    private cooldown: number = 0;
    // LIFE-CYCLE CALLBACKS:

    

    start () {
        //this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 100);
        if(this.dir == 0)
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 70);
        else if(this.dir == 1)
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, -70);

    }
    
    update(dt){
        if(this.node.getChildByName('spikes'))
            this.state = this.node.getChildByName('spikes').getComponent('spikes').state;
    }
    
    onBeginContact(contact, self, other){
        if(other.node.name == 'ceiling'){
            cc.log('touched ceiling');
            this.destroy_plat();
            return;
        }
        if(other.node.name != 'player')
            contact.disabled = true;
        if(contact.getWorldManifold().normal.y == -1 || contact.getWorldManifold().normal.x == 1 || contact.getWorldManifold().normal.x == -1){
            contact.disabled = true;
        }
        if(other.node.name == 'player' && this.state && !this.cooldown){
            cc.log('in state = 1');
            this.cooldown = 1;
            //cc.log('player_score -= 100');
            other.getComponent('player_boss').dead = true;

            this.scheduleOnce(()=>{
                this.cooldown = 0;
            }, 1);
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
