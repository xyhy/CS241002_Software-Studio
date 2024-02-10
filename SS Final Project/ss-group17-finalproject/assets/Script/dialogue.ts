
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    //Label of text content.
    @property(cc.Label)
    textLabel: cc.Label = null;

    //Label of role name (who is talking).
    @property(cc.Label)
    nameLabel: cc.Label = null;

    //Sprite of dialog box.
    @property(cc.Sprite)
    picSprite: cc.Sprite = null;

    //Index of current sentence.
    @property()
    textIndex: number = 0;

    //Sound effect of typing
    @property({type: cc.AudioClip})
    typingSound: cc.AudioClip = null;

    private isEnd: boolean = false;

    //Array includes every sentences, role name, and text content.
    private textContentArr: Array<string> = null;

    //To record the text content of current sentence.
    private curText: string = null;

    //To show if current sentence is still playing (typing).
    private textEnd: boolean = true;

    //To calculate typing time of each word.
    private totalTime = 0;

    public content = [{role:'姓名', content:'對話框內容縮排測試對話框內容縮排測試'},
    {role:'姓名', content: '第二句話內容測試'}];

    onLoad() {
        //Initialize.
        //this.init(this.content);
        //Keyboard event listener (when SHIFT is pressed, change to next sentence).
        cc.systemEvent.on('keydown', this.onKeyDown, this);
        this.schedule(function(){this.nextTextContent()}, 2);
        //Mouse event listener (when Mouse down, change to next sentence).
        //this.node.on(cc.Node.EventType.MOUSE_DOWN, this.nextTextContent, this);
    }

    update (dt) {
        if(!this.curText) return;
        this.totalTime += dt;
        if(this.totalTime >= 0.1) {//Typing 1 word every 0.1 sec
            if(this.textLabel.string.length < this.curText.length) {
                cc.audioEngine.playEffect(this.typingSound, false);
                this.textLabel.string = this.curText.slice(0, this.textLabel.string.length + 1);
            }
            else {
                this.textEnd = true;
                this.curText = null;
            }
            this.totalTime = 0;
        }
    }

    onDestroy() {
        cc.systemEvent.off('keydown', this.onKeyDown, this);
    }

    onKeyDown(e) {
        switch (e.keyCode) {
            case cc.macro.KEY.shift: {
                this.nextTextContent();
                break;
            }
        }
    }

    //Initialize.
    init(textContentArr) {
        if(cc.find("SceneManager").getComponent("scene_manage").get_first_time()){
            this.textIndex = -1;
            this.node.active = true;
            this.textContentArr = textContentArr;
            this.nextTextContent();
        }
        else this.node.destroy();
    }

    //Change to next sentence.
    nextTextContent() {
        //If current sentence are still playing, can't change to next dialog.
        if(!this.textEnd) return;
        if(++this.textIndex < this.textContentArr.length) {//Have another words to say
            this.setTextContent(this.textContentArr[this.textIndex]);
        }
        else {
            this.closeDialogBox();
        }
    }

    //Change the text context of each sentence.
    setTextContent(textContent) {
        if(!this.textEnd) return;
        this.textEnd = false;

        this.nameLabel.string = textContent.role;
        this.textLabel.string = '';
        this.curText = textContent.content;
    }

    //Close the dialog box.
    closeDialogBox() {
        this.isEnd = true;
        this.node.runAction(cc.fadeOut(0.2));
        this.unschedule(function(){this.nextTextContent()});
        this.scheduleOnce(function(){this.node.destroy()}, 0.2);
        if(cc.director.getScene().name[0] == 'a'){
            cc.log("finish");
            cc.find("anima").getComponent("anima").animation_finish();
        }
    }
}
