const { ccclass, property } = cc._decorator;

@ccclass
export default class GlowWidthSliderPrefab extends cc.Component {
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
        let realProgress = this.slider.progress * 0.01;
        this.valueLabel.string = `${(realProgress * 100).toFixed(2)}%`;
    }
}
