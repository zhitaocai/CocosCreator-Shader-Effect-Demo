const { ccclass, property } = cc._decorator;

@ccclass
export default class RoundCornerCropV1EffectScene extends cc.Component {
    private _radiuSlider: cc.Slider = null;
    private _radiuLabel: cc.Label = null;

    private _examplesParentNode: cc.Node = null;

    onLoad() {
        // 关闭动态合图
        cc.dynamicAtlasManager.enabled = false;

        this._radiuSlider = cc.find("Canvas/Content/Controller/RadiusSlider/Slider").getComponent(cc.Slider);
        this._radiuLabel = cc.find("Canvas/Content/Controller/RadiusSlider/ValueLabel").getComponent(cc.Label);

        this._examplesParentNode = cc.find("Canvas/Content/Examples");
    }

    onEnable() {
        this._radiuSlider.node.on("slide", this._onSliderChanged, this);
    }

    onDisable() {
        this._radiuSlider.node.off("slide", this._onSliderChanged, this);
    }

    start() {
        this._onSliderChanged();
    }

    private _onSliderChanged() {
        this._radiuLabel.string = `${this._radiuSlider.progress.toFixed(2)}`;

        // 更新材质
        this._updateRenderComponentMaterial({
            radius: this._radiuSlider.progress
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
        radius: number;
    }) {
        this._examplesParentNode.children.forEach(childNode => {
            childNode.getComponents(cc.RenderComponent).forEach(renderComponent => {
                let material: cc.Material = renderComponent.getMaterial(0);
                material.setProperty("radius", param.radius);
                renderComponent.setMaterial(0, material);
            });
        });
    }
}
