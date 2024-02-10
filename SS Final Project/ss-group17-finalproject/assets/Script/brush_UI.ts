const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    graphics: cc.Prefab = null;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        this.node.on(cc.Node.EventType.TOUCH_START, this.touch_start, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touch_move, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touch_end, this);
    }
    start() {
        //this.createGraphics();
    }

    touch_start(event) {
    }
    touch_move(event) {
    }
    touch_end(event) {
        //this.createGraphics();
    }
    createGraphics() {
        var graphics_node = cc.instantiate(this.graphics);
        console.log("~~~~~~~~~~~~~~",graphics_node);
        graphics_node.x = 0;
        this.node.addChild(graphics_node);
    }
}
