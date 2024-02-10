const {ccclass, property} = cc._decorator;

@ccclass
export default class BrushObject extends cc.Component {
    @property({type:cc.AudioClip}) brush_sound :cc.AudioClip = null;
    @property(cc.Prefab) vanish_particle :cc.Prefab = null;
    private is_hiding = false;

    start () {
        this.reset();
        this.object_floating();
    }

    reset(){
        this.is_hiding = false;
        this.unscheduleAllCallbacks();
        this.node.runAction(cc.show());
    }

    object_floating() {
        let a = cc.moveBy(1.5, cc.v2(0,5));
        let b = cc.moveBy(1.5, cc.v2(0,-5));
        a.easing(cc.easeCubicActionInOut());
        b.easing(cc.easeCubicActionInOut());
        this.node.runAction(cc.repeatForever(cc.sequence(a,b)));
    }

    onBeginContact(contact:cc.PhysicsContact, self:cc.Collider, other:cc.Collider){
        if(!this.is_hiding && other.node.name == "player"){
            this.is_hiding = true;
            this.node.runAction(cc.hide());
            cc.audioEngine.playEffect(this.brush_sound, false);
            this.create_vanish_particle();
            if(cc.find('All Nodes/Canvas/Main Camera/brushUI') != null) cc.find('All Nodes/Canvas/Main Camera/brushUI').getComponent('brush_UI').createGraphics();
            else cc.log("brushUI is null!!!");
        }
    }

    create_vanish_particle(){
        let p = cc.instantiate(this.vanish_particle);
        p.position = this.node.position;
        this.node.parent.addChild(p);
    }
}
