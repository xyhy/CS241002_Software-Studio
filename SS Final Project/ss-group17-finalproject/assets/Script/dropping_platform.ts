const {ccclass, property} = cc._decorator;

@ccclass
export default class DroppingPlatform extends cc.Component {
    private dropped :boolean = false;
    private stick :boolean = false;
    private original_position: cc.Vec2 = null;
    start () {
        this.original_position = this.node.position;
        this.reset();
    }

    reset(){
        this.node.position = this.original_position;
        this.dropped = false;
        this.stick = true;
        this.node.getComponent(cc.RigidBody).type = cc.RigidBodyType.Kinematic;
        this.unscheduleAllCallbacks();
    }
    
    onBeginContact(contact:cc.PhysicsContact, self:cc.Collider, other:cc.Collider){
        if(!this.dropped && other.node.name == "player" && contact.getWorldManifold().normal.y > 0.8){
            this.dropped = true;
            this.node.runAction(cc.repeat(cc.sequence(cc.rotateBy(0.03, 3),cc.rotateBy(0.06, -6),cc.rotateBy(0.03, 3)), 1));
            this.scheduleOnce(()=>{
                this.stick = false;
                this.node.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic;
            }, 0.5);
        }
    }
}
