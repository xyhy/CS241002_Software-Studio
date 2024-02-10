import SceneManage from "./scene_manage";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Strawberry extends cc.Component {
    @property({type:cc.SpriteFrame}) eaten: cc.SpriteFrame = null;
    @property({type:cc.SpriteFrame}) fresh: cc.SpriteFrame = null;
    @property(cc.Boolean) is_eaten :boolean = false;
    @property({type:cc.AudioClip}) eat_sound :cc.AudioClip = null;
    @property(cc.Prefab) vanish_particle :cc.Prefab = null;
    private is_hiding:boolean = false;

    start () {
        this.is_eaten = cc.find("SceneManager").getComponent("scene_manage").get_strawberry_state();
        this.reset();
        this.object_floating();
    }
    
    // update (dt) {}
    
    reset(){
        if(this.is_eaten) this.node.getComponent(cc.Sprite).spriteFrame = this.eaten; 
        else this.node.getComponent(cc.Sprite).spriteFrame = this.fresh;
        this.is_hiding = false;
        this.node.runAction(cc.show());
    }

    onBeginContact(contact:cc.PhysicsContact, self:cc.Collider, other:cc.Collider){
        if(!this.is_hiding && other.node.name == "player"){
            this.is_hiding = true;
            this.node.runAction(cc.hide());
            cc.audioEngine.playEffect(this.eat_sound, false);
            this.create_vanish_particle();
            if(!this.is_eaten) cc.find("SceneManager").getComponent("scene_manage").update_strawberry_state();
        }
    }

    object_floating() {
        let a = cc.moveBy(1.5, cc.v2(0,5));
        let b = cc.moveBy(1.5, cc.v2(0,-5));
        a.easing(cc.easeCubicActionInOut());
        b.easing(cc.easeCubicActionInOut());
        this.node.runAction(cc.repeatForever(cc.sequence(a,b)));
    }

    create_vanish_particle(){
        let p = cc.instantiate(this.vanish_particle);
        p.position = this.node.position;
        this.node.parent.addChild(p);
    }
}
