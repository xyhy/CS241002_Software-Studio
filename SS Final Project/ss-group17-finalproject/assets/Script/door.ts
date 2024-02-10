const {ccclass, property} = cc._decorator;

@ccclass
export default class Door extends cc.Component {
    @property(cc.Float) duration :number = 2;
    @property({type:cc.AudioClip}) gate_open_sound :cc.AudioClip = null;
    @property(cc.Integer) button_number :number = 1;
    private is_opened :boolean = false;
    private mask :cc.Node = null;
    private body :cc.Node = null;
    private button :cc.Node = null;

    onLoad () {
        this.mask = this.node.getChildByName("mask");
        this.body = this.mask.getChildByName("body");
        this.button = this.node.getChildByName("button");
        this.mask.setContentSize(this.body.getContentSize());
        this.reset();
    }

    reset(){
        this.is_opened = false;
        this.body.position = cc.v2(0,0);
        if(this.body.getComponent(cc.PhysicsBoxCollider) == null){
            this.body.addComponent(cc.PhysicsBoxCollider);
            this.body.getComponent(cc.PhysicsBoxCollider).size = this.body.getContentSize();
            this.body.getComponent(cc.PhysicsBoxCollider).offset = cc.v2(0,0);
        }
        this.unscheduleAllCallbacks();
        this.button.getComponent("button_object").reset();
    }

    button_pressed(){
        if(!this.is_opened){
            this.button_number--;
            if(this.button_number == 0){
                this.is_opened = true;
                this.body.runAction(cc.moveBy(this.duration, 0, this.body.height));
                this.body.removeComponent(cc.PhysicsBoxCollider);
                cc.audioEngine.playEffect(this.gate_open_sound, false);
            }
        }
    }

    // update (dt) {}
}
