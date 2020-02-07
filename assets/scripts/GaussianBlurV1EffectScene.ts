const { ccclass, property } = cc._decorator;

@ccclass
export default class GaussianBlurV1EffectScene extends cc.Component {
    private _blurSlider: cc.Slider = null;
    private _blurSliderLabel: cc.Label = null;

    private _examplesParentNode: cc.Node = null;

    onLoad() {
        cc.dynamicAtlasManager.enabled = false;

        this._blurSlider = cc.find("Canvas/Content/Controller/BlurSlider/Slider").getComponent(cc.Slider);
        this._blurSliderLabel = cc.find("Canvas/Content/Controller/BlurSlider/ValueLabel").getComponent(cc.Label);

        this._examplesParentNode = cc.find("Canvas/Content/Examples");
    }

    onEnable() {
        this._blurSlider.node.on("slide", this._onSliderChanged, this);
    }

    onDisable() {
        this._blurSlider.node.off("slide", this._onSliderChanged, this);
    }

    start() {
        this._onSliderChanged();
    }

    private _onSliderChanged() {
        this._blurSliderLabel.string = `${this._blurSlider.progress.toFixed(2)}`;

        // 更新材质
        this._updateRenderComponentMaterial({});
    }

    /**
     * 更新渲染组件的材质
     *
     * 1. 获取材质
     * 2. 给材质的 unitform 变量赋值
     * 3. 重新将材质赋值回去
     */
    private _updateRenderComponentMaterial(param: {}) {
        this._examplesParentNode.children.forEach(childNode => {
            childNode.getComponents(cc.RenderComponent).forEach(renderComponent => {
                let material: cc.Material = renderComponent.getMaterial(0);
                material.setProperty("textureSize", cc.v2(childNode.width, childNode.height));
                renderComponent.setMaterial(0, material);
            });
        });
    }
}
