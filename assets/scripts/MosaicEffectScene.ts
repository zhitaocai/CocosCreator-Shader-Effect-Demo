const { ccclass, property } = cc._decorator;

@ccclass
export default class MosaicEffectScene extends cc.Component {
    private _xMosaicCountSlider: cc.Slider = null;
    private _xMosaicCountSliderLabel: cc.Label = null;
    private _yMosaicCountSlider: cc.Slider = null;
    private _yMosaicCountSliderLabel: cc.Label = null;

    private _examplesParentNode: cc.Node = null;


    onLoad() {
        // 关闭动态合图
        cc.dynamicAtlasManager.enabled = false;

        this._xMosaicCountSlider = cc.find("Canvas/Content/Sliders/XMosaicCountSlider/Slider").getComponent(cc.Slider);
        this._xMosaicCountSliderLabel = cc.find("Canvas/Content/Sliders/XMosaicCountSlider/ValueLabel").getComponent(cc.Label);
        this._yMosaicCountSlider = cc.find("Canvas/Content/Sliders/YMosaicCountSlider/Slider").getComponent(cc.Slider);
        this._yMosaicCountSliderLabel = cc.find("Canvas/Content/Sliders/YMosaicCountSlider/ValueLabel").getComponent(cc.Label);

        this._examplesParentNode = cc.find("Canvas/Content/Examples");
    }

    onEnable() {
        this._xMosaicCountSlider.node.on("slide", this._onSliderChanged, this);
        this._yMosaicCountSlider.node.on("slide", this._onSliderChanged, this);
    }

    onDisable() {
        this._xMosaicCountSlider.node.off("slide", this._onSliderChanged, this);
        this._yMosaicCountSlider.node.off("slide", this._onSliderChanged, this);
    }

    start() {
        this._onSliderChanged();
    }

    private _onSliderChanged() {
        let xMosaicCount = Math.round(this._xMosaicCountSlider.progress * 300);
        this._xMosaicCountSliderLabel.string = `${xMosaicCount}`;

        let yMosaicCount = Math.round(this._yMosaicCountSlider.progress * 300);
        this._yMosaicCountSliderLabel.string = `${yMosaicCount}`;

        // 更新材质
        this._updateRenderComponentMaterial({
            xBlockCount: xMosaicCount,
            yBlockCount: yMosaicCount
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
         * X轴方块数量 [1.0, 正无穷]
         */
        xBlockCount: number;

        /**
         * Y轴方块数量 [1.0, 正无穷]
         */
        yBlockCount: number;
    }) {
        this._examplesParentNode.children.forEach(childNode => {
            childNode.getComponents(cc.RenderComponent).forEach(renderComponent => {
                let material: cc.Material = renderComponent.getMaterial(0);
                material.setProperty("xBlockCount", param.xBlockCount);
                material.setProperty("yBlockCount", param.yBlockCount);
                renderComponent.setMaterial(0, material);
            });
        });
    }
}
