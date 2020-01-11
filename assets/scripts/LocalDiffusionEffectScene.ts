import LocalDiffusionCtrl from "./LocalDiffusionCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LocalDiffusionEffectScene extends cc.Component {
    private _redSlider: cc.Slider = null;
    private _redSliderLabel: cc.Label = null;

    private _greenSlider: cc.Slider = null;
    private _greenSliderLabel: cc.Label = null;

    private _blueSlider: cc.Slider = null;
    private _blueSliderLabel: cc.Label = null;

    private _alphaSlider: cc.Slider = null;
    private _alphaSliderLabel: cc.Label = null;

    private _radiuSlider: cc.Slider = null;
    private _radiuSliderLabel: cc.Label = null;

    private _examplesParentNode: cc.Node = null;

    onLoad() {
        cc.dynamicAtlasManager.enabled = false;

        this._redSlider = cc.find("Canvas/Content/Sliders/ColorRedSlider/Slider").getComponent(cc.Slider);
        this._redSliderLabel = cc.find("Canvas/Content/Sliders/ColorRedSlider/ValueLabel").getComponent(cc.Label);

        this._greenSlider = cc.find("Canvas/Content/Sliders/ColorGreenSlider/Slider").getComponent(cc.Slider);
        this._greenSliderLabel = cc.find("Canvas/Content/Sliders/ColorGreenSlider/ValueLabel").getComponent(cc.Label);

        this._blueSlider = cc.find("Canvas/Content/Sliders/ColorBlueSlider/Slider").getComponent(cc.Slider);
        this._blueSliderLabel = cc.find("Canvas/Content/Sliders/ColorBlueSlider/ValueLabel").getComponent(cc.Label);

        this._alphaSlider = cc.find("Canvas/Content/Sliders/ColorAlphaSlider/Slider").getComponent(cc.Slider);
        this._alphaSliderLabel = cc.find("Canvas/Content/Sliders/ColorAlphaSlider/ValueLabel").getComponent(cc.Label);

        this._radiuSlider = cc.find("Canvas/Content/Sliders/RadiuSlider/Slider").getComponent(cc.Slider);
        this._radiuSliderLabel = cc.find("Canvas/Content/Sliders/RadiuSlider/ValueLabel").getComponent(cc.Label);

        // 代码添加控制脚本
        this._examplesParentNode = cc.find("Canvas/Content/Examples");
        this._examplesParentNode.children.forEach(childNode => {
            childNode.addComponent(LocalDiffusionCtrl);
        });
    }

    onEnable() {
        this._redSlider.node.on("slide", this._onSliderChanged, this);
        this._greenSlider.node.on("slide", this._onSliderChanged, this);
        this._blueSlider.node.on("slide", this._onSliderChanged, this);
        this._alphaSlider.node.on("slide", this._onSliderChanged, this);
        this._radiuSlider.node.on("slide", this._onSliderChanged, this);
    }

    onDisable() {
        this._redSlider.node.off("slide", this._onSliderChanged, this);
        this._greenSlider.node.off("slide", this._onSliderChanged, this);
        this._blueSlider.node.off("slide", this._onSliderChanged, this);
        this._alphaSlider.node.off("slide", this._onSliderChanged, this);
        this._radiuSlider.node.off("slide", this._onSliderChanged, this);
    }

    start() {
        this._onSliderChanged();
    }

    private _onSliderChanged() {
        // 更新进度条值 Label 文本
        this._redSliderLabel.string = `${this._redSlider.progress.toFixed(2)} | ${Math.round(255 * this._redSlider.progress)}`;
        this._greenSliderLabel.string = `${this._greenSlider.progress.toFixed(2)} | ${Math.round(255 * this._greenSlider.progress)}`;
        this._blueSliderLabel.string = `${this._blueSlider.progress.toFixed(2)} | ${Math.round(255 * this._blueSlider.progress)}`;
        this._alphaSliderLabel.string = `${this._alphaSlider.progress.toFixed(2)} | ${Math.round(255 * this._alphaSlider.progress)}`;
        this._radiuSliderLabel.string = `${this._radiuSlider.progress.toFixed(2)}`;

        // 通知子节点更新材质
        this._examplesParentNode.children.forEach(childNode => {
            childNode.emit(
                "on_property_change",
                cc.color(
                    Math.round(255 * this._redSlider.progress),
                    Math.round(255 * this._greenSlider.progress),
                    Math.round(255 * this._blueSlider.progress),
                    Math.round(255 * this._alphaSlider.progress)
                ),
                this._radiuSlider.progress
            );
        });
    }
}
