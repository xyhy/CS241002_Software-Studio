const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Boolean) is_checked :boolean = false;
    @property({type:cc.AudioClip}) check_sound :cc.AudioClip = null;

    start(){
        if(this.is_checked) this.node.getComponent(cc.Animation).play("flag_green_floating");
        else this.node.getComponent(cc.Animation).play("flag_floating");
    }

    onBeginContact(contact:cc.PhysicsContact, self:cc.Collider, other:cc.Collider){
        if(!this.is_checked && other.node.name == "player"){
            this.is_checked = true;
            this.node.getComponent(cc.Animation).play("flag_green_floating");
            cc.audioEngine.playEffect(this.check_sound, false);
            // cc.find("GameManager").getComponent("game_manage").checkpoint_update();
            cc.log("checkpoint_update!");
        }
    }
}
