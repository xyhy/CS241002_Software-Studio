const {ccclass, property} = cc._decorator;

@ccclass
export default class turtle extends cc.Component {


    private anim = null; //this will use to get animation component

    private animateState = null; //this will use to record animationState
    
    private rebornPos = null;

    onLoad() {
        this.anim = this.getComponent(cc.Animation);
    }

    start() {
        this.rebornPos = this.node.position;
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 10);
        this.animateState = this.anim.play('Turtle_anim');
    }

    update(dt) {
        this.movement();
    }

    public resetPos() {
        this.node.position = this.rebornPos;
        this.node.scaleX = 1;
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 10);
    }

    movement(){
        if(this.node.position.y < this.rebornPos.y){
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 10);
        }else if(this.node.position.y > this.rebornPos.y+40){
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, -10);
        }
    }

    onBeginContact(contact, self, other) {
        
    } // end onBeginContact.

}