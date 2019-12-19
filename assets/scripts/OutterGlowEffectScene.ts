const { ccclass, property } = cc._decorator;

@ccclass
export default class OutterGlowEffectScene extends cc.Component {
    @property(cc.Node)
    examplesParentNode: cc.Node = null;

    start() {
        this._updateRenderComponentOutterGlowMaterial(0);
    }

    onSideCallBack(slider: cc.Slider, customEventData: string) {
        this._updateRenderComponentOutterGlowMaterial(slider.progress / 100);
    }

    /**
     * 更新渲染组件的材质
     *
     * 1. 获取材质
     * 2. 给材质的自定义 unitform 变量赋值
     * 3. 重新将材质赋值回去
     *
     * @param size 描边长度比例[0,1] 比如0.5，那么就是宽*0.5 高*0.5
     */
    private _updateRenderComponentOutterGlowMaterial(size: number) {
        this.examplesParentNode.children.forEach(childNode => {
            childNode.getComponents(cc.RenderComponent).forEach(renderComponent => {
                let material: cc.Material = renderComponent.getMaterial(0);
                material.setProperty("outlineSize", size);
                renderComponent.setMaterial(0, material);
            });
        });
    }
}
