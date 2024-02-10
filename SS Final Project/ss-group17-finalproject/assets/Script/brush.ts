
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property({type:[cc.Vec2]})
    line_point:  Array<cc.Vec2> = [];

    @property(cc.Graphics)
    graphics: cc.Graphics = null;

    @property(cc.Node)
    camera: cc.Node = null;

    private rigibodyLogic: cc.RigidBody = null;
    private physicsLine: cc.Component = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.width = cc.winSize.width;
        this.node.height = cc.winSize.height;
        this.graphics = this.getComponent(cc.Graphics);
    }

    start () {
        this.onTouch();
        this.camera = cc.find('All Nodes/Canvas/Main Camera')
    }

    // update (dt) {}

    onTouch()
    {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touch_start, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touch_move, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touch_end, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touch_end, this);
    }
    offTouch()
    {
        this.node.off(cc.Node.EventType.TOUCH_START, this.touch_start, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touch_move, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touch_end, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touch_end, this);
    }
    touch_start(event) {
        var camera_pos = this.camera.getPosition();
        let pos = this.node.convertToNodeSpaceAR(event.getLocation());
        this.graphics.moveTo(camera_pos.x + pos.x, camera_pos.y + pos.y);
        this.line_point.push(cc.v2(camera_pos.x + pos.x, camera_pos.y + pos.y));
    }
    touch_move(event) {
        //var camera_pos = this.camera.getPosition();
        //let pos = this.node.convertToNodeSpaceAR(event.getLocation());
        
        //this.graphics.lineTo(camera_pos.x + pos.x, camera_pos.y + pos.y);
        //this.line_point.push(cc.v2(camera_pos.x +pos.x, camera_pos.y + pos.y));
    }
    touch_end(event) {
        var camera_pos = this.camera.getPosition();
        let pos = this.node.convertToNodeSpaceAR(event.getLocation());
        this.graphics.lineTo(camera_pos.x + pos.x, camera_pos.y + pos.y);
        this.line_point.push(cc.v2(camera_pos.x +pos.x, camera_pos.y + pos.y));
        this.graphics.stroke();
        this.createRigibody();
        this.offTouch();
    }
    createRigibody() {
        cc.log(this.line_point);
        this.node.addComponent(cc.RigidBody);
        this.node.getComponent(cc.RigidBody).gravityScale = 4;
        this.node.addComponent("BrushPhysicsCollider");
        var physicsLine = this.node.getComponent("BrushPhysicsCollider");
        physicsLine.tag = 1;
        physicsLine.lineWidth = 6;
        physicsLine.points = this.line_point;
        physicsLine.friction = 0.2;
        physicsLine.density = 1;
        physicsLine.apply();
    }
    checkIsCanDraw(lastPoint, nowPoint) {
        return lastPoint.sub(nowPoint).mag() >= 20;
    }
}