
const {ccclass, property} = cc._decorator;

@ccclass
export default class ch2_diag extends cc.Component {

    @property(cc.Prefab)
    dialog: cc.Prefab = null;

    private scene_name: string = ''
    public dialogue_2_1 = [{role:'我', content:'這個場景...'}];

    public dialogue_2_3 = [{role:'我', content:'天色好像變差了...'}, {role:'我', content:'總覺得似曾相似...'}];
    public dialogue_2_4 = [{role:'學姊', content:'那個...我們要不要在這裡折返？'},
    {role:'我', content: '咦！'}, {role:'學姊', content:'天色越來越差了'}, 
    {role:'學姊', content:'這樣子可能會來不及在入夜前下山'},
    {role:'我', content: '可是只剩下三分之一的路程了吧'},
    {role:'我', content: '要在這裡放棄嗎？'}];

    public dialogue_2_5 = [{role:'怪物', content:'抱歉，你們不能再前進了。'}];
    
    onload() {
        
    }

    start () {
        this.scene_name = cc.director.getScene().name;
        if(this.scene_name == '2-1') {
            var dialog_box = cc.instantiate(this.dialog);
            dialog_box.parent = this.node;
            dialog_box.getComponent('dialogue').init(this.dialogue_2_1);
        }
        else if(this.scene_name == '2-3') {
            var dialog_box = cc.instantiate(this.dialog);
            dialog_box.parent = this.node;
            dialog_box.getComponent('dialogue').init(this.dialogue_2_3);
        }
        else if(this.scene_name == '2-4') {
            var dialog_box = cc.instantiate(this.dialog);
            dialog_box.parent = this.node;
            dialog_box.getComponent('dialogue').init(this.dialogue_2_4);
        }
        else if(this.scene_name == 'boss_2'){
            var dialog_box = cc.instantiate(this.dialog);
            dialog_box.parent = this.node;
            dialog_box.getComponent('dialogue').init(this.dialogue_2_5);
        }

        
    }

    // update (dt) {}
}
