const { ccclass, property } = cc._decorator;

@ccclass
export default class ColorSliderPrefab extends cc.Component {
    @property(cc.Slider)
    slider: cc.Slider = null;

    @property(cc.Label)
    valueLabel: cc.Label = null;

    onEnable() {
        this.slider.node.on("slide", this._onSliderChanged, this);
    }

    onDisable() {
        this.slider.node.off("slide", this._onSliderChanged, this);
    }

    start() {
        this._onSliderChanged();
    }

    private _onSliderChanged() {
        this.valueLabel.string = `${this.slider.progress.toFixed(2)} | ${Math.round(255 * this.slider.progress)}`;
    }
}
