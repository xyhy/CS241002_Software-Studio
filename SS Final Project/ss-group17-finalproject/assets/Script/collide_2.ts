
const {ccclass, property} = cc._decorator;

@ccclass
export default class collide_2 extends cc.Component {

    

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
    }

    start () {

    }
    onBeginContact(contact, self, other){
        //cc.log(contact.getWorldManifold().normal.y)
        if(contact.getWorldManifold().normal.y < 0){
            contact.disabled = true;
        }
    }
    // update (dt) {}
}
// || contact.getWorldManifold().normal.x == 1 || contact.getWorldManifold().normal.x == -1