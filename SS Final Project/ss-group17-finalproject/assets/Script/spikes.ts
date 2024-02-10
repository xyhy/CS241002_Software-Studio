
const {ccclass, property} = cc._decorator;

@ccclass
export default class spikes extends cc.Component {

    public state: number = null;

    private anim: cc.Animation = null;
    
 
    start () {
        this.state = 0;
        this.anim = this.getComponent(cc.Animation);
        this.schedule(()=>{
            this.anim.play('spike_out');
            setTimeout(()=>{
                this.state = 1;
                //cc.log('out');
            }, 440);
            setTimeout(() => {
                this.state = 0;
                //cc.log('in');
            }, 1500);
        }, 6);
    }
    


}
