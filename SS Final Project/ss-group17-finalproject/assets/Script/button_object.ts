const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.String) class_name: string = '';
    @property({type:cc.AudioClip}) click_sound :cc.AudioClip = null;
    private pressed: boolean = false;

    start () {
        this.reset();
    }

    reset(){
        this.node.getComponent(cc.Animation).play("button_unpressed");
        this.pressed = false;
    }

    onBeginContact(contact:cc.PhysicsContact, self:cc.Collider, other:cc.Collider){
        if(!this.pressed && (other.node.name == "player" || other.node.name == "bullet")){
            this.node.parent.getComponent(this.class_name).button_pressed();
            this.pressed = true;
            this.node.getComponent(cc.Animation).play("button_pressed");
            cc.audioEngine.playEffect(this.click_sound, false);
        }
    }
}