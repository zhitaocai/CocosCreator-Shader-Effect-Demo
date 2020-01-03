const { ccclass, property } = cc._decorator;

@ccclass
export default class GrayEffectScene extends cc.Component {
    private _grayLevelSlider: cc.Slider = null;
    private _grayLevelSliderLabel: cc.Label = null;

    private _examplesParentNode: cc.Node = null;

    onLoad() {
        this._grayLevelSlider = cc.find("Canvas/Content/Sliders/GrayLevelSlider/Slider").getComponent(cc.Slider);
        this._grayLevelSliderLabel = cc.find("Canvas/Content/Sliders/GrayLevelSlider/ValueLabel").getComponent(cc.Label);

        this._examplesParentNode = cc.find("Canvas/Content/Examples");
    }

    onEnable() {
        this._grayLevelSlider.node.on("slide", this._onSliderChanged, this);
    }

    onDisable() {
        this._grayLevelSlider.node.off("slide", this._onSliderChanged, this);
    }

    start() {
        this._onSliderChanged();
    }

    private _onSliderChanged() {
        this._grayLevelSliderLabel.string = `${this._grayLevelSlider.progress.toFixed(2)}`;

        // 更新材质
        this._updateRenderComponentMaterial({
            grayLevel: this._grayLevelSlider.progress
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
         * 灰化程度 [0.0, 1.0] ，1.0 表示完全灰化
         */
        grayLevel: number;
    }) {
        this._examplesParentNode.children.forEach(childNode => {
            childNode.getComponents(cc.RenderComponent).forEach(renderComponent => {
                let material: cc.Material = renderComponent.getMaterial(0);
                material.setProperty("grayLevel", param.grayLevel);
                renderComponent.setMaterial(0, material);
            });
        });
    }
}
