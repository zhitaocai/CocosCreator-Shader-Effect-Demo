const { ccclass, property } = cc._decorator;

@ccclass
export default class PreviewEffectScene extends cc.Component {
    onLoad() {
        // 关闭动态合图
        cc.dynamicAtlasManager.enabled = false;
    }
}
