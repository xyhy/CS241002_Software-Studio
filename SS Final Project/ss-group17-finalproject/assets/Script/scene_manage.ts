const {ccclass, property} = cc._decorator;

@ccclass
export default class SceneManage extends cc.Component {
    @property(cc.Prefab) berry_count :cc.Prefab = null; 
    private strawberry_record :boolean[][];
    private level_record :boolean[][];
    private strawberry_count = 0;
    public first_time = true;

    onLoad (){
        cc.game.addPersistRootNode(this.node);
    }

    start () {
        this.node.runAction(cc.fadeOut(2));
        this.strawberry_count = 0;
        this.strawberry_record = [[],[],[]];
        this.level_record = [[],[],[]];
        
        for(let i=0;i<3;i++){
            for(let j=0;j<5;j++){
                this.strawberry_record[i].push(false);
                this.level_record[i].push(false);
            }
        }
        this.level_record[0][0] = true;
        this.first_time = true;
    }

    change_scene(scene_name :string, type :string){
        this.set_curtain_position();
        this.node.setContentSize(cc.winSize);
        cc.director.preloadScene(scene_name);
        this.node.stopAllActions();
        this.node.runAction(cc.fadeIn(0));

        if(type == "from_right"){
            let move = cc.moveBy(0.5, cc.v2(-1*cc.winSize.width, 0));
            move.easing(cc.easeSineOut());
            this.node.runAction(cc.sequence(
                cc.moveBy(0, cc.v2(cc.winSize.width, 0)),
                cc.show(),
                move,
                cc.callFunc(()=>{cc.director.loadScene(scene_name, ()=>{
                    this.set_curtain_position();
                    this.node.runAction(cc.sequence(move, cc.hide()));
                    this.create_strawberry_count();
                    this.preload_next_level();
                });})
            ))
        }
        else if(type == "from_left"){
            let move = cc.moveBy(0.5, cc.v2(cc.winSize.width, 0));
            move.easing(cc.easeSineInOut());
            this.node.runAction(cc.sequence(
                cc.moveBy(0, cc.v2(-cc.winSize.width, 0)),
                cc.show(),
                move,
                cc.callFunc(()=>{cc.director.loadScene(scene_name, ()=>{
                    this.set_curtain_position();
                    this.node.runAction(cc.sequence(move, cc.hide()));
                    this.create_strawberry_count();
                    this.preload_next_level();
                });})
            ))
        }
        else if(type == "from_top"){
            let move = cc.moveBy(0.5,cc.v2(0,-cc.winSize.height));
            move.easing(cc.easeSineInOut());
            this.node.runAction(cc.sequence(
                cc.moveBy(0,cc.v2(0,cc.winSize.height)),
                cc.show(),
                move,
                cc.callFunc(()=>{cc.director.loadScene(scene_name, ()=>{
                    this.set_curtain_position();
                    this.node.runAction(cc.sequence(move, cc.hide()));
                    this.create_strawberry_count();
                    this.preload_next_level();
                });})
            ))
        }
        else if(type == "from_bottom"){
            let move = cc.moveBy(0.5,cc.v2(0,cc.winSize.height));
            move.easing(cc.easeSineInOut());
            this.node.runAction(cc.sequence(
                cc.moveBy(0,cc.v2(0,-cc.winSize.height)),
                cc.show(),
                move,
                cc.callFunc(()=>{cc.director.loadScene(scene_name, ()=>{
                    this.set_curtain_position();
                    this.node.runAction(cc.sequence(move, cc.hide()));
                    this.create_strawberry_count();
                    this.preload_next_level();
                });})
            ))
        }
        else if(type == "fade"){
            this.node.runAction(cc.sequence(
                    cc.fadeIn(0.5),
                    cc.callFunc(()=>{cc.director.loadScene(scene_name, ()=>{
                        this.node.runAction(cc.fadeOut(0.5));
                        this.set_curtain_position();
                        this.create_strawberry_count();
                        this.preload_next_level();
                    });})
                )
            )
        }
        else{
            cc.log("Error: unknown transition type");
        }
    }

