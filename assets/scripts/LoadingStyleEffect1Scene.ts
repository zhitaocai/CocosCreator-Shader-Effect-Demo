const { ccclass, property } = cc._decorator;

@ccclass
export default class LoadingStyleEffect1Scene extends cc.Component {
    onLoad() {
        // 关闭动态合图
        cc.dynamicAtlasManager.enabled = false;
    }
}
