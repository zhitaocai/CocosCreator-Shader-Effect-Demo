const { ccclass, property } = cc._decorator;

@ccclass
export default class MainSceneCtrl extends cc.Component {
    @property(cc.Sprite)
    exampleSprite: cc.Sprite = null;

    @property(cc.Label)
    exampleLabel: cc.Label = null;

    start() {
        this._updateSpriteOutlineWidth(0);
        this._updateLabelOutlineWidth(0);
    }

    onSideCallBack(slider: cc.Slider, customEventData: string) {
        this._updateSpriteOutlineWidth(slider.progress / 100);
        this._updateLabelOutlineWidth(slider.progress / 100);
    }

    /**
     * 动态更新描边宽度
     *
     * 1. 获取材质
     * 2. 给材质的自定义 unitform 变量赋值
     * 3. 重新将材质赋值回去
     *
     * @property outlineSize 描边长度比例[0,1] 比如0.5，那么就是宽*0.5 高*0.5
     */
    private _updateSpriteOutlineWidth(outlineSize: number) {
        let spriteMaterial: cc.Material = this.exampleSprite.getMaterial(0);
        spriteMaterial.setProperty("outlineSize", outlineSize);
        this.exampleSprite.setMaterial(0, spriteMaterial);
    }

    private _updateLabelOutlineWidth(outlineSize: number) {
        let labelMaterial: cc.Material = this.exampleLabel.getMaterial(0);
        labelMaterial.setProperty("outlineSize", outlineSize);
        this.exampleLabel.setMaterial(0, labelMaterial);
    }
}
