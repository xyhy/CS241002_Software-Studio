const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component 
{
    @property()
    playerSpeed: number = 0;

    @property(cc.Node)
    gameMgr: cc.Node = null;

    @property(cc.Node)
    lifect: cc.Node = null;

    
    
    //private idleFrame: cc.SpriteFrame = null;

    private anim = null;

    private up = false;
    private down = false;
    private left = false;
    private right = false;

    private onGround: boolean = false;

    private isDead = false;

    private isBig = false;

    private rebornPosition = cc.v2(200,50);

    private A = 40;

    coins: number = 0;
    scores: number = 0;
    private life = 0;

    onLoad()
    {
        this.anim = this.getComponent("cc.Animation");
        cc.director.getPhysicsManager().enabled = true;
        this.anim = this.getComponent(cc.Animation);
    }


    start () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.reborn();
    }

    update(dt)
    {
        this.playerMovement(dt);
        this.playerAnimation();

    }

    onKeyDown(event) 
    {
        if(event.keyCode == cc.macro.KEY.left) {
            this.left = true;
            this.right = false;
            this.anim.play("move");

        } else if(event.keyCode == cc.macro.KEY.right) {
            this.right = true;
            this.left = false;
            this.anim.play("move");

        } else if(event.keyCode == cc.macro.KEY.up) {
            this.up = true;
            this.down = false;

        } else if(event.keyCode == cc.macro.KEY.down) {
            this.down = true;
            this.up = false;

        }
    }

    onKeyUp(event) {
        if(event.keyCode == cc.macro.KEY.right)
            this.right = false;
        else if(event.keyCode == cc.macro.KEY.left)
            this.left = false;
        else if(event.keyCode == cc.macro.KEY.up)
            this.up = false;
        else if(event.keyCode == cc.macro.KEY.down)
            this.down = false;
    }


    reborn()
    {
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
        this.node.position = this.rebornPosition;
    }

    lifecount(){
        this.lifect.getComponent("cc.Label").string = "LIFE" + this.life.toString();
        if(this.life == -1) {
            this.gameMgr.getComponent("GameManager").lose();
        }
    }

    private playerMovement(dt)
    {
        if(this.isDead){
            this.playerSpeed = 0;
            this.left = false;
            this.right = false;
            this.up = false;
        }else{
            if(this.up && this.onGround){
                //this.playerSpeed = 0;
                this.playerJump();
            }
            else if(this.left){
                if(this.playerSpeed>0){
                    this.playerSpeed = -1;
                }else{
                    if(this.playerSpeed>-100){
                        this.playerSpeed -= this.A*dt;
                    }else{
                        this.playerSpeed = -100;
                    }
                }
            }
            else if(this.right){
                if(this.playerSpeed<0){
                    this.playerSpeed = 1;
                }else{
                    if(this.playerSpeed<100){
                        this.playerSpeed += this.A*dt;
                    }else{
                        this.playerSpeed = 100;
                    }
                }
            }
            else if(this.down){
                this.playerSpeed = 0;
            }
            else{
                this.playerSpeed = 0;
            }
            this.node.x += this.playerSpeed * dt;
        }
    }

    playerJump(){
        this.onGround = false;
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 500);
        this.anim.play("jump");
    }

    updateLife(num: number)
    {
        this.life += num;
        this.life = Math.min(Math.max(this.life,-1),99);
        cc.log(this.life);
        if(this.life == -1){
            cc.director.loadScene("lose");
        }
    }

    playerRecover()
    {
        this.updateLife(1);
    }

    playerDie()
    {
        this.updateLife(-1);
        if(this.life != -1){
            this.reborn();
        }
    }

    playerAnimation()
    {
        this.node.scaleX = (this.left) ? -1 : (this.right) ? 1 : this.node.scaleX;
    }


    onBeginContact(contact, self, other) {
        if(other.node.name == "flag"){
            cc.director.loadScene("win");
        }else{

        // Mario on Top.
          if(contact.getWorldManifold().normal.y==-1){
            if(other.tag == 1) {
                this.onGround = true;
            }else if(other.tag == 2) {
                this.isDead = true;
                this.playerDie();
            }else if(other.tag == 3) {

            }else if(other.tag == 4) {
                this.isDead = true;
                this.playerDie();
            }
          }

          // Mario at Bottom.
          else if(contact.getWorldManifold().normal.y== 1){
            if(other.tag == 1) {
                this.onGround = true;
            }else if(other.tag == 2) {
                this.isDead = true;
                this.playerDie();
            }else if(other.tag == 3) {
                this.isDead = true;
                this.playerDie();
            }else if(other.tag == 4) {
                this.isDead = true;
                this.playerDie();
            }
          }


          // Left or Right direction.
          else{
            if(other.tag == 1) {
                this.onGround = true;
            }else if(other.tag == 2) {
                this.isDead = true;
                this.playerDie();
            }else if(other.tag == 3) {
                this.isDead = true;
                this.playerDie();
            }else if(other.tag == 4) {
                this.isDead = true;
                this.playerDie();
            }             
          }
        }
    }
}
