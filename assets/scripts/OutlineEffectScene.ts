const { ccclass, property } = cc._decorator;

@ccclass
export default class OutlineEffectScene extends cc.Component {
    private _widthSlider: cc.Slider = null;
    private _widthSliderLabel: cc.Label = null;

    private _examplesParentNode: cc.Node = null;

    onLoad() {
        // 关闭动态合图
        cc.dynamicAtlasManager.enabled = false;

        this._widthSlider = cc.find("Canvas/Content/Sliders/WidthSlider/Slider").getComponent(cc.Slider);
        this._widthSliderLabel = cc.find("Canvas/Content/Sliders/WidthSlider/ValueLabel").getComponent(cc.Label);

        this._examplesParentNode = cc.find("Canvas/Content/Examples");
    }

    onEnable() {
        this._widthSlider.node.on("slide", this._onSliderChanged, this);
    }

    onDisable() {
        this._widthSlider.node.off("slide", this._onSliderChanged, this);
    }

    start() {
        this._onSliderChanged();
    }

    private _onSliderChanged() {
        let outlineWidth = parseFloat((this._widthSlider.progress / 100).toFixed(4));
        this._widthSliderLabel.string = `${outlineWidth}`;

        // 更新材质
        this._updateRenderComponentMaterial({
            outlineWidth: outlineWidth
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
         * 描边宽度 [0.0, 1.0]，比如：0.5，那么就是宽*0.5 高*0.5
         */
        outlineWidth: number;
    }) {
        this._examplesParentNode.children.forEach(childNode => {
            childNode.getComponents(cc.RenderComponent).forEach(renderComponent => {
                let material: cc.Material = renderComponent.getMaterial(0);
                material.setProperty("outlineWidth", param.outlineWidth);
                renderComponent.setMaterial(0, material);
            });
        });
    }
}
