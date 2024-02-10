const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;

    private isPaused = false;

    onLoad () {
        this.node.getChildByName('pause').active = false;
        cc.audioEngine.playMusic(this.bgm, true);
    }

    start () {
        // Keydown event trigger
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        
    }

    onDestroy() {
        cc.audioEngine.stopMusic();
    }

    onKeyDown(e) {
        switch (e.keyCode) {
            case cc.macro.KEY.escape: {
                cc.log(this.isPaused)
                cc.log(this.node.parent)
                if(!this.isPaused) {
                    cc.log('pause')
                    if(this.node.parent.getChildByName('dialog-box') != null) {
                        this.node.parent.getChildByName('dialog-box').active = false;
                    }
                    cc.director.pause();
                    this.node.getChildByName('pause').active = true;
                    this.isPaused = true;
                }
                else {
                    cc.log('resume')
                    if(this.node.parent.getChildByName('dialog-box') != null) {
                        this.node.parent.getChildByName('dialog-box').active = true;
                    }
                    cc.director.resume();
                    this.node.getChildByName('pause').active = false;
                    this.isPaused = false;
                }
                break;
            }
        }
    }

    pauseBtnClick(event, data) {
        if(data == 'resume') {
            cc.log('resume');
            if(this.node.parent.getChildByName('dialog-box') != null) {
                this.node.parent.getChildByName('dialog-box').active = true;
            }
            cc.director.resume();
            this.node.getChildByName('pause').active = false;
            this.isPaused = false;
        }
        else if(data == 'restart') {
            cc.log('restart');
            cc.director.resume();
            cc.find("SceneManager").getComponent("scene_manage").die_reload();
        }
        else if(data == 'exit') {
            cc.log('exit');
            cc.director.resume();
            cc.find("All Nodes").runAction(cc.sequence(
                cc.fadeOut(0.2), 
                cc.callFunc(function () {
                     cc.director.loadScene('chapter select');
                })
            ));

        }
        
    }
}
