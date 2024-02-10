const {ccclass, property} = cc._decorator;

@ccclass
export default class WinTube extends cc.Component {

    @property(cc.String) next_level :string = "";
    @property(cc.String) transition_type :string = "from_right";

    onBeginContact(contact:cc.PhysicsContact, self:cc.Collider, other:cc.Collider){
        if(other.node.name == "player"){
            cc.find("SceneManager").getComponent("scene_manage").go_next_level(this.next_level, this.transition_type);
        }
    }
}
