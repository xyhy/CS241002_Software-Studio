
const {ccclass, property} = cc._decorator;

@ccclass
export default class player_boss extends cc.Component 
{
    @property({type:cc.AudioClip})
    walk_sound :cc.AudioClip = null;

    @property({type:cc.AudioClip})
    jump_sound :cc.AudioClip = null;

    @property({type:cc.AudioClip})
    hang_sound :cc.AudioClip = null;

    @property({type:cc.AudioClip})
    shoot_sound :cc.AudioClip = null;

    @property({type:cc.AudioClip})
    onground_sound :cc.AudioClip = null;

    @property({type:cc.AudioClip})
    death_sound :cc.AudioClip = null;

    @property()
    public maxSpeedX: number = 0;
    @property()
    public maxSpeedY: number = 900;

    @property()
    public dashSpeed: number = 60;

    
    @property()
    public upA: number = 0;
    @property()
    public downA: number = 0;

    @property()
    public jump_speed: number = 900;
    
    @property(cc.Prefab)
    private bulletPrefab: cc.Prefab = null;

    private _currentSpeedX: number = 0;
    //private _currentSpeedY: number = 0;

    public player_score = 50000;
    private anim;
    private up = false;
    private shoot = false;
    private left: number = 0;
    private right: number = 0;

    private dead: boolean = false;

    private onGround = false;
    private onGroundSound = false;

    private airshoot: boolean = false;

    
    private rebornPosition = cc.v2();

    private spring_jumping: boolean = false; 
    private spring_force: cc.Vec2 = cc.v2();
    private wind_floating: boolean = false;
    private wind_force: cc.Vec2 = cc.v2();
    private is_falling = false;

    private hanging = false;
    private play_hang = false;

    onload() {
        //this.anim = this.getComponent(cc.Animation);

    }

