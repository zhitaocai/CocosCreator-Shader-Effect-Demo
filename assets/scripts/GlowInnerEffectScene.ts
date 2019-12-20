const { ccclass, property } = cc._decorator;

@ccclass
export default class GlowInnerEffectScene extends cc.Component {
    private _redSlider: cc.Slider = null;
    private _greenSlider: cc.Slider = null;
    private _blueSlider: cc.Slider = null;
    private _alphaSlider: cc.Slider = null;
    private _widthSlider: cc.Slider = null;
    private _examplesParentNode: cc.Node = null;

    onLoad() {
        this._redSlider = cc.find("Canvas/SliderLayouts/RedSlider/Slider").getComponent(cc.Slider);
        this._greenSlider = cc.find("Canvas/SliderLayouts/GreenSlider/Slider").getComponent(cc.Slider);
        this._blueSlider = cc.find("Canvas/SliderLayouts/BlueSlider/Slider").getComponent(cc.Slider);
        this._alphaSlider = cc.find("Canvas/SliderLayouts/AlphaSlider/Slider").getComponent(cc.Slider);
        this._widthSlider = cc.find("Canvas/SliderLayouts/WidthSlider/Slider").getComponent(cc.Slider);
        this._examplesParentNode = cc.find("Canvas/Examples");
    }

    onEnable() {
        this._redSlider.node.on("slide", this._onSliderChanged, this);
        this._greenSlider.node.on("slide", this._onSliderChanged, this);
        this._blueSlider.node.on("slide", this._onSliderChanged, this);
        this._alphaSlider.node.on("slide", this._onSliderChanged, this);
        this._widthSlider.node.on("slide", this._onSliderChanged, this);
    }

    onDisable() {
        this._redSlider.node.off("slide", this._onSliderChanged, this);
        this._greenSlider.node.off("slide", this._onSliderChanged, this);
        this._blueSlider.node.off("slide", this._onSliderChanged, this);
        this._alphaSlider.node.off("slide", this._onSliderChanged, this);
        this._widthSlider.node.off("slide", this._onSliderChanged, this);
    }

    start() {
        this._onSliderChanged();
    }

    private _onSliderChanged() {
        this._updateRenderComponentOutterGlowMaterial({
            glowColor: cc.v4(this._redSlider.progress, this._greenSlider.progress, this._blueSlider.progress, this._alphaSlider.progress),
            glowColorSize: this._widthSlider.progress / 100
        });
    }

    /**
     * 更新渲染组件的材质
     *
     * 1. 获取材质
     * 2. 给材质的自定义 unitform 变量赋值
     * 3. 重新将材质赋值回去
     */
    private _updateRenderComponentOutterGlowMaterial(param: {
        /**
         * 发光宽度 [0.0, 1.0]
         */
        glowColorSize: number;

        /**
         * 发光颜色 [0.0, 1.0]
         */
        glowColor: cc.Vec4;
    }) {
        this._examplesParentNode.children.forEach(childNode => {
            childNode.getComponents(cc.RenderComponent).forEach(renderComponent => {
                let material: cc.Material = renderComponent.getMaterial(0);
                material.setProperty("glowColorSize", param.glowColorSize);
                material.setProperty("glowColor", param.glowColor);
                renderComponent.setMaterial(0, material);
            });
        });
    }
}
