const {ccclass, property} = cc._decorator;

@ccclass
export default class Spring extends cc.Component {
    @property(cc.Boolean) is_vertical: boolean = true;
    @property(cc.Integer) jump_force: number = 20;
    @property({type:cc.AudioClip}) spring_jump_sound :cc.AudioClip = null;
    private time_buffer = false;

    onBeginContact(contact:cc.PhysicsContact, self:cc.Collider, other:cc.Collider){
        if(other.node.name == "player" && !this.time_buffer){
            // cc.log("("+contact.getWorldManifold().normal.x + "," + contact.getWorldManifold().normal.y + ")");
            let other_pos = other.node.position;
            let my_pos = this.node.position;
            if(this.is_vertical && (other_pos.y > my_pos.y + this.node.height/2 || other_pos.y < my_pos.y - this.node.height/2)){
                let dir = (other_pos.y > my_pos.y)? 1 : -1;
                other.node.getComponent("player_boss").call_spring_jump(cc.v2(0, this.jump_force * dir));
                this.node.getComponent(cc.Animation).play("spring_dwai");
                cc.audioEngine.playEffect(this.spring_jump_sound, false);
                this.time_buffer = true;
                this.scheduleOnce(()=>{this.time_buffer = false}, 0.1);
            }
            else if(!this.is_vertical && (other_pos.x > my_pos.x + this.node.width/2 || other_pos.x < my_pos.x - this.node.width/2)){
                let dir = (other_pos.x > my_pos.x)? 1 : -1;
                other.node.getComponent("player_boss").call_spring_jump(cc.v2(this.jump_force*dir/2, this.jump_force));
                this.node.getComponent(cc.Animation).play("spring_dwai");
                cc.audioEngine.playEffect(this.spring_jump_sound, false);
                this.time_buffer = true;
                this.scheduleOnce(()=>{this.time_buffer = false}, 0.1);
            }
            else{
                // cc.log("hit middle of spring");
            }
        }
    }
}
