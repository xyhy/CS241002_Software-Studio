
const {ccclass, property} = cc._decorator;

@ccclass
export default class extends cc.Component {

    @property(cc.Prefab)
    dialog: cc.Prefab = null;

    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;

    @property(cc.Node)
    player: cc.Node = null;

    @property(cc.Node)
    nurse: cc.Node = null;

    private dialogue_cnt: number = 0;
    private anim_2: boolean = false;
    private anim_5: boolean = false;
    private stopUpdate: boolean = false;

    public dialogue_final = [{role:'我', content:'嗚...這裡是...'},
    {role:'護士', content: '這裡是醫院，你被直昇機載到這裡之後已經昏睡三天了'},
    {role:'我', content:'...學姊呢？跟我一起的一個大學女生？'},
    {role:'護士', content: '很遺憾，我們到現場時他已經...'},
    {role:'我', content:'是嗎...'},
    {role:'護士', content: '（醫生，六號床的患者已經醒了...噢？她的母親？他才剛醒來，可能先不要給他太多刺激比較好...）'}];
    
    onLoad () {
        cc.audioEngine.playMusic(this.bgm, true);
        cc.find('ending').active = false;
    }

    start () {
        var dialog_box = cc.instantiate(this.dialog);
        dialog_box.parent = this.node;
        dialog_box.getComponent('dialogue').init(this.dialogue_final);
        //cc.find('Canvas/dialog-cover').on(cc.Node.EventType.MOUSE_DOWN, this.changeDialog, this);
        this.nurse.runAction(cc.sequence(cc.fadeIn(0.3),cc.moveBy(0.6, -100, -40), cc.moveBy(1.1, -160, 0)));
        this.nurse.getComponent(cc.Animation).play('nurse_walk');
        this.scheduleOnce(function() {
            this.nurse.getComponent(cc.Animation).stop();
        }, 2);
    }
    update(dt) {
        if(this.stopUpdate) return;
        if(this.node.getComponentInChildren('dialogue').textIndex == 2) {
            if(!this.anim_2) {
                this.player.runAction(cc.moveBy(0.4, 100, 0));
                this.player.getComponent(cc.Animation).play('playerb_run');
                this.scheduleOnce(function() {
                    this.player.getComponent(cc.Animation).stop();
                    this.player.getComponent(cc.Animation).play('playerb_idle');
                }, 0.4);
            }
            this.anim_2 = true;
        }
        if(this.node.getComponentInChildren('dialogue').textIndex == 5) {
            if(!this.anim_5){
                this.nurse.scaleX = -3.2;
                this.nurse.runAction(cc.sequence(cc.moveBy(1.1, 160, 0), cc.moveBy(0.6, 100, 40)));
                this.nurse.getComponent(cc.Animation).play('nurse_walk');
                this.scheduleOnce(function() {
                    this.nurse.runAction(cc.fadeOut(0.2));
                    }, 1.8);
            }
            this.anim_5 = true;
        }
        if(this.node.getComponentInChildren('dialogue').isEnd) {
            cc.log('end');
            this.scheduleOnce(function() {
                this.node.runAction(cc.fadeOut(0.2));
            }, 1)
            this.scheduleOnce(function() {
                cc.find('ending').active = true;
                cc.find('ending').runAction(cc.fadeIn(0.5));
            }, 1.2)
            this.scheduleOnce(function() {
                cc.find("SceneManager").getComponent("scene_manage").change_scene("chapter select", "fade");
            }, 6);
            this.node.getComponentInChildren('dialogue').isEnd = false;
            this.stopUpdate = true;
        }
    }
}