    start() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.rebornPosition = this.node.position;
        this.anim = this.getComponent(cc.Animation);
        
    }

    update(dt) {
        if(this.dead){
            this.player_dead();
        }else{
            this.playermoveX();
            this.playermoveY();
            this.object_effect();
            this.playerAnimation();
            this.hang_pos();
            //this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this._currentSpeedX, this._currentSpeedY);
            this.node.x += this._currentSpeedX;
        }
        
    }
    hang_pos(){
        if(this.hanging){
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
        }
    }
    onKeyDown(event) 
    {
        if(event.keyCode == cc.macro.KEY.left) {
            if(this.hanging && this.node.scaleX > 0){
                this.hanging = false;
            }
            this.left = 1;
            this.right = 0;
            /*
            if(this.right==1 || this.right==2) this.right = 2;
            else this.right = 0;
*/
        }
        if(event.keyCode == cc.macro.KEY.right) {
            if(this.hanging && this.node.scaleX < 0){
                this.hanging = false;
            }
            this.right = 1;
            this.left = 0;
            /*
            if(this.left==1 || this.left==2) this.left = 2;
            else this.left = 0;
*/
        }
        if(event.keyCode == cc.macro.KEY.enter) {
            this.shoot = true;
            this.createBullet();
        }

        if(event.keyCode == cc.macro.KEY.space) {
            this.up = true;

        }
    }

    onKeyUp(event) {
        if(event.keyCode == cc.macro.KEY.right){
            this.right = 0;
            //this.right = 0;
            //if(this.left==2) this.left=1;
        }
        if(event.keyCode == cc.macro.KEY.left){
            this.left = 0;
            
            //this.left = 0;
            //if(this.right==2) this.right=1;
        }
        if(event.keyCode == cc.macro.KEY.enter){
            this.shoot = false;
        }

        if(event.keyCode == cc.macro.KEY.space){
            this.up = false;
        }
    }

    playermoveX() {
        if(this.left==1 && !this.hanging){
            //this._currentSpeedX -= this.upA;
            if(this._currentSpeedX <= -this.maxSpeedX){
                this._currentSpeedX = -this.maxSpeedX;
            }else{
                this._currentSpeedX -= this.upA;
            }
        }else if(this.right==1 && !this.hanging){
            //this._currentSpeedX += this.upA;
            if(this._currentSpeedX >= this.maxSpeedX){
                this._currentSpeedX = this.maxSpeedX;
            }else{
                this._currentSpeedX += this.upA;
            }
        }else{
            if(this._currentSpeedX != 0){
                if(this._currentSpeedX > 0 && this._currentSpeedX > this.downA){
                    this._currentSpeedX -= this.downA;
                }else if(this._currentSpeedX > 0 && this._currentSpeedX <= this.downA){
                    this._currentSpeedX = 0;
                }else if(this._currentSpeedX < 0 && this._currentSpeedX < -this.downA){
                    this._currentSpeedX += this.downA;
                }else if(this._currentSpeedX < 0 && this._currentSpeedX >= -this.downA){
                    this._currentSpeedX = 0;
                }
            }
        }
    }

    playermoveY(){
        this.playerfall();
        if((this.up && this.onGround) || (this.up && this.hanging)){
            this.jump();
        }
    }

    playerAnimation(){
        this.node.scaleX = (this.left) ? -1.5 : (this.right) ? 1.5 : this.node.scaleX;
        if(this.hanging){
            if(!this.anim.getAnimationState('playerb_hang').isPlaying && this.play_hang){
                this.hang();
            }
                //this.anim.play('hang');
        } else if(this.up || !this.onGround){
            if(!this.anim.getAnimationState('playerb_jump').isPlaying)
                this.anim.play('playerb_jump');
        } else if(this.left || this.right){
            if(!this.anim.getAnimationState('playerb_run').isPlaying)
                this.anim.play('playerb_run');
        } else{
            if(!this.anim.getAnimationState('playerb_idle').isPlaying)
                this.anim.play('playerb_idle');
        }

    }
    hang(){
        cc.audioEngine.playEffect(this.hang_sound, false);
        var s = this.anim.play('playerb_hang');
        s.on('finished', ()=>{
            this.play_hang = false;
        }, this);
        //this.play_hang = false;

    }
    dash(){
        let move = null;
        if(this.node.scaleX > 0){
            move = cc.moveBy(0.1, -1 * this.dashSpeed, 0)
        }else{
            move = cc.moveBy(0.1, this.dashSpeed, 0)
        }
        this.node.runAction(move);
    }

    playerfall(){
        var origin_x = this.getComponent(cc.RigidBody).linearVelocity.x;
        var origin_y = this.getComponent(cc.RigidBody).linearVelocity.y;
        if(!this.onGround && origin_y <= 0) this.is_falling = true;
        
        if(!this.onGround && origin_y >= this.maxSpeedY){
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(origin_x, this.maxSpeedY);
        }
        /*if(!this.onGround){
            this._currentSpeedY -= this.G;
            if(this._currentSpeedY <= this.maxSpeedY){
                this._currentSpeedY = this._currentSpeedY;
            }
        }else{
            this._currentSpeedY = 0;
        }*/
    }

    jump(){
        this.onGroundSound = false;
        cc.audioEngine.playEffect(this.jump_sound, false);
        if(this.hanging){
            var scale_x = this.node.scaleX > 0 ? -1 : 1;
            this.hanging = false;
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(scale_x*100, this.jump_speed);
            //this.node.scaleX = scale_x*1.5;
        }else{
            this.onGround = false;
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, this.jump_speed);
        }
    }

    reborn(){
        if(this.dead){
            this._currentSpeedX = 0;
            //this._currentSpeedY = 0;
            this.node.position = this.rebornPosition;
        }
    }


    createBullet()
    {
        if(this.onGround){
            cc.audioEngine.playEffect(this.shoot_sound, false);
            let bullet = cc.instantiate(this.bulletPrefab);
            bullet.getComponent('bullet').init(this.node);
            this.dash();
            this.airshoot = false;
        }else{
            if(this.airshoot){

            }else{
                cc.audioEngine.playEffect(this.shoot_sound, false);
                let bullet = cc.instantiate(this.bulletPrefab);
                bullet.getComponent('bullet').init(this.node);
                this.dash();
                this.airshoot = true;
            }
        }
    }

    onBeginContact(contact, self, other){
        if(other.tag == 1){
            var colli = contact.getWorldManifold().normal.x;
            var colli_y = contact.getWorldManifold().normal.y;
            cc.log(colli);
            if((colli > 0 && this.node.scaleX > 0 && colli_y == 0 && !this.onGround)||(colli < 0 && this.node.scaleX < 0 && colli_y == 0 && !this.onGround)){
                this.hanging = true;
                this.play_hang = true;
                //this.hang();
            }else{
                this.hanging = false;
                this.is_falling = false;
                this.onGround = true;
                if(colli_y == -1 && !this.onGroundSound) {
                    cc.audioEngine.playEffect(this.onground_sound, false);
                    this.onGroundSound = true;
                }
            }
            this.airshoot = false;
        }else if(other.tag==2 || other.tag==3){
            this.dead = true;
            //this.reborn();
        }
    }

    onEndContact(contact, self, other){
        if(other.tag == 1){
            this.onGround = false;
            this.hanging = false;
        }
    }

    regain(){
        this.airshoot = false;
    }


    call_spring_jump(f :cc.Vec2){
        this.spring_jumping = true;
        this.spring_force = f;
    }

    call_wind_floating(f :cc.Vec2, wind_switch: boolean){
        this.wind_floating = wind_switch;
        if(wind_switch) this.wind_force = f;
    }

    object_effect(){
        let origin_v = this.node.getComponent(cc.RigidBody).linearVelocity;
        if(this.spring_jumping){
            this.spring_jumping = false;
            this._currentSpeedX = this.spring_force.x/30;
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(origin_v.x, this.spring_force.y/2);
            this.airshoot = false;
        }
        if(this.wind_floating){
            this.node.getComponent(cc.RigidBody).linearVelocity = origin_v.add(this.wind_force);
            // cc.log("winding: " + this.wind_force.y);
            this.wind_floating = false;
        }
    }

    player_dead(){
        if(!this.anim.getAnimationState('playerb_dead').isPlaying){
            cc.audioEngine.playEffect(this.death_sound, false);
            var s = this.anim.play('playerb_dead');
            s.on('finished', ()=>{
                this.node.active = false;
                cc.find("SceneManager").getComponent("scene_manage").die_reload();
            }, this);
        }
    }
}