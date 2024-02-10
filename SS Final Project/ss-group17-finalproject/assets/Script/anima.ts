
const {ccclass, property} = cc._decorator;

@ccclass
export default class anima extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null;

    @property({type:cc.AudioClip})
    walk_sound: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    thunder: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    rain: cc.AudioClip = null;

    @property(cc.Node)
    girl: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:
    @property(cc.Prefab)
    dialog: cc.Prefab = null;

    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;
    // onLoad () {}
    private scene_name;

    private anim_girl;

    private anim_player;

    private after_3_first: boolean = false;
    
    onLoad () {
        cc.audioEngine.playMusic(this.bgm, true);
    }

    start () {
        this.scene_name = cc.director.getScene().name;
        this.anim_girl = this.girl.getComponent(cc.Animation);
        this.anim_player = this.player.getComponent(cc.Animation);
        if(this.scene_name == 'animation1'){
            this.run_anim1();
        }else if(this.scene_name == 'animation2'){
            this.run_anim2();
        }else if(this.scene_name == 'animation3'){
            this.run_anim3();
        }else if(this.scene_name == 'animation4'){
            this.run_anim4();
        }

    }
    run_anim4(){
        var dialog_box = cc.instantiate(this.dialog);
        dialog_box.parent = cc.find('Canvas/Main Camera');
        dialog_box.getComponent('dialogue').init([{role:'我', content:'我會在下面接住你的！'},
        {role:'女孩', content: '你....'},
        {role:'我', content: '這一切都是我的錯，所以我不會讓他再發生！'},
        {role:'女孩', content: '我已經死去的事實無法改變了。'},
        {role:'我', content: '為什麼？！可是...'},
        {role:'女孩', content: '這並不是你的錯。'},
        {role:'女孩', content: '不要永遠沉在你的愧疚裡，在現實裡你終究得去過你的人生。'},
        {role:'女孩', content: '好啦，這個夢境也差不多要崩塌了。你趕快往上爬逃離這個地方吧，加油，再見！'}]);

        this.girl.runAction(cc.moveTo(3, 547, 473));
        this.scheduleOnce(()=>{
            this.girl.runAction(cc.sequence(cc.moveTo(2, 547, 223), cc.callFunc(()=>{
                this.girl.getChildByName('falling_wind').active = false;
                var s = this.anim_girl.play('standing');
                s.on('finished', ()=>{
                    this.anim_girl.play('idle');
                }, this);
            })));
        }, 7);

    }
    run_anim3(){
        cc.find('thunder').active = false;
        cc.audioEngine.playEffect(this.rain, true);
        this.schedule(function(){
            cc.find('thunder').active = true;
            cc.find('thunder').runAction(cc.sequence(cc.fadeIn(0), cc.fadeOut(0.2)));
            this.scheduleOnce(function(){cc.find('thunder').active = false;}, 0.2)
        }, 5)
        this.schedule(function(){cc.audioEngine.playEffect(this.thunder, false)}, 5);
        this.after_3_first = false;
        var dialog_box = cc.instantiate(this.dialog);
        dialog_box.parent = cc.find('Canvas/Main Camera');
        dialog_box.getComponent('dialogue').init([{role:'我', content:'地板有點滑呢....啊啊啊啊！'},{role:'女孩', content: '小心啊！啊啊啊啊啊！'}, {role:'女孩', content: '不要放開！'}, 
            {role:'我', content: '可惡！雨水太滑了！'}, {role:'女孩', content: '不...不要....'}]);

        var call_b = cc.callFunc(()=>{
            var dialog_box2 = cc.instantiate(this.dialog);
            dialog_box2.parent = cc.find('Canvas/Main Camera');
            dialog_box2.getComponent('dialogue').init([{role:'我', content:'什...什麼？'},{role:'女孩', content: '這全都是你的錯，是你害我摔死的！'}, {role:'女孩', content: '還沒搞清楚嗎？這裡是你的夢境，罪惡感的夢！'}, 
            {role:'我', content: '！'}, {role:'女孩', content: '你就永遠困在這個夢境裡愧疚下去吧，這是你應得的！我恨你！'},
            {role:'我', content: '我全都想起來了！都是我不小心才..'}, {role:'我', content: '不！如果這是我的夢，我才不會再讓事情發生！'}]);

        });
        this.scheduleOnce(()=>{
            this.girl.active = true;
        }, 10);
        this.scheduleOnce(()=>{
            this.player.runAction(cc.sequence(cc.fadeIn(2), call_b));
        }, 12);
        this.scheduleOnce(()=>{
            this.girl.runAction(cc.fadeOut(2));
        }, 17);
    }
    run_anim2(){
        var act1 = cc.moveBy(3, 500, 0);
        var call_b = cc.callFunc(()=>{
            this.girl.scaleX *= -1;
        });
        var call_b2 = cc.callFunc(()=>{
            this.anim_player.play('playerb_idle');
            var dialog_box = cc.instantiate(this.dialog);
            dialog_box.parent = cc.find('Canvas/Main Camera');
            dialog_box.getComponent('dialogue').init([{role:'女孩', content:'嘿，你來啦！'},{role:'女孩', content: '走吧，目標是山頂。'}, {role:'我', content: '.....'}]);
        });
        
        this.node.runAction(call_b);
        this.player.runAction(cc.sequence(act1, call_b2));
        this.scheduleOnce(()=>{
            this.anim_player.play('playerb_run');
            this.girl.scaleX *= -1;
            this.anim_girl.play('run');
        }, 10);
    }
    run_anim1(){
        var act1 = cc.moveBy(3, 1200, 0);
        var act2 = cc.moveBy(2, 500, 0);
        cc.audioEngine.playEffect(this.walk_sound, true);
        var call_b = cc.callFunc(()=>{
            this.anim_player.play('playerb_idle');
        });
        var call_b2 = cc.callFunc(()=>{
            var dialog_box = cc.instantiate(this.dialog);
            dialog_box.parent = cc.find('Canvas/Main Camera');
            dialog_box.getComponent('dialogue').init([{role:'我', content:'你是誰？？'},{role:'我', content: '等等！'}]);
        });
        this.girl.runAction(act1);
        this.player.runAction(cc.spawn(cc.sequence(act2, call_b), call_b2));
        this.scheduleOnce(()=>{
            cc.audioEngine.stopAllEffects();
        }, 4);
    }
    
    animation_finish(){
        this.scheduleOnce(()=>{
            switch (cc.director.getScene().name[9]) {
                case "1": cc.find("SceneManager").getComponent("scene_manage").go_animation("animation2");break;
                case "2": cc.find("SceneManager").getComponent("scene_manage").go_next_level("2-1", "from_right");break;
                case "3": 
                    if(this.after_3_first) cc.find("SceneManager").getComponent("scene_manage").go_next_level("3-1", "from_right");
                    else this.after_3_first = true;
                    break;
                case "4": cc.find("SceneManager").getComponent("scene_manage").go_animation("final");
                default:
                    break;
            }
        }, 0.5);
    }
    onDestroy() {
        cc.audioEngine.stopAllEffects();
    }
}
