
const {ccclass, property} = cc._decorator;

@ccclass
export default class ch1_1 extends cc.Component {

    @property(cc.Prefab)
    dialog: cc.Prefab = null;

    private scene_name: string = ''
    public dialogue_3_1 = [{role:'女孩', content:'跑什麼啊，這一切都已經無法挽回了'},
    {role:'女孩', content: '難道你想要在我落到山谷以前到谷底接住我嗎？就算是夢也太誇張囉！'}];
    /*
    public dialogue_3_2 = [{role:'學姊', content:'要是當時聽我的話，中途折返了不就好了嗎'},
    {role:'學姊', content: '還想用我自己的話來鼓勵我？是會不會太尷尬啊？'}];
    public dialogue_3_3 = [{role:'學姊', content:'我知道的，你喜歡我吧？所以才不管期末考要跟我一起上山'},
    {role:'學姊', content: '結果我只是禮貌性的抱了一下，你就飄起來啦？真是噁心'}];
    public dialogue_3_4 = [{role:'學姊', content:'當初你剛加入登山社時，我只是看你可憐，跟你聊幾句天，就被你當成天使啦？'},
    {role:'學姊', content: '真沒想到你用這種方式來報答我！'}];
    */
    
    onload() {
        
    }

    start () {
        this.scene_name = cc.director.getScene().name;
        //var dialog_box = cc.instantiate(this.dialog);
        cc.log(this.scene_name)
        //dialog_box.parent = this.node;
        if(this.scene_name == '3-1') {
            var dialog_box = cc.instantiate(this.dialog);
            dialog_box.parent = this.node;
            dialog_box.getComponent('dialogue').init(this.dialogue_3_1);
        }
        
    }

    // update (dt) {}
}