    die_reload(){
        this.first_time = false;
        this.change_scene(cc.director.getScene().name, "from_top");
    }

    update_strawberry_state(){
        if(cc.director.getScene().name[0] == 'a') return;

        let level = cc.director.getScene().name;
        if(!this.strawberry_record[parseInt(level[0])-1][parseInt(level[2])-1]){
            this.strawberry_count++;
            this.strawberry_record[parseInt(level[0])-1][parseInt(level[2])-1] = true;
            cc.find("All Nodes/Canvas/Main Camera/strawberry_count").getComponent("strawberry_count").increase(this.strawberry_count);
        }
    }

    get_strawberry_state(){
        let level = cc.director.getScene().name;
        // cc.log("sc=" + this.strawberry_count);
        return this.strawberry_record[parseInt(level[0])-1][parseInt(level[2])-1];
    }

    create_strawberry_count(){
        if(cc.director.getScene().name[0] == 'a' || cc.director.getScene().name == 'final') return;

        let nd = cc.instantiate(this.berry_count);
        nd.name = "strawberry_count";
        cc.find("All Nodes/Canvas/Main Camera").addChild(nd);
        if(cc.director.getScene().name == "chapter select"){
            cc.find("All Nodes/Canvas/Main Camera/strawberry_count").getComponent("strawberry_count").show(this.strawberry_count);
        }
        cc.log("create_strawberry_count");
    }

    go_next_level(scene_name :string, type :string){
        this.first_time = true;
        if(scene_name[0] == "b"){
            if(scene_name == "boss") this.level_record[0][4] = true;
            else if(scene_name == "boss_2") this.level_record[1][4] = true;
            else this.level_record[2][4] = true;
        }
        else{
            this.level_record[parseInt(scene_name[0])-1][parseInt(scene_name[2])-1] = true;
        }
        this.change_scene(scene_name, type);
    }

    enter_selected_level(scene_name :string){
        this.first_time = true;
        this.change_scene(scene_name, "fade");
    }

    go_animation(scene_name :string){
        this.first_time = true;
        this.change_scene(scene_name, "fade");
    }

    set_curtain_position(){
        if(cc.director.getScene().name[0] == "a" || cc.director.getScene().name == "final") this.node.position = cc.find("Canvas/Main Camera").position.add(cc.v2(480,320));
        else this.node.position = cc.find("All Nodes/Canvas/Main Camera").position.add(cc.v2(480,320));
    }

    get_level_record(){
        return this.level_record;
    }

    preload_next_level(){
        let name = cc.director.getScene().name;
        switch (name) {
            case "1-1": cc.director.preloadScene("1-2");break;
            case "1-2": cc.director.preloadScene("1-3");break;
            case "1-3": cc.director.preloadScene("1-4");break;
            case "1-4": cc.director.preloadScene("boss");break;
            case "boss": cc.director.preloadScene("animation1");break;
            case "animation1": cc.director.preloadScene("animation2");break;
            case "animation2": cc.director.preloadScene("2-1");break;
            case "2-1": cc.director.preloadScene("2-2");break;
            case "2-2": cc.director.preloadScene("2-3");break;
            case "2-3": cc.director.preloadScene("2-4");break;
            case "2-4": cc.director.preloadScene("boss_2");break;
            case "boss_2": cc.director.preloadScene("animation3");break;
            case "animation3": cc.director.preloadScene("3-1");break;
            case "3-1": cc.director.preloadScene("3-2");break;
            case "3-2": cc.director.preloadScene("3-3");break;
            case "3-3": cc.director.preloadScene("3-4");break;
            case "3-4": cc.director.preloadScene("boss_3");break;
            case "boss_3": cc.director.preloadScene("animation4");break;
            case "animation4": cc.director.preloadScene("final");break;
            case "final": cc.director.preloadScene("chapter select");break;
            default: break;
        }
    }

    get_first_time(){
        return this.first_time;
    }
}
