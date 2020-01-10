const { ccclass, property } = cc._decorator;

@ccclass
export default class LocalDiffusionEffectScene extends cc.Component {
    private _oldLevelSlider: cc.Slider = null;
    private _oldLevelSliderLabel: cc.Label = null;

    private _examplesParentNode: cc.Node = null;

    onLoad() {
        cc.dynamicAtlasManager.enabled = false;
        
        this._oldLevelSlider = cc.find("Canvas/Content/Sliders/OldLevelSlider/Slider").getComponent(cc.Slider);
        this._oldLevelSliderLabel = cc.find("Canvas/Content/Sliders/OldLevelSlider/ValueLabel").getComponent(cc.Label);

        this._examplesParentNode = cc.find("Canvas/Content/Examples");
    }

    onEnable() {
        this._oldLevelSlider.node.on("slide", this._onSliderChanged, this);
    }

    onDisable() {
        this._oldLevelSlider.node.off("slide", this._onSliderChanged, this);
    }

    start() {
        this._onSliderChanged();
    }

    private _onSliderChanged() {
        this._oldLevelSliderLabel.string = `${this._oldLevelSlider.progress.toFixed(2)}`;

        // // 更新材质
        // this._updateRenderComponentMaterial({
        //     oldLevel: this._oldLevelSlider.progress
        // });
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
         * 中心点颜色
         */
        centerColor: cc.Color;

        /**
         * 中心点坐标 ([0.0, 1.0], [0.0, 1.0])
         */
        certerPoint: cc.Vec2;

        /**
         * 扩散半径 [0.0, 1.0]
         */
        radius: number;
    }) {
        this._examplesParentNode.children.forEach(childNode => {
            childNode.getComponents(cc.RenderComponent).forEach(renderComponent => {
                let material: cc.Material = renderComponent.getMaterial(0);
                // material.setProperty("centerColor", cc.v4(1.0, 1.0, 0.0, 1.0));
                material.setProperty(
                    "centerColor",
                    cc.v4(
                        param.centerColor.getR() / 255,
                        param.centerColor.getG() / 255,
                        param.centerColor.getB() / 255,
                        param.centerColor.getA() / 255
                    )
                );
                material.setProperty("centerPoint", param.certerPoint);
                material.setProperty("radius", param.radius);
                renderComponent.setMaterial(0, material);
            });
        });
    }
}
