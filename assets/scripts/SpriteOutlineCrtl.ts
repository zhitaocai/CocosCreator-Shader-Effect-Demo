const { ccclass, property } = cc._decorator;

@ccclass
export default class SpriteOutlineCtrl extends cc.Component {
    private _sprite: cc.Sprite = null;

    onLoad() {
        this._sprite = this.getComponent(cc.Sprite);
        if (this._sprite == null) {
            throw new Error(`${this.name} can only bind on Sprite`);
        }
    }

    start() {
        // let material: cc.Material = this._sprite.getMaterial(0);
        // material.setProperty("test", 0);
        // this._sprite.setMaterial(0, material);
    }

    // update (dt) {}
}
