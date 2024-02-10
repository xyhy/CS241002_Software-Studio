
const {ccclass, property} = cc._decorator;

@ccclass
export default class small_b2 extends cc.Component {

    private scale = -1;

    //578, 523
    //247, 534
    //325, 356
    //838, 323
    //530, 268
    //411, 134
    //686, 163
    
    private pos_set = [cc.v2(578, 523), cc.v2(247, 534), cc.v2(325, 356), 
    cc.v2(838, 323), cc.v2(530, 268), cc.v2(411, 134), cc.v2(686, 163)]

    start () {
        this.walk();
        this.schedule(()=>{this.walk();},8);

    }
    walk(){
        var act = cc.moveBy(1.5, -150, 0).easing(cc.easeIn(6));
        var act2 = cc.moveBy(1.5, 150, 0).easing(cc.easeIn(6));
        var act3 = cc.fadeOut(1.5);
        this.node.scaleX *= this.scale;
        this.node.runAction(cc.sequence(act2, act3));
        this.scheduleOnce(()=>{
            this.node.position = this.pos_set[this.random_num(7)];
            this.node.scaleX *= this.scale;
            this.node.runAction(cc.sequence(cc.fadeIn(1.5),act));
        }, 3);
    }
    random_num(x){
        return Math.floor(Math.random() * x);
    }
}