const { ccclass, property } = cc._decorator;

@ccclass
export default class RoundCornerCropV2EffectScene extends cc.Component {
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
        // 计算半径px
        let radiusInPx = Math.floor(100 * this._radiuSlider.progress);
        this._radiuLabel.string = radiusInPx + "";

        // 更新材质
        this._updateRenderComponentMaterial({
            radiusInPx: radiusInPx
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
         * 圆角半径px
         */
        radiusInPx: number;
    }) {
        this._examplesParentNode.children.forEach(childNode => {
            childNode.getComponents(cc.RenderComponent).forEach(renderComponent => {
                // 计算半径px分别相对于纹理宽高的比例（也叫归一化）
                let xRadiux = param.radiusInPx / childNode.width;
                // 约束范围在区间 [0.0, 0.5]
                xRadiux = xRadiux >= 0.5 ? 0.5 : xRadiux;

                let yRadius = param.radiusInPx / childNode.height;
                yRadius = yRadius >= 0.5 ? 0.5 : yRadius;

                if (childNode.name === "Rectangle1") cc.log(`${childNode.name} : (${xRadiux}, ${yRadius})`);

                // 更新材质
                let material: cc.Material = renderComponent.getMaterial(0);

                // 圆角x轴半径长度（相对于纹理宽度）[0.0, 0.5]
                material.setProperty("xRadius", xRadiux);

                // 圆角y轴半径长度（相对于纹理高度）[0.0, 0.5]
                material.setProperty("yRadius", yRadius);
                renderComponent.setMaterial(0, material);
            });
        });
    }
}
