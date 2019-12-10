const {ccclass, property} = cc._decorator;

@ccclass
export default class MainSceneCtrl extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    start () {
        // init logic
        this.label.string = this.text;
    }
}
