// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class MovingPlatform extends cc.Component {

    @property(cc.Vec2) start_position: cc.Vec2 = cc.v2(0,0);
    @property(cc.Vec2) end_position: cc.Vec2 = cc.v2(0,0);
    @property(cc.Integer) period: number = 2;
    @property(cc.Boolean) automatic: boolean = true;
    private is_moving: boolean = false;

    start () {
        this.node.position = this.start_position;
        this.is_moving = false;
        if(this.automatic) this.run_moving_action();
    }

    run_moving_action(){
        let go_act = cc.moveTo(this.period/2, this.end_position);
        let back_act = cc.moveTo(this.period/2, this.start_position);
        go_act.easing(cc.easeQuinticActionInOut());
        back_act.easing(cc.easeQuinticActionInOut());
        this.node.runAction(cc.repeatForever(cc.sequence(go_act,back_act)));
        this.is_moving = true;
    }

    onBeginContact(contact:cc.PhysicsContact, self:cc.Collider, other:cc.Collider){
        if(!this.is_moving && other.node.name == "player"){
            this.run_moving_action();
        }
    }
}
