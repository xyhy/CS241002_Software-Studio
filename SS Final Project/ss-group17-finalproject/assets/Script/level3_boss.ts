
const {ccclass, property} = cc._decorator;

@ccclass
export default class level3_boss extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    @property(cc.Node)
    player: cc.Node = null;

    @property({type:cc.AudioClip})
    hurt_sound: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    attack1_sound: cc.AudioClip = null;
    @property({type:cc.AudioClip})
    attack2_sound: cc.AudioClip = null;
    @property({type:cc.AudioClip})
    block_sound: cc.AudioClip = null;

    private scale_check = true;

    private life = 5;

    private anim;

    private registered = false;

    private detect_cooldown = false;

    private registered_2 = false;

    private registered_3 = false;

    private state = -1;

    private attack_set = ['attack_b3', 'attack2_b3'];

    private check_win = false;

    //-1: start
    //0: stop
    //1: run
    //2: attack
    //3: defence
    //4: hurt
    //5: win
    //6: lose


    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
    }


    start () {
        this.anim = this.getComponent(cc.Animation);
        this.anim.on('finished', this.return_idle, this);
        this.anim.play('start_b3');
        this.schedule(()=>{
            if(this.state == 0){
                this.check_scale();
            }
        }, 0.5);
        this.schedule(()=>{
            if(this.state == 0){
                this.run_to_player();
            }
        }, 4);
        this.schedule(()=>{
            if(this.state!=5 && this.state!=6)
                this.check_bullet();
        },0.2);
    }
    check_bullet(){
        this.player.parent.children.forEach((child)=>{
            if(child.name == 'bullet'){
                if(Math.abs(child.position.x - this.node.position.x) <= 150
                && ((child.position.x - this.node.position.x >=0
                && child.scaleX < 0) || (child.position.x - this.node.position.x < 0 && child.scaleX > 0))
                && Math.abs(child.position.y - this.node.position.y) <= 50 
                ){
                    var block_or_not = this.random_num(11);
                    //cc.log(block_or_not+'out');
                    if(block_or_not <= 8 && !this.detect_cooldown){
                        //cc.log(block_or_not);
                        this.detect_cooldown = true;
                        this.state = 3;
                        this.block();
                        this.scheduleOnce(()=>{
                            this.detect_cooldown = false;
                            //cc.log('set_back');
                        }, 1);
                    }
                }
            }
        });
    }
    block(){
        var s = this.anim.play('block_b3');
        cc.audioEngine.playEffect(this.block_sound, false);
        this.node.stopAllActions();

    }
    random_num(x){
        return Math.floor(Math.random() * x);
    }
    check_scale(){
        var now = this.player.position.x - this.node.position.x >= 0;
        if(this.scale_check != now && now == true){
            this.scale_check = now;
            this.node.scaleX = 2.5;
            this.node.position = cc.v2(this.node.position.x+35, this.node.position.y);
        }else if(this.scale_check != now && now == false){
            this.scale_check = now;
            this.node.scaleX = -2.5;
            this.node.position = cc.v2(this.node.position.x-35, this.node.position.y);
        }
    }
    run_to_player(){
        this.state = 1;
        var player_pos_x;
        this.check_scale();
        if(this.scale_check){
            player_pos_x = this.player.position.x - 50;
        }else{
            player_pos_x = this.player.position.x + 40;
        }
        var duration = Math.abs(this.node.position.x - player_pos_x)/200;
        this.anim.play('run_b3');
        var act1 = cc.moveTo(duration, cc.v2(player_pos_x, this.node.position.y));
        var act2 = cc.callFunc(()=>{
            if(Math.abs(this.player.position.x - player_pos_x) <= 60){
                this.boss_attack();
            }else{
                this.return_idle();
            }
        });
        this.node.runAction(cc.sequence(act1, act2));
    }
    return_idle(){
        if(this.state != 5 && this.state != 6){
            
            //this.anim.play('idle_b3');
            //this.state = 0;
            if(this.state == 3){
                this.run_to_player();
            }else{
                this.anim.play('idle_b3');
                this.state = 0;
            }
        }
    }
    detect_player(){
        var dis = Math.abs(this.player.position.x - this.node.position.x);
        if(dis <= 70 && this.state == 0){
            this.boss_attack();
        }
    }
    boss_attack(){
        this.state = 2;
        var num = this.random_num(2);
        this.anim.play(this.attack_set[num]);
        if(num == 0){
            this.scheduleOnce(()=>{
                this.check_win = true;
                cc.audioEngine.playEffect(this.attack1_sound, false);
            }, 0.32);
            this.scheduleOnce(()=>{
                this.check_win = false;
            }, 0.44);
            this.scheduleOnce(()=>{
                this.check_win = true;
                cc.audioEngine.playEffect(this.attack1_sound, false);
            }, 0.62);
            this.scheduleOnce(()=>{
                this.check_win = false;
            }, 0.7);
        }else if(num == 1){
            this.scheduleOnce(()=>{
                this.check_win = true;
                cc.audioEngine.playEffect(this.attack2_sound, false);
            }, 0.55);
            this.scheduleOnce(()=>{
                this.check_win = false;
            }, 0.69);
        }
    }
    update (dt) {
        if(this.state!=5 && this.state!=6){
            this.detect_player();
            if(this.check_win){
                this.check_player_killed();
            }
        }
    }
    
    onBeginContact(contact, self, other){
        if(other.node.name == 'player_boss'){
            contact.disabled = true;
        }else if(other.node.name == 'bullet'){
            if(this.state != 3 && this.state != 5 && this.state != 6){
                //this.state = 4;
                //this.anim.pause();
                cc.audioEngine.playEffect(this.hurt_sound, false);
                if(this.life > 1){
                    this.state = 4;
                    this.anim.play('hurt_b3');
                    this.life--;
                }else{
                    cc.log('lose');
                    this.state = 6;
                    this.anim.play('lose_b3');
                    this.node.stopAllActions();
                    this.scheduleOnce(()=>{
                        cc.find("SceneManager").getComponent("scene_manage").go_animation("animation4");
                    }, 2);
                }
            }
        }
    }
    check_player_killed(){
        if(this.player.position.x - this.node.position.x >= 0
            && this.player.position.x - this.node.position.x <= 80
            && this.node.scaleX > 0
            && Math.abs(this.player.position.y - this.node.position.y) <= 60){
                this.state = 5;
                this.anim.play('win_b3');
                this.player.getComponent('player_boss').dead = true;
            }
        if(this.player.position.x - this.node.position.x <= 0
            && this.player.position.x - this.node.position.x >= -80
            && this.node.scaleX < 0
            && Math.abs(this.player.position.y - this.node.position.y) <= 60){
                this.state = 5;
                this.anim.play('win_b3');
                this.player.getComponent('player_boss').dead = true;
            }    
            
    }
    onPreSolve(contact, self, other){
        if(other.node.name == 'player_boss')
            contact.disabled = true;
    }
}
