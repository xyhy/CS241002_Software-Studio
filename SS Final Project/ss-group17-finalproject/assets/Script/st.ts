
const {ccclass, property} = cc._decorator;

@ccclass
export default class st extends cc.Component {


    private anim;

    start () {
        this.anim = this.getComponent(cc.Animation);
        this.anim.play('stars');
        this.schedule(()=>{
            //cc.find('All Nodes/Canvas/Main Camera').getComponent('cam_1').earthquake();
            this.anim.play('stars');
        },5);
    }

}
