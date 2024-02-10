const {ccclass, property} = cc._decorator;

@ccclass
export default class ChapterSelect extends cc.Component {

    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    hover_sound: cc.AudioClip = null;

    @property(cc.SpriteFrame)
    default_bg: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    ch1_bg: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    ch2_bg: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    ch3_bg: cc.SpriteFrame = null;

    @property(cc.Boolean)
    has_select_limit :boolean = false;

    private ch1_clicked: boolean = false;
    private ch2_clicked: boolean = false;
    private ch3_clicked: boolean = false;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //Play background music
        cc.audioEngine.playMusic(this.bgm, true);
        //Chapter select buttons
        //Chapter 1
        const ch1Btn = new cc.Component.EventHandler();
        ch1Btn.target = this.node;
        ch1Btn.component = "chapter_select";
        ch1Btn.handler = "ch1OnClick";
        const button_1 = cc.find("All Nodes/Canvas/chapter1_btn").getComponent(cc.Button);
        button_1.clickEvents.push(ch1Btn);
        //Chapter 2
        const ch2Btn = new cc.Component.EventHandler();
        ch2Btn.target = this.node;
        ch2Btn.component = "chapter_select";
        ch2Btn.handler = "ch2OnClick";
        const button_2 = cc.find("All Nodes/Canvas/chapter2_btn").getComponent(cc.Button);
        button_2.clickEvents.push(ch2Btn);
        //Chapter 3
        const ch3Btn = new cc.Component.EventHandler();
        ch3Btn.target = this.node;
        ch3Btn.component = "chapter_select";
        ch3Btn.handler = "ch3OnClick";
        const button_3 = cc.find("All Nodes/Canvas/chapter3_btn").getComponent(cc.Button);
        button_3.clickEvents.push(ch3Btn);
        //Hover event
        //Chapter 1
        cc.find("All Nodes/Canvas/chapter1_btn").on(cc.Node.EventType.MOUSE_ENTER, this.ch1Hover, this);
        cc.find("All Nodes/Canvas/chapter1_btn").on(cc.Node.EventType.MOUSE_LEAVE, this.mouseLeave, this);
        //Chapter 2
        cc.find("All Nodes/Canvas/chapter2_btn").on(cc.Node.EventType.MOUSE_ENTER, this.ch2Hover, this);
        cc.find("All Nodes/Canvas/chapter2_btn").on(cc.Node.EventType.MOUSE_LEAVE, this.mouseLeave, this);
        //Chapter 3
        cc.find("All Nodes/Canvas/chapter3_btn").on(cc.Node.EventType.MOUSE_ENTER, this.ch3Hover, this);
        cc.find("All Nodes/Canvas/chapter3_btn").on(cc.Node.EventType.MOUSE_LEAVE, this.mouseLeave, this);
        //Hide dropdown
        cc.find("All Nodes/Canvas/chapter1_dropdown").active = false;
        cc.find("All Nodes/Canvas/chapter2_dropdown").active = false;
        cc.find("All Nodes/Canvas/chapter3_dropdown").active = false;
        if(this.has_select_limit) this.limit_select();
    }


    ch1Hover() {
        cc.audioEngine.playEffect(this.hover_sound, false);
        this.node.scaleX = 1;
        this.node.color = cc.color(255, 255, 255);
        this.node.opacity = 100;
        this.node.getComponent(cc.Sprite).spriteFrame = this.ch1_bg;
    }
    ch2Hover() {
        cc.audioEngine.playEffect(this.hover_sound, false);
        this.node.color = cc.color(255, 255, 255);
        this.node.opacity = 100;
        this.node.scaleX = -1;
        this.node.getComponent(cc.Sprite).spriteFrame = this.ch2_bg;
    }
    ch3Hover() {
        cc.audioEngine.playEffect(this.hover_sound, false);
        this.node.scaleX = 1;
        this.node.color = cc.color(255, 255, 255);
        this.node.opacity = 100;
        this.node.getComponent(cc.Sprite).spriteFrame = this.ch3_bg;
    }
    mouseLeave() {
        if(this.ch1_clicked) {
            this.node.scaleX = 1;
            this.node.color = cc.color(255, 255, 255);
            this.node.opacity = 100;
            this.node.getComponent(cc.Sprite).spriteFrame = this.ch1_bg;
        }
        else if(this.ch2_clicked) {
            this.node.scaleX = -1;
            this.node.color = cc.color(255, 255, 255);
            this.node.opacity = 100;
            this.node.getComponent(cc.Sprite).spriteFrame = this.ch2_bg;
        }
        else if(this.ch3_clicked) {
            this.node.scaleX = 1;
            this.node.color = cc.color(255, 255, 255);
            this.node.opacity = 100;
            this.node.getComponent(cc.Sprite).spriteFrame = this.ch3_bg;
        }
        else {
            this.node.scaleX = 1;
            this.node.color = cc.color(0, 0, 0);
            this.node.getComponent(cc.Sprite).spriteFrame = this.default_bg;
        }
    }

    ch1OnClick() {
        if(this.ch1_clicked) {
            this.ch1UnClick();
            return;
        }
        if(this.ch2_clicked) {
            this.ch2UnClick();
            this.scheduleOnce(this.ch1OnClick, 0.5);
            return;
        }
        else if(this.ch3_clicked) {
            this.ch3UnClick();
            this.scheduleOnce(this.ch1OnClick, 0.5);
            return;
        }
        this.ch1_clicked = true;
        let dropdown = cc.find("All Nodes/Canvas/chapter1_dropdown");
        dropdown.scaleY = 0;
        dropdown.active = true;
        let scaleTo = cc.scaleTo(0.5, 1, 1);
        dropdown.runAction(scaleTo);
        cc.find("All Nodes/Canvas/chapter2_btn").runAction(cc.moveBy(0.5, 0, -100));
        cc.find("All Nodes/Canvas/chapter3_btn").runAction(cc.moveBy(0.5, 0, -100));
        
    }
    ch1UnClick() {
        this.ch1_clicked = false;
        let dropdown = cc.find("All Nodes/Canvas/chapter1_dropdown");
        let scaleTo = cc.scaleTo(0.5, 1, 0);
        dropdown.runAction(scaleTo);
        this.scheduleOnce(function(){dropdown.active = false}, 0.5);
        cc.find("All Nodes/Canvas/chapter2_btn").runAction(cc.moveBy(0.5, 0, 100));
        cc.find("All Nodes/Canvas/chapter3_btn").runAction(cc.moveBy(0.5, 0, 100));
    }
    ch2OnClick() {
        if(this.ch2_clicked) {
            this.ch2UnClick();
            return;
        }
        if(this.ch1_clicked) {
            this.ch1UnClick();
            this.scheduleOnce(this.ch2OnClick, 0.5);
            return;
        }
        else if(this.ch3_clicked) {
            this.ch3UnClick();
            this.scheduleOnce(this.ch2OnClick, 0.5);
            return;
        }
        this.ch2_clicked = true;
        let dropdown = cc.find("All Nodes/Canvas/chapter2_dropdown");
        dropdown.scaleY = 0;
        dropdown.active = true;
        let scaleTo = cc.scaleTo(0.5, 1, 1);
        dropdown.runAction(scaleTo);
        cc.find("All Nodes/Canvas/chapter3_btn").runAction(cc.moveBy(0.5, 0, -100));
    }
    ch2UnClick() {
        this.ch2_clicked = false;
        let dropdown = cc.find("All Nodes/Canvas/chapter2_dropdown");
        let scaleTo = cc.scaleTo(0.5, 1, 0);
        dropdown.runAction(scaleTo);
        this.scheduleOnce(function(){dropdown.active = false}, 0.5);
        cc.find("All Nodes/Canvas/chapter3_btn").runAction(cc.moveBy(0.5, 0, 100));
    }
    ch3OnClick() {
        if(this.ch3_clicked) {
            this.ch3UnClick();
            return;
        }
        if(this.ch1_clicked) {
            this.ch1UnClick();
            this.scheduleOnce(this.ch3OnClick, 0.5);
            return;
        }
        else if(this.ch2_clicked) {
            this.ch2UnClick();
            this.scheduleOnce(this.ch3OnClick, 0.5);
            return;
        }
        this.ch3_clicked = true;
        let dropdown = cc.find("All Nodes/Canvas/chapter3_dropdown");
        dropdown.scaleY = 0;
        dropdown.active = true;
        let scaleTo = cc.scaleTo(0.5, 1, 1);
        dropdown.runAction(scaleTo);
    }
    ch3UnClick() {
        this.ch3_clicked = false;
        let dropdown = cc.find("All Nodes/Canvas/chapter3_dropdown");
        let scaleTo = cc.scaleTo(0.5, 1, 0);
        dropdown.runAction(scaleTo);
        this.scheduleOnce(function(){dropdown.active = false}, 0.5);
    }
    dropdownBtnClick(event, data) {
        // cc.find("Canvas").runAction(cc.sequence(
        //     cc.fadeOut(0.2), 
        //     cc.callFunc(function () {
        //          cc.director.loadScene(data);
        //     })
        // ));
        cc.find("SceneManager").getComponent("scene_manage").enter_selected_level(data);
    }

    onDestroy() {
        cc.audioEngine.stopMusic();
    }

    limit_select(){
        let table: boolean[][] = cc.find("SceneManager").getComponent("scene_manage").get_level_record();
        if(!table[1][0]) cc.find("All Nodes/Canvas/chapter2_btn").active = false;
        if(!table[2][0]) cc.find("All Nodes/Canvas/chapter3_btn").active = false;
        for(let i=1;i<=3;i++){
            let root = cc.find("All Nodes/Canvas/chapter" + i + "_dropdown");
            for(let j=1;j<=5;j++){
                if(!table[i-1][j-1]) root.getChildByName( j + "_btn").active = false;
            }
        }
    }
}
