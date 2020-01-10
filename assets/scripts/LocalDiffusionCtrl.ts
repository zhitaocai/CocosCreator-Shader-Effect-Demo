const { ccclass, property } = cc._decorator;

@ccclass
export default class LocalDiffusionCtrl extends cc.Component {
    private color: cc.Color = cc.Color.RED;

    onEnable() {
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    }

    onDisable() {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    }

    private _onTouchStart(event: cc.Event.EventTouch) {
        this._onTouchMove(event);
    }

    private _onTouchMove(event: cc.Event.EventTouch) {
        let touchPointInWorldSpace = event.getLocation();
        let touchPointInNodeSpace = this.node.convertToNodeSpaceAR(touchPointInWorldSpace);

        // 将触摸点转换为OPENGL坐标系并归一化
        let normalizePos = cc.v2(
            this.node.anchorX + touchPointInNodeSpace.x / this.node.width,
            1 - (this.node.anchorY + touchPointInNodeSpace.y / this.node.height)
        );

        this._updateMaterial({
            centerColor: this.color,
            certerPoint: normalizePos,
            radius: 0.6
        });
    }

    private _onTouchEnd(event: cc.Event.EventTouch) {
        this._onTouchCancel(event);
    }

    private _onTouchCancel(event: cc.Event.EventTouch) {}

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
            material.setProperty("centerColor", cc.v4(1.0, 1.0, 0.0, 1.0));
            material.setProperty(
                "centerColor",
                cc.v4(param.centerColor.getR() / 255, param.centerColor.getG() / 255, param.centerColor.getB() / 255, param.centerColor.getA() / 255)
            );
            material.setProperty("centerPoint", param.certerPoint);
            material.setProperty("radius", param.radius);
            renderComponent.setMaterial(0, material);
        });
    }
}
