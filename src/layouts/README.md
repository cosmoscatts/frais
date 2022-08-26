# 页面布局
> 这个文件夹内定义的是项目的整体布局结构

## 目前只有两种布局模式
- 垂直布局（vertical）
- 垂直布局（horizontal）

## 文件结构
### base-layout 基础布局
包含垂直、水平布局模式，受 `settings` 中的 `layout` 字段控制，可任意切换。
### blank-layout 空白布局
是登录页、全局 `Loading` 等页面的布局模式。
### components
所有布局模式所使用的组件都在这个文件夹内，包含 `Nav`、`Side`、`Foot`、`Main`、`Settings` 等。
