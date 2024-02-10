const {ccclass, property} = cc._decorator;

@ccclass
export default class turtle extends cc.Component {


    private anim = null; //this will use to get animation component

    private animateState = null; //this will use to record animationState
    
    private rebornPos = null;

    private isDead = true;

    onLoad() {
        this.anim = this.getComponent(cc.Animation);
    }

    start() {
        this.rebornPos = this.node.position;
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-50, 0);
        this.isDead = false;
        this.animateState = this.anim.play('Turtle_anim');
    }

    update(dt) {
        if(this.isDead) {
            this.resetPos();
            this.isDead = false;
        }
        this.movement();
    }

    public resetPos() {
        this.node.position = this.rebornPos;
        this.node.scaleX = 1;
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-50, 0);
    }

    movement(){
        if(this.node.position.x < this.rebornPos.x-100){
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(50, 0);
        }else if(this.node.position.x > this.rebornPos.x+100){
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-50, 0);
        }
    }

    onBeginContact(contact, self, other) {
        if(other.node.name =="player"){
            if(contact.getWorldManifold().normal.y==1){ // Mario is on top of mushroom.
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
                this.isDead = true;
            }
            else{
                // Mario dead.
            }
        }
    } // end onBeginContact.

}