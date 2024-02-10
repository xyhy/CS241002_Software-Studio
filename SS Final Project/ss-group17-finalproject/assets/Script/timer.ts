const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({type:cc.AudioClip})
    ticktock: cc.AudioClip = null;

    @property(cc.Node)
    player: cc.Node = null;

    @property()
    time: number = 10;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {}

    start () {
        this.schedule(function() {
            this.node.getComponent(cc.Label).string = this.time;
            this.time -= 1;
            cc.audioEngine.playEffect(this.ticktock, false);
        }, 1, 300, 0.5);
    }

    update (dt) {
        if(this.time == -1) {
            this.player.getComponent("player_boss").dead = true;
        }
        if(this.player.getComponent("player_boss").dead) {
            this.unscheduleAllCallbacks();
        }

    }
}
