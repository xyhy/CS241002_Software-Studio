const {ccclass, property} = cc._decorator;

@ccclass
export default class StrawberryCount extends cc.Component {
    onLoad(){
        this.node.position = cc.v2(-425, 260);
        this.node.runAction(cc.hide());
    }

    show(count :number){
        this.node.getChildByName("count").getComponent(cc.Label).string = count.toString();
        this.node.runAction(cc.show());
    }

    increase(count :number){
        this.node.getChildByName("count").getComponent(cc.Label).string = (count-1).toString();
        this.node.runAction(cc.sequence(
            cc.show(),
            cc.fadeIn(0.2),
            cc.moveBy(0.5, 0, 0),
            cc.callFunc(()=>{this.node.getChildByName("count").getComponent(cc.Label).string = count.toString();cc.log("hey");}),
            cc.moveBy(1, 0, 0),
            cc.fadeOut(0.3),
            cc.hide()
            ));
        }
}
