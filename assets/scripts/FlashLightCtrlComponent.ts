const { ccclass, property } = cc._decorator;

@ccclass
export default class FlashLightCtrlComponent extends cc.Component {
    private _flashLightUBO: FlashLightUBO = new FlashLightUBO();

    onEnable() {
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.on("on_property_change", this._onPropertyChange, this);
    }

    onDisable() {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.off("on_property_change", this._onPropertyChange, this);
    }

    private _onTouchStart(event: cc.Event.EventTouch) {
        this._onTouchMove(event);
    }

    private _onTouchMove(event: cc.Event.EventTouch) {
        let touchPointInWorldSpace = event.getLocation();
        let touchPointInNodeSpace = this.node.convertToNodeSpaceAR(touchPointInWorldSpace);

        // 将触摸点转换为OPENGL坐标系并归一化
        // OpenGl 坐标系原点在左上角
        this._flashLightUBO.lightCenterPoint = cc.v2(
            this.node.anchorX + touchPointInNodeSpace.x / this.node.width,
            1 - (this.node.anchorY + touchPointInNodeSpace.y / this.node.height)
        );

        this._updateMaterial();
    }

    private _onPropertyChange(localDiffusionUniform: FlashLightUBO) {
        this._flashLightUBO.lightColor = localDiffusionUniform.lightColor;
        this._flashLightUBO.lightAngle = localDiffusionUniform.lightAngle;
        this._flashLightUBO.lightWidth = localDiffusionUniform.lightWidth;
        this._flashLightUBO.enableGradient = localDiffusionUniform.enableGradient;
        this._flashLightUBO.cropAlpha = localDiffusionUniform.cropAlpha;
        this._flashLightUBO.enableFog = localDiffusionUniform.enableFog;
        this._updateMaterial();
    }

    private _updateMaterial() {
        this.getComponents(cc.RenderComponent).forEach(renderComponent => {
            let material: cc.Material = renderComponent.getMaterial(0);
            material.setProperty("lightColor", this._flashLightUBO.lightColor);
            material.setProperty("lightCenterPoint", this._flashLightUBO.lightCenterPoint);
            material.setProperty("lightAngle", this._flashLightUBO.lightAngle);
            material.setProperty("lightWidth", this._flashLightUBO.lightWidth);
            material.setProperty("enableGradient", this._flashLightUBO.enableGradient);
            material.setProperty("cropAlpha", this._flashLightUBO.cropAlpha);
            material.setProperty("enableFog", this._flashLightUBO.enableFog);
            renderComponent.setMaterial(0, material);
        });
    }
}

export class FlashLightUBO {
    /**
     * 中心点颜色
     */
    lightColor: cc.Color = cc.Color.YELLOW;

    /**
     * 中心点坐标 ([0.0, 1.0], [0.0, 1.0])
     */
    lightCenterPoint: cc.Vec2 = cc.v2(0.5, 0.5);

    /**
     * 光束角度 [0.0, 180.0]
     */
    lightAngle: number = 45;

    /**
     * 光束宽度 [0.0, +∞]
     */
    lightWidth: number = 0.5;

    /**
     * 是否启用光束渐变
     */
    enableGradient: boolean = true;

    /**
     * 是否裁剪掉透明区域上的点光
     */
    cropAlpha: boolean = true;

    /**
     * 是否开启战争迷雾效果
     */
    enableFog: boolean = false;
}
