import FlashLightCtrlComponent, { FlashLightUBO } from "./FlashLightCtrlComponent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FlashLightEffectScene extends cc.Component {
    private _redSlider: cc.Slider = null;
    private _redSliderLabel: cc.Label = null;
    private _greenSlider: cc.Slider = null;
    private _greenSliderLabel: cc.Label = null;
    private _blueSlider: cc.Slider = null;
    private _blueSliderLabel: cc.Label = null;
    private _alphaSlider: cc.Slider = null;
    private _alphaSliderLabel: cc.Label = null;
    private _lightWidthSlider: cc.Slider = null;
    private _lightWidthSliderLabel: cc.Label = null;
    private _lightAngleSlider: cc.Slider = null;
    private _lightAngleSliderLabel: cc.Label = null;

    private _enableGradientToggle: cc.Toggle = null;
    private _cropAlphaToggle: cc.Toggle = null;
    private _enableFogToggle: cc.Toggle = null;

    private _examplesParentNode: cc.Node = null;

    onLoad() {
        cc.dynamicAtlasManager.enabled = false;

        this._redSlider = cc.find("Canvas/Content/Controller/ColorRedSlider/Slider").getComponent(cc.Slider);
        this._redSliderLabel = cc.find("Canvas/Content/Controller/ColorRedSlider/ValueLabel").getComponent(cc.Label);
        this._greenSlider = cc.find("Canvas/Content/Controller/ColorGreenSlider/Slider").getComponent(cc.Slider);
        this._greenSliderLabel = cc.find("Canvas/Content/Controller/ColorGreenSlider/ValueLabel").getComponent(cc.Label);
        this._blueSlider = cc.find("Canvas/Content/Controller/ColorBlueSlider/Slider").getComponent(cc.Slider);
        this._blueSliderLabel = cc.find("Canvas/Content/Controller/ColorBlueSlider/ValueLabel").getComponent(cc.Label);
        this._alphaSlider = cc.find("Canvas/Content/Controller/ColorAlphaSlider/Slider").getComponent(cc.Slider);
        this._alphaSliderLabel = cc.find("Canvas/Content/Controller/ColorAlphaSlider/ValueLabel").getComponent(cc.Label);
        this._lightWidthSlider = cc.find("Canvas/Content/Controller/LightWidthSlider/Slider").getComponent(cc.Slider);
        this._lightWidthSliderLabel = cc.find("Canvas/Content/Controller/LightWidthSlider/ValueLabel").getComponent(cc.Label);
        this._lightAngleSlider = cc.find("Canvas/Content/Controller/LightAngleSlider/Slider").getComponent(cc.Slider);
        this._lightAngleSliderLabel = cc.find("Canvas/Content/Controller/LightAngleSlider/ValueLabel").getComponent(cc.Label);

        this._enableGradientToggle = cc.find("Canvas/Content/Controller/EnableGradientToggle/Toggle").getComponent(cc.Toggle);
        this._cropAlphaToggle = cc.find("Canvas/Content/Controller/CropAlphaToggle/Toggle").getComponent(cc.Toggle);
        this._enableFogToggle = cc.find("Canvas/Content/Controller/EnableFogToggle/Toggle").getComponent(cc.Toggle);

        // 代码添加控制脚本
        this._examplesParentNode = cc.find("Canvas/Content/Examples");
        this._examplesParentNode.children.forEach(childNode => {
            childNode.addComponent(FlashLightCtrlComponent);
        });
    }

    onEnable() {
        this._redSlider.node.on("slide", this._onPropertyChanged, this);
        this._greenSlider.node.on("slide", this._onPropertyChanged, this);
        this._blueSlider.node.on("slide", this._onPropertyChanged, this);
        this._alphaSlider.node.on("slide", this._onPropertyChanged, this);
        this._lightWidthSlider.node.on("slide", this._onPropertyChanged, this);
        this._lightAngleSlider.node.on("slide", this._onPropertyChanged, this);

        this._enableGradientToggle.node.on("toggle", this._onPropertyChanged, this);
        this._cropAlphaToggle.node.on("toggle", this._onPropertyChanged, this);
        this._enableFogToggle.node.on("toggle", this._onPropertyChanged, this);
    }

    onDisable() {
        this._redSlider.node.off("slide", this._onPropertyChanged, this);
        this._greenSlider.node.off("slide", this._onPropertyChanged, this);
        this._blueSlider.node.off("slide", this._onPropertyChanged, this);
        this._alphaSlider.node.off("slide", this._onPropertyChanged, this);
        this._lightWidthSlider.node.off("slide", this._onPropertyChanged, this);
        this._lightAngleSlider.node.off("slide", this._onPropertyChanged, this);

        this._enableGradientToggle.node.off("toggle", this._onPropertyChanged, this);
        this._cropAlphaToggle.node.off("toggle", this._onPropertyChanged, this);
        this._enableFogToggle.node.off("toggle", this._onPropertyChanged, this);
    }

    start() {
        this._onPropertyChanged();
    }

    private _onPropertyChanged() {
        // 更新进度条值 Label 文本
        this._redSliderLabel.string = `${this._redSlider.progress.toFixed(2)} | ${Math.round(255 * this._redSlider.progress)}`;
        this._greenSliderLabel.string = `${this._greenSlider.progress.toFixed(2)} | ${Math.round(255 * this._greenSlider.progress)}`;
        this._blueSliderLabel.string = `${this._blueSlider.progress.toFixed(2)} | ${Math.round(255 * this._blueSlider.progress)}`;
        this._alphaSliderLabel.string = `${this._alphaSlider.progress.toFixed(2)} | ${Math.round(255 * this._alphaSlider.progress)}`;
        this._lightWidthSliderLabel.string = `${this._lightWidthSlider.progress.toFixed(2)}`;

        let angle = 180 * this._lightAngleSlider.progress;
        this._lightAngleSliderLabel.string = `${this._lightAngleSlider.progress.toFixed(2)} | ${angle.toFixed(2)}`;

        // 通知子节点更新材质
        this._examplesParentNode.children.forEach(childNode => {
            childNode.emit("on_property_change", <FlashLightUBO>{
                lightColor: cc.color(
                    Math.round(255 * this._redSlider.progress),
                    Math.round(255 * this._greenSlider.progress),
                    Math.round(255 * this._blueSlider.progress),
                    Math.round(255 * this._alphaSlider.progress)
                ),
                lightAngle: angle,
                lightWidth: this._lightWidthSlider.progress,
                enableGradient: this._enableGradientToggle.isChecked,
                cropAlpha: this._cropAlphaToggle.isChecked,
                enableFog: this._enableFogToggle.isChecked
            });
        });
    }
}
