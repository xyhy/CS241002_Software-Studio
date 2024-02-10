
const {ccclass, property} = cc._decorator;

@ccclass
export default class lava_gen_1_4 extends cc.Component {

    
    @property(cc.Prefab)
    lava_ball:cc.Prefab = null;

    start () {
        for(var i = 0; i<4; i++){
            var new_lava = cc.instantiate(this.lava_ball);
            new_lava.parent = this.node.parent;
        }
        this.schedule(()=>{
            for(var i = 0; i<4; i++){
                var new_lava = cc.instantiate(this.lava_ball);
                new_lava.parent = this.node.parent;
            }
        }, 10);
    }

    // update (dt) {}
}
