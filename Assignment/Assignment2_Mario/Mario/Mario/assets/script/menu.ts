const {ccclass, property} = cc._decorator;


@ccclass
export default class menu extends cc.Component {

    @property(cc.Button) 
    button: cc.Button

    onLoad () {
        this.button.node.on('click', this.callback, this);
    }

    callback (button) {
        cc.director.loadScene("stage1-1");
    }
};