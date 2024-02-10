const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    buzzSound: cc.AudioClip = null;

    @property({type:cc.Animation})
    animator: cc.Animation = null;
    
    @property({type:cc.AnimationState})
    animateState: cc.AnimationState = null;

    onLoad () {
        cc.audioEngine.playMusic(this.bgm, true);
        this.animator = this.getComponent(cc.Animation);
        this.schedule(this.glitch, 3);
    }

    start () {
        // Keydown event trigger
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        
    }

    onDestroy() {
        cc.audioEngine.stopMusic();
        this.unschedule(this.glitch);
    }

    glitch() {
        this.animateState = this.animator.play('title_glitch');
        cc.audioEngine.playEffect(this.buzzSound, false);
    }

    onKeyDown(event) {
        cc.find("SceneManager").getComponent("scene_manage").change_scene("chapter select", "fade");
    }
}
