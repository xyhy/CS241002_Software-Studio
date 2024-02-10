const {ccclass, property} = cc._decorator;

@ccclass
export default class RegainGem extends cc.Component {
    @property({type:cc.AudioClip}) regain_gem_sound :cc.AudioClip = null;
    @property(cc.Prefab) vanish_particle :cc.Prefab = null;
    private is_hiding:boolean = false;

    onLoad () {
        this.reset();
        this.object_floating();
    }

    // update (dt) {}

    reset(){
        this.is_hiding = false;
        this.unscheduleAllCallbacks();
        this.node.runAction(cc.show());
    }

    onBeginContact(contact:cc.PhysicsContact, self:cc.Collider, other:cc.Collider){
        if(!this.is_hiding && other.node.name == "player"){
            other.node.getComponent("player_boss").regain();
            // cc.log("player regain");

            this.is_hiding = true;
            cc.audioEngine.playEffect(this.regain_gem_sound, false);
            this.create_vanish_particle();
            this.scheduleOnce(()=>{
                this.node.runAction(cc.show());
                this.is_hiding = false;
            },5);
            this.node.runAction(cc.hide());
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
