const { ccclass, property } = cc._decorator;

@ccclass
export default class OldPhotoEffectScene extends cc.Component {
    private _oldLevelSlider: cc.Slider = null;
    private _oldLevelSliderLabel: cc.Label = null;

    private _examplesParentNode: cc.Node = null;

    onLoad() {
        this._oldLevelSlider = cc.find("Canvas/Content/Sliders/OldLevelSlider/Slider").getComponent(cc.Slider);
        this._oldLevelSliderLabel = cc.find("Canvas/Content/Sliders/OldLevelSlider/ValueLabel").getComponent(cc.Label);

        this._examplesParentNode = cc.find("Canvas/Content/Examples");
    }

    onEnable() {
        this._oldLevelSlider.node.on("slide", this._onSliderChanged, this);
    }

    onDisable() {
        this._oldLevelSlider.node.off("slide", this._onSliderChanged, this);
    }

    start() {
        this._onSliderChanged();
    }

    private _onSliderChanged() {
        this._oldLevelSliderLabel.string = `${this._oldLevelSlider.progress.toFixed(2)}`;

        // 更新材质
        this._updateRenderComponentMaterial({
            oldLevel: this._oldLevelSlider.progress
        });
    }

    /**
     * 更新渲染组件的材质
     *
     * 1. 获取材质
     * 2. 给材质的 unitform 变量赋值
     * 3. 重新将材质赋值回去
     */
    private _updateRenderComponentMaterial(param: {
        /**
         * 老化程度 [0.0, 1.0] ，1.0 表示完全老化
         */
        oldLevel: number;
    }) {
        this._examplesParentNode.children.forEach(childNode => {
            childNode.getComponents(cc.RenderComponent).forEach(renderComponent => {
                let material: cc.Material = renderComponent.getMaterial(0);
                material.setProperty("oldLevel", param.oldLevel);
                renderComponent.setMaterial(0, material);
            });
        });
    }
}
