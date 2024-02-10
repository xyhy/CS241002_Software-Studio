const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.String) next_scene: string = "";
    @property(cc.String) last_scene: string = "";

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
    }

    // update (dt) {}
}
