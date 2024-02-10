
const {ccclass, property} = cc._decorator;

@ccclass
export default class plat_gen extends cc.Component {

    @property([cc.Prefab])
    platform: cc.Prefab[] = [];
   
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.generate_up();
        this.schedule(this.generate_up,3);
        
        setTimeout(() => {
            this.generate_down();
            this.schedule(this.generate_down,3);
        }, 1000);
    }

    generate_up(){
        var new_type = 0;
        var new_plat = cc.instantiate(this.platform[new_type]);
        new_plat.position = this.node.convertToNodeSpaceAR(cc.v2(this.random_x(170, 401), -180));
        new_plat.getComponent('platform_boss1').dir = 0;
        new_plat.getComponent('platform_boss1').type = new_type;
        new_plat.parent = this.node;
    }

    generate_down(){
        var new_type = this.random_platform();
        var new_plat = cc.instantiate(this.platform[new_type]);
        new_plat.position = this.node.convertToNodeSpaceAR(cc.v2(this.random_x(550, 721), 800));
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

}

//up: 170~400 y = -180
//down: 550~720 y = 800
