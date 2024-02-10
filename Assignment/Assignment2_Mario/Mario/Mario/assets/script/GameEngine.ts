import Player from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameMgr extends cc.Component 
{

    @property(cc.Node)
    player: cc.Node = null;

    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;

    @property(cc.Node)
    timer: cc.Node = null

    @property(cc.Node)
    camera: cc.Node = null;

    @property(cc.Node)
    background: cc.Node = null;

    @property(cc.Node)
    lowerbound: cc.Node = null;

    @property(cc.Node)
    life: cc.Node = null;

    

    private playerlife: number = 5;

    private time = 300;

    private pause: boolean = false;

    

    onLoad()
    {
        this.life.y = this.timer.y;
    }

    start () {
        this.gameStart();
    }

    update(dt)
    {
        this.camera.x = this.player.x-400;
        this.background.x = this.player.x;
        this.timer.x = this.background.x+100;
        this.life.x = this. timer.x-100;
        this.lowerbound.x = this.background.x;
    }

    updateHighestScore(score: number)
    {

    }

    updateScore(score: number)
    {
        
    }

    updateLife(num: number)
    {
        this.playerlife += num;
        this.playerlife = Math.min(Math.max(this.playerlife,-1),99);
        if(this.playerlife == -1){
            this.gameOver();
        }
    }


    timecount(){
        this.time-=1;
        this.timer.getComponent("cc.Label").string = "TIME " + this.time.toString();
        if(this.time == 0) {
            this.gameOver();
        }
    }

    gameStart()
    {
        this.schedule(this.timecount, 1);
        cc.audioEngine.playMusic(this.bgm, true);
    }

    gamePause()
    {
        this.pause = !this.pause;
        if(!this.pause){
            this.pause = true;
            this.scheduleOnce(()=>{
                cc.game.pause();
            },0.1);
        }else{
            this.pause = false;
            cc.game.resume();
        }
    }

    lose(){

    }

    gameOver()
    {
       this.updateLife(-1);
    }

    gameEnd()
    {
        cc.game.end();
    }
}
