import SceneManage from "./scene_manage";

const {ccclass, property} = cc._decorator;

@ccclass
export default class level1_boss extends cc.Component {

    @property(cc.Prefab)
    ball: cc.Prefab = null;

    @property(cc.Node)
    summon_effect: cc.Node = null;

    @property(cc.Node)
    thunder: cc.Node = null;

    @property({type:cc.AudioClip})
    thunder_sound: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    hurt_sound: cc.AudioClip = null;
    public anim = null;

    //public attack_anim = null;

    private state;

    private attack = false;

    private life = 3;

    private dead = false;

    private win = false;

    //public summon = null;

    start () {
        this.set_attack();
        //this.scheduleOnce(()=>{this.get_thunder();}, 2);
    }

    set_attack(){
        this.anim = this.getComponent(cc.Animation);
        this.anim.on('finished', this.set_anim, this);
        this.attack = true;
        this.anim.play('attack');
        this.get_thunder();
        this.summon_effect.getComponent(cc.Animation).play('summon');
        
        this.schedule(()=>{
            if(!this.anim.getAnimationState('attack').isPlaying && !this.dead)
            {
                this.anim.play('attack');
                this.attack = true;
                this.get_thunder();
                this.summon_effect.getComponent(cc.Animation).play('summon');
            }
        } ,15);
    }
    set_anim(){
        if(this.attack){
            this.gen_lavaball();
            this.attack = false;
        }
        if(!this.anim.getAnimationState('idle').isPlaying && !this.dead)
            this.anim.play('idle');
        
    }
    get_thunder(){
        var act1 = cc.fadeOut(0.2);
        var act2 = cc.callFunc(()=>{this.thunder.opacity = 255;});
        var act3 = cc.fadeOut(1);
        cc.audioEngine.playEffect(this.thunder_sound, false);
        this.thunder.opacity = 255;
        this.thunder.runAction(cc.sequence(act1, act2, act3));
    }

    gen_lavaball(){
        for(var i=0; i<10; i++){
            var new_ball = cc.instantiate(this.ball);
            new_ball.parent = cc.find('All Nodes/Canvas').parent;
        }
    }

    update (dt) {
        this.summon_effect.position = this.node.position;
    }
    onBeginContact(contact, self, other){
        if(other.node.name == 'player'){
            contact.disabled = true;
        }else if(other.node.name == 'bullet'){
            cc.log('boss hit');
            //this.anim.play('damage');
            cc.audioEngine.playEffect(this.hurt_sound, false);
            if(this.life > 1){
                this.life--;
                this.anim.play('damage');
            }else{
                if(!this.dead && !this.win){
                    this.anim.play('dead_b1');
                    this.dead = true;
                    this.scheduleOnce(()=>{
                        cc.find("SceneManager").getComponent("scene_manage").go_animation("animation1");
                    }, 2);
                }
            }
        }
    }
}
