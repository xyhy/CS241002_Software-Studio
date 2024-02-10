const { ccclass, property } = cc._decorator;

@ccclass
export default class player extends cc.Component {

    // @property()
    // FallG: number = 0; //Gravity
    @property()
    speedupA: number = 0; //speed increase rate
    @property()
    speeddownA: number = 0; //speed decrease rate


    @property()
    public maxSpeedX: number = 0; //max x-axis move
    @property()
    public maxSpeedY: number = 900; //fall down max speed
    // @property(cc.Integer)
    // public jumpSpeed: number = 50; //affect jump height
    @property(cc.Integer)
    public dashSpeed: number = 40; // shoot for dash
    @property(cc.Prefab)
    private bulletPrefab: cc.Prefab = null;


    private _currentSpeedX: number = 0;
    // private _currentSpeedY: number = 0;

    private up = false;
    private shoot = false;
    private left: number = 0;
    private right: number = 0;

    private dead: boolean = false;

    private onGround = false;
    private is_falling = false;

    private airshoot: boolean = false;

    private rebornPosition = cc.v2();

    private spring_jumping: boolean = false; 
    private spring_force: cc.Vec2 = cc.v2();
    private wind_floating: boolean = false;
    private wind_force: cc.Vec2 = cc.v2();


    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
    }

    start() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.rebornPosition = this.node.position;
    }

    update(dt) {
        this.playermoveX();
        this.playermoveY();
        this.object_effect(dt);
        this.playerAnimation();
        //this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this._currentSpeedX, this._currentSpeedY);
        this.node.x += this._currentSpeedX;
        // this.node.y += this._currentSpeedY;
        cc.log(this._currentSpeedX);
    }

    onKeyDown(event) 
    {
        if(event.keyCode == cc.macro.KEY.left) {
            this.left = 1;
            if(this.right==1 || this.right==2) this.right = 2;
            else this.right = 0;

        } else if(event.keyCode == cc.macro.KEY.right) {
            this.right = 1;
            if(this.left==1 || this.left==2) this.left = 2;
            else this.left = 0;

        } else if(event.keyCode == cc.macro.KEY.space) {
            this.up = true;

        } else if(event.keyCode == cc.macro.KEY.enter) {
            this.shoot = true;
            this.createBullet();
        }
    }

    onKeyUp(event) {
        if(event.keyCode == cc.macro.KEY.right){
            this.right = 0;
            if(this.left==2) this.left=1;
        }
        else if(event.keyCode == cc.macro.KEY.left){
            this.left = 0;
            if(this.right==2) this.right=1;
        }
        else if(event.keyCode == cc.macro.KEY.space){
            this.up = false;
        }
        else if(event.keyCode == cc.macro.KEY.enter){
            this.shoot = false;
        }
    }

    playermoveX() {
        if(this.left==1){
            if(this._currentSpeedX <= -this.maxSpeedX){
                this._currentSpeedX = -this.maxSpeedX;
            }else{
                this._currentSpeedX -= this.speedupA;
            }
        }else if(this.right==1){
            if(this._currentSpeedX >= this.maxSpeedX){
                this._currentSpeedX = this.maxSpeedX;
            }else{
                this._currentSpeedX += this.speedupA;
            }
        }else{
            if(this._currentSpeedX != 0){
                if(this._currentSpeedX > 0 && this._currentSpeedX > this.speeddownA){
                    this._currentSpeedX -= this.speeddownA;
                }else if(this._currentSpeedX > 0 && this._currentSpeedX <= this.speeddownA){
                    this._currentSpeedX = 0;
                }else if(this._currentSpeedX < 0 && this._currentSpeedX < -this.speeddownA){
                    this._currentSpeedX += this.speeddownA;
                }else if(this._currentSpeedX < 0 && this._currentSpeedX >= -this.speeddownA){
                    this._currentSpeedX = 0;
                }
            }
        }
    }

    playermoveY(){
        if(this.up && this.onGround){
            this.jump();
        }else{
            this.playerfall();
        }
    }

    playerAnimation(){
        this.node.scaleX = (this.left) ? -1 : (this.right) ? 1 : this.node.scaleX;
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
        this.onGround = false;
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 900);
    }

    reborn(){
        if(this.dead){
            this._currentSpeedX = 0;
            this.node.position = this.rebornPosition;
        }
    }


    createBullet()
    {
        if(this.onGround){
            let bullet = cc.instantiate(this.bulletPrefab);
            bullet.getComponent('bullet').init(this.node);
            this.dash();
            this.airshoot = false;
        }else{
            if(this.airshoot){

            }else{
                let bullet = cc.instantiate(this.bulletPrefab);
                bullet.getComponent('bullet').init(this.node);
                this.dash();
                this.airshoot = true;
            }
        }
    }

    onBeginContact(contact, self, other){
        if(other.tag == 1){
            this.onGround = true;
            this.airshoot = false;
        }else if(other.tag==2 || other.tag==3){
            this.dead = true;
            this.reborn();
        }
    }

    onEndContact(contact, self, other){
        if(other.tag == 1){
            this.onGround = false;
        }
    }

    regain(){
        this.airshoot = false;
    }

    call_spring_jump(f :cc.Vec2){
        cc.log(f);
        this.spring_jumping = true;
        this.spring_force = f;
    }

    call_wind_floating(f :cc.Vec2, wind_switch: boolean){
        this.wind_floating = wind_switch;
        if(wind_switch) this.wind_force = f;
    }

    object_effect(dt:number){
        let origin_v = this.node.getComponent(cc.RigidBody).linearVelocity;
        if(this.spring_jumping){
            this.spring_jumping = false;
            this._currentSpeedX = this.spring_force.x/30;
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(origin_v.x, this.spring_force.y/2);
            this.airshoot = false;
        }
        if(this.wind_floating){
            this.node.getComponent(cc.RigidBody).linearVelocity = origin_v.add(this.wind_force);
            cc.log("winding: " + this.wind_force.y);
            this.wind_floating = false;
        }
    }
}