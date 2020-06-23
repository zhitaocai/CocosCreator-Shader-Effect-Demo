# Cocos Creator Shader Effect Demo

[![](https://img.shields.io/badge/Release-0.11.0-green.svg)](CHANGELOG.md)
[![](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![](https://img.shields.io/badge/Support-Cocos%20Creator%20v2.3.+-orange.svg)](http://www.cocos.com/creator)
[![](https://img.shields.io/badge/Support-Cocos%20Creator%20v2.2.2-orange.svg)](http://www.cocos.com/creator)
[![](https://img.shields.io/badge/Support-Cocos%20Creator%20v2.2.1-orange.svg)](http://www.cocos.com/creator)


## 一、项目说明

1. 此项目为我在学习过程中的一些分享和实现，因此项目名字以 **`Demo`** 为后缀。
2. 项目重点在于 **「渔」**，不在于 **「鱼」** 。
3. 如果你有意将此Demo中的效果加入到你的项目中，**请认真评估是否适合你的项目使用！**
4. 本项目支持 Cocos Creator `v2.3.+` 、 ~~`v2.2.2`~~ 、 ~~`v2.2.1`~~
   1. 项目当前正在使用 v2.3.3 开发
   2. 由于2.3.+和2.2.2，2.2.1差别较大，因此，`master`分支的最新项目已经无法在2.2.1，2.2.2中重新打开，如果确实需要在 2.2.1，2.2.2 中打开，请先切换到旧版本的tag（`0.8.0`），才能用 2.2.1，2.2.2打开

## 二、系列文章

* [Cocos Creator Shader Effect 系列 - 0 - 前言](https://www.jianshu.com/p/20b906d7269c)
* [Cocos Creator Shader Effect 系列 - 1 - 材质，Effect，Inspector，纹理之间的关系](https://www.jianshu.com/p/ca28666d25d2)
* [Cocos Creator Shader Effect 系列 - 2 - Effect 文件解读](https://www.jianshu.com/p/bae75612ef48)
* [Cocos Creator Shader Effect 系列 - 3 - Effect 文件调试](https://www.jianshu.com/p/2fd028aa0bb8)
* [Cocos Creator Shader Effect 系列 - 4 - 老照片特效](https://www.jianshu.com/p/711a54ff2fa0)
* [Cocos Creator Shader Effect 系列 - 5 - 马赛克/像素化特效](https://www.jianshu.com/p/40e72ab76afd)
* [Cocos Creator Shader Effect 系列 - 6 - 内发光特效](https://www.jianshu.com/p/326b73f86ecc)
* [Cocos Creator Shader Effect 系列 - 7 - 点光/扫光特效](https://www.jianshu.com/p/8ff03b34b0bd)
* [Cocos Creator Shader Effect 系列 - 8 - 高斯模糊](https://www.jianshu.com/p/9e42cbb1d4a8)


* 编写中...

那么现在，我们先来轻松地看下有哪些特效效果吧~

## 三、特效预览

### 内发光（[实现原理](https://www.jianshu.com/p/326b73f86ecc)）

![](static/effects/2d-sprite-glow-inner.gif)

### 马赛克/像素化（[实现原理](https://www.jianshu.com/p/40e72ab76afd)）

![](static/effects/2d-sprite-mosaic.gif)

### 老照片（[实现原理](https://www.jianshu.com/p/711a54ff2fa0)）

![](static/effects/2d-sprite-old-photo.gif)

### 灰度渐变（实现原理同老照片一样，可参考[老照片实现原理文章](https://www.jianshu.com/p/711a54ff2fa0)）

![](static/effects/2d-sprite-gray.gif)

### 点光（[实现原理](https://www.jianshu.com/p/8ff03b34b0bd)）(2020.01.12更新）

![](static/effects/2d-sprite-point-light.gif)

### 扫光（实现原理同点光一样，可参考[点光实现原理文章](https://www.jianshu.com/p/711a54ff2fa0)）(2020.01.13更新）

![](static/effects/2d-sprite-flash-light.gif)

### 圆角裁剪-v1（2020.01.17更新）

> * 声明：此特效为搬运过来的特效，非原创。
> * 修改的地方：搬运后，在原来的主要代码上加入了自己的理解注释
> * 实现原理：参考文章 [《圆角计算 Shader》](https://www.cnblogs.com/jqm304775992/p/4987793.html)
> * 参考代码：Cocos 论坛帖子[《分享更高效的 creator 裁圆角头像 shader》](https://forum.cocos.org/t/creator-shader-2019-10-22-2-2-0/82548) 和对应的 [实现代码](https://github.com/yanjifa/shaderDemo/blob/master/assets/Effect/CircleAvatar.effect)

**此版本存在局限性：只有在正方形纹理上，才能裁剪出圆角，在非正方形上，无法裁剪出圆角，具体变现为有拉伸效果**

如：下面GIF中第3到5秒演示所示，黄色和红色的非正方形纹理的圆角明显被拉伸

![](static/effects/2d-sprite-round-corner-crop-v1.gif)

### 圆角裁剪-v2（2020.01.17更新）

在 **圆角裁剪-v1** 的原理基础上，新增支持任意宽高纹理的圆角裁剪

如：下面Gif中第3到5秒演示所示，黄色和红色的非正方形纹理也能裁剪出圆角效果

![](static/effects/2d-sprite-round-corner-crop-v2.gif)

### 高斯模糊-V1（[实现原理](https://www.jianshu.com/p/9e42cbb1d4a8)）2020.02.07更新）

![](static/effects/2d-sprite-gaussian-blur-v1.png)

### 纯 Shader Effect 实现的 Loading 动画（2020.04.10更新）

![](static/effects/2d-2d-loading-style-1.gif)

ps: 

* 模拟器或者原生平台下可能不会生效
  * 这是因为 effect 中用到 `cc_time` 内置参数，此内置参数已有 [反馈](https://forum.cocos.org/t/creator-v2-2-2-effect-cc-time-android/88916) 在模拟器等原生平台下不生效的问题（坐等引擎修复，或者可以自行传值进去）
  * 此为引导性 Demo 示例，仅供学习

### 外发光（完善中...）

### 外描边（完善中...）

## 四、TODO

* [ ] 图像模糊
* [ ] 波浪
* [ ] 雨滴
* [ ] ...

## 五、支持一下作者吧

如果此项目对你学习和理解Shader有帮助，不妨支持一下我吧~

ps：支持扫码催更哦🤣🤣🤣👇👇👇👇

![](static/PAY.png)


## LICENSE

    MIT License

    Copyright (c) 2020 Zhitao Cai

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
