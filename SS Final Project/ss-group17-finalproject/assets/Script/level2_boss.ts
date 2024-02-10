
const {ccclass, property} = cc._decorator;

@ccclass
export default class level2_boss extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null;

    @property(cc.Node)
    shadow: cc.Node = null;

    @property({type:cc.AudioClip})
    hurt_sound: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    dis_sound: cc.AudioClip = null;
    private life = 5;
    
    private anim;
    //-290, 230
    //80, 230
    //200, 25
    //-205, 55
    //-50, -35
    //-200, -165
    //90, -130
    private pos_set = [cc.v2(-290, 320), cc.v2(80, 325), cc.v2(200, 120), 
        cc.v2(-205, 150), cc.v2(-50, 55), 
        cc.v2(-200, -40), cc.v2(90, -35)];

    private state = 0;
    //0: not moving
    //1: playing moving anim
    //2: hit
    //3: dead
    //4: win
    
    private is_registered: boolean = false;

    private is_registered2: boolean = false;

    private player_cooldown: boolean = false;

    private detect_cooldown: boolean = false;

    start () {
        this.anim = this.getComponent(cc.Animation);
        this.anim.on('finished', this.set_anim, this);
        cc.director.getPhysicsManager().enabled = true;
        this.schedule(()=>{
            if(this.state != 3 && this.state != 4)
                this.check_bullet();
        },0.2);

    }
    set_anim(){
        if(this.state != 3 && this.state != 4){
            if(this.state == 2){
                if(this.life > 0){
                    this.state = 0;
                    this.set_move_anim();
                }
                else{
                    this.state = 3;
                    this.scheduleOnce(()=>{
                        cc.find("SceneManager").getComponent("scene_manage").go_animation("animation3");
                    }, 2);
                }
                return;
            }
            this.state = 0;
        }
    }
    random_num(x){
        return Math.floor(Math.random() * x);
    }
    check_bullet(){
        this.player.parent.children.forEach((child_node)=>{
            if(child_node.name == 'bullet'){
                if(Math.abs(child_node.position.x - this.node.position.x) <= 80
                && ((child_node.position.x - this.node.position.x >=0
                && child_node.scaleX < 0) || (child_node.position.x - this.node.position.x < 0 && child_node.scaleX > 0))
                && Math.abs(child_node.position.y - this.node.position.y) <= 50 
                ){
                    var move_or_not = this.random_num(11);
                    //cc.log(move_or_not+'out');
                    if(move_or_not <= 7 && !this.detect_cooldown){
                        //cc.log(move_or_not);
                        this.detect_cooldown = true;
                        if(this.state == 0){
                            this.set_move_anim();
                        }
                        //this.set_move_anim();
                        //this.move_pos();
                        this.scheduleOnce(()=>{
                            this.detect_cooldown = false;
                            //cc.log('set_back');
                        }, 1);
                    }
                }
            }
        });
    }
    check_player(){
        if(Math.abs(this.player.position.x - this.node.position.x) <= 100
        && Math.abs(this.player.position.y - this.node.position.y) <= 50 
        ){
            if(!this.player_cooldown){
                this.player_cooldown = true;
                if(this.state == 0){
                    this.set_move_anim();
                }
                this.scheduleOnce(()=>{
                    this.player_cooldown = false;
                    //cc.log('set_back');
                }, 1);
            }
        }
    }
    set_move_anim(){
        this.state = 1;
        cc.audioEngine.playEffect(this.dis_sound, false);
        //var s = this.anim.play('vanish_b2');
        this.shadow.position = this.node.position;
        this.move_pos();
        var s = this.anim.play('show_b2');
        this.shadow.getComponent(cc.Animation).play();

    }
    move_pos(){
        var new_pos = this.random_num(7);
        this.node.position = this.pos_set[new_pos];
    }
    check_scale(){
        if(this.player.position.x - this.node.position.x >= 0){
            this.node.scaleX = 1.5;
        }else{
            this.node.scaleX = -1.5;
        }
    }
    onBeginContact(contact, self, other){
        if(other.node.name == 'player_boss'){
            contact.disabled = true;
        }else if(other.node.name == 'bullet' && this.state != 3 && this.state !=4){
            //cc.log('boss hit');
            this.anim.play('hurt_b2');
            cc.audioEngine.playEffect(this.hurt_sound, false);
            this.state = 2;
            this.life--;
            cc.log(this.life);
        }
    }
    
    onPreSolve(contact, self, other){
        if(other.node.name == 'player_boss')
            contact.disabled = true;
    }

    animation_check(){
        if(this.state == 0 && !this.anim.getAnimationState('idle_b2').isPlaying){
            this.anim.play('idle_b2');
        }
    }

    update (dt) {
        //this.check_bullet();
        if(this.state != 3 && this.state != 4){
            this.check_scale();
            this.animation_check();
            this.check_player();
        }
    }
}
