
const {ccclass, property} = cc._decorator;

@ccclass
export default class ch1_1 extends cc.Component {

    @property(cc.Prefab)
    private dialog: cc.Prefab = null;
    // LIFE-CYCLE CALLBACKS:
    public scene_name;
    

    start () {
        this.scene_name = cc.director.getScene().name;
        var dialog_box = cc.instantiate(this.dialog);
        
        dialog_box.parent = cc.find('All Nodes/Canvas/Main Camera');
        
        if(this.scene_name == '1-1'){
            dialog_box.getComponent('dialogue').init([{role:'我', content:'這是哪裡？我在這裡多久了？'},{role:'我', content: '.....'}]);
        }else if(this.scene_name == '1-2'){
            dialog_box.getComponent('dialogue').init([{role:'提示', content:'試試跳躍到牆壁上！'}]);
        }else if(this.scene_name == 'boss'){
            dialog_box.getComponent('dialogue').init([{role:'守門人', content:'你是誰！？'}]);
        }
    }

    // update (dt) {}
}
