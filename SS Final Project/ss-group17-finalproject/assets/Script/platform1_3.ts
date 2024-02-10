
const {ccclass, property} = cc._decorator;

@ccclass
export default class platform1_3 extends cc.Component {

    @property([cc.Prefab])
    platform: cc.Prefab[] = [];

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.generate_1();
        this.schedule(this.generate_1,3);
        this.generate_2();
        this.schedule(this.generate_2,3);
        this.generate_3();
        this.schedule(this.generate_3,3);
        
        
    }
    generate_1(){
        var new_type = 0;
        var new_plat = cc.instantiate(this.platform[new_type]);
        new_plat.position = this.node.convertToNodeSpaceAR(cc.v2(323.782, 377.413));
        new_plat.getComponent('platform_boss1').dir = 1;
        new_plat.getComponent('platform_boss1').type = new_type;
        new_plat.parent = this.node;
    }

    generate_2(){
        var new_type = 0;
        var new_plat = cc.instantiate(this.platform[new_type]);
        new_plat.position = this.node.convertToNodeSpaceAR(cc.v2(641.558, 163.839));
        new_plat.getComponent('platform_boss1').dir = 0;
        new_plat.getComponent('platform_boss1').type = new_type;
        new_plat.parent = this.node;
    }
    generate_3(){
        var new_type = 0;
        var new_plat = cc.instantiate(this.platform[new_type]);
        new_plat.position = this.node.convertToNodeSpaceAR(cc.v2(1532.498, 376.506));
        new_plat.getComponent('platform_boss1').dir = 1;
        new_plat.getComponent('platform_boss1').type = new_type;
        new_plat.parent = this.node;
    }
    

    
    random_platform(){
        
        return Math.floor(Math.random()*2);
    }
    // update (dt) {}
    random_x(min, max){
        return Math.random() * (max - min) + min;
    }
    // update (dt) {}
}
