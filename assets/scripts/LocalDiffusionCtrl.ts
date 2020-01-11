const { ccclass, property } = cc._decorator;

@ccclass
export default class LocalDiffusionCtrl extends cc.Component {
    private _centerPointPos: cc.Vec2 = cc.v2(0.5, 0.5);
    private _centerColor: cc.Color = cc.Color.RED;
    private _radius: number = 0.2;

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
        this._centerPointPos = cc.v2(
            this.node.anchorX + touchPointInNodeSpace.x / this.node.width,
            1 - (this.node.anchorY + touchPointInNodeSpace.y / this.node.height)
        );

        this._updateMaterial({
            centerColor: this._centerColor,
            certerPoint: this._centerPointPos,
            radius: this._radius
        });
    }

    private _onPropertyChange(color: cc.Color, radius: number) {
        this._centerColor = color;
        this._radius = radius;
        this._updateMaterial({
            centerColor: this._centerColor,
            certerPoint: this._centerPointPos,
            radius: this._radius
        });
    }

    private _updateMaterial(param: {
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
        this.getComponents(cc.RenderComponent).forEach(renderComponent => {
            let material: cc.Material = renderComponent.getMaterial(0);
            material.setProperty("centerColor", param.centerColor);
            material.setProperty("centerPoint", param.certerPoint);
            material.setProperty("radius", param.radius);
            renderComponent.setMaterial(0, material);
        });
    }
}
