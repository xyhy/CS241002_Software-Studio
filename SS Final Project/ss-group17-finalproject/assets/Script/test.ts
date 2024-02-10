const {ccclass, property} = cc._decorator;

@ccclass
export default class SearchLight extends cc.Component {

    

    // 材质对象
    private _materi: cc.Material;

    private light_strength: number = 0.05;
    public start() {
        this._materi = this.node.getComponent(cc.Sprite).getMaterial(0);
        
        // 计算窗口或界面的宽高比，该例子是屏幕的宽高比
        let ratio = cc.winSize.width / cc.winSize.height;
        // 获取材质并初始化纹理的各个属性
        // 屏幕宽高比，用于纠正坐标
        this._materi.setProperty("wh_ratio", ratio);  
        // 光源半径
        this._materi.setProperty("light_radius", 0.02);   
        // 光源中心点，默认设置到屏幕外
        this._materi.setProperty("light_center", cc.v2(2.0, 2.0)); 
        // 环境光强度，就是光源没照到的地方亮度。
        this._materi.setProperty("ambient_strength", 0.05);  
        // 光源强度，这里设置为最大1。
        this._materi.setProperty("light_strength", 1); 
        // 光源颜色，这里设置为白光
        this._materi.setProperty("light_color", new cc.Vec4(1, 0, 0, 1)); 
        this.scheduleOnce(()=>{this.start_to_light();}, 5);
    }

    update(dt){
        var player_node = cc.find('All Nodes/Canvas/player');
        let center = this.getLightCenter(this.node.convertToWorldSpaceAR(player_node.position));
        this._materi.setProperty("light_center", center);
        
    }
    
    start_to_light(){
        this.schedule(()=>{
            if(this.light_strength >= 1){
                this.light_strength = 1;
            }else{
                this.light_strength += 0.05;
            }
            this._materi.setProperty("ambient_strength", this.light_strength);
        },0.05);
    }
    /** 根据touch坐标计算光源中心点 */
    public getLightCenter(pos: cc.Vec2): cc.Vec2 {
        let x = pos.x / (cc.winSize.width / 2) - 1;
        let y = pos.y / (cc.winSize.height / 2) - 1;
        return cc.v2(x, y);
    }
}