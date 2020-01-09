const { ccclass, property } = cc._decorator;

@ccclass
export default class RoundCornerCropEffectScene extends cc.Component {
    private _roundCornerRadiuSlider: cc.Slider = null;
    private _roundCornerRadiuLabel: cc.Label = null;

    private _examplesParentNode: cc.Node = null;

    onLoad() {
        // 关闭动态合图
        cc.dynamicAtlasManager.enabled = false;

        this._roundCornerRadiuSlider = cc.find("Canvas/Content/Sliders/RoundCornerRadiusSlider/Slider").getComponent(cc.Slider);
        this._roundCornerRadiuLabel = cc.find("Canvas/Content/Sliders/RoundCornerRadiusSlider/ValueLabel").getComponent(cc.Label);

        this._examplesParentNode = cc.find("Canvas/Content/Examples");
    }

    onEnable() {
        this._roundCornerRadiuSlider.node.on("slide", this._onSliderChanged, this);
    }

    onDisable() {
        this._roundCornerRadiuSlider.node.off("slide", this._onSliderChanged, this);
    }

    start() {
        this._onSliderChanged();
    }

    private _onSliderChanged() {
        this._roundCornerRadiuLabel.string = `${this._roundCornerRadiuSlider.progress.toFixed(2)}`;

        // 更新材质
        this._updateRenderComponentMaterial({
            roundCornerRadius: this._roundCornerRadiuSlider.progress
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
         * 圆角半径 [0.0, 0.5] ，0.5 表示圆形裁剪
         */
        roundCornerRadius: number;
    }) {
        this._examplesParentNode.children.forEach(childNode => {
            childNode.getComponents(cc.RenderComponent).forEach(renderComponent => {
                let material: cc.Material = renderComponent.getMaterial(0);
                material.setProperty("roundCornerRadius", param.roundCornerRadius);
                renderComponent.setMaterial(0, material);
            });
        });
    }
}
