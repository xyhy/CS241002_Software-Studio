const {ccclass, property} = cc._decorator;

@ccclass
export default class WindBarrel extends cc.Component {

    @property(cc.Float) effect_length: number = 100;
    @property(cc.Float) wind_force: number = 100;
    @property(cc.Prefab) wind_effect :cc.Prefab = null;
    @property({type:cc.AudioClip}) wind_sound :cc.AudioClip = null;
    private player_on = false;
    private player_ref :cc.Node = null;
    private angle = 0;
    private audio_id = -1;

    update(){
        if(this.player_on){
            let dist = this.player_ref.position.add(this.node.position.neg()).mag() - this.node.height/2 - this.player_ref.height/2;
            let f :cc.Vec2;
            let rate :number;
            // cc.log("dist:" + dist);
            if(dist < this.effect_length/4) rate = 1.2;
            else if(dist < this.effect_length/2) rate = 1;
            else if(dist < this.effect_length) rate = (this.effect_length - dist)/this.effect_length * 1.8 + 0.1; 
            else rate = 0;
            // cc.log("rate:" + rate);
            f = cc.v2(Math.cos(this.angle)/3,Math.sin(this.angle)).mul(this.wind_force * rate);
            this.player_ref.getComponent("player_boss").call_wind_floating(f, true);
        }
    }

    onLoad () {
        let sensors = this.getComponents(cc.PhysicsBoxCollider);
        let org_sw = sensors[0].size.width;
        sensors[1].size = cc.size(org_sw, this.effect_length*2);
        sensors[1].offset = cc.v2(0, this.node.height + this.effect_length);
        this.angle = (this.node.angle+90)/180*Math.PI;
    }

    start(){
        this.wind_effect_setting();
    }

    onBeginContact(contact:cc.PhysicsContact, self:cc.PhysicsBoxCollider, other:cc.Collider){
        if(self.sensor && other.node.name == "player"){
            this.player_on = true;
            this.player_ref = other.node;
            this.audio_id = cc.audioEngine.playEffect(this.wind_sound, true);
        }
    }

    onEndContact(contact:cc.PhysicsContact, self:cc.PhysicsBoxCollider, other:cc.Collider){
        if(self.sensor && other.node.name == "player"){
            this.player_on = false;
            other.node.getComponent("player_boss").call_wind_floating(cc.v2(0,0), false);
            cc.audioEngine.stopEffect(this.audio_id);
        }
    }

    wind_effect_setting(){
        // let delay = [0, 2, 1.4, 0.6];
        let interval = this.effect_length/200;
        let path = cc.v2(0,this.node.height/2 + this.effect_length);
        let move = cc.moveBy(interval, path);
        let back = cc.moveBy(0.5,path.neg());
        let back_and_forth = cc.sequence(cc.show(), move, cc.hide(), back);

        for(let i=0;i<8;i++){
            let target = this.node.getChildByName("wind_effect_" + i);
            if(target == null){
                target = cc.instantiate(this.wind_effect);
                target.name = "wind_effect_" + i;
                this.node.addChild(target);
            }
            target.runAction(cc.hide());
            target.position = cc.v2(this.node.width*(i-3.5)/9,this.node.height/2);
            target.runAction(cc.repeatForever(back_and_forth));
        }
    }
}