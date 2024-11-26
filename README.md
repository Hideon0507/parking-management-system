# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).



## 前端题：停车场管理系统

### 需求描述
设计并实现一个停车场管理系统的前端界面，用于展示停车场的实时状态。
- 停车场一共 300 个车位。
- 车辆以车牌号作为唯一标识，车牌号为 6 字符。
- 需要提供车辆入库、出库操作，并记录车辆停车时长。
- 需要记录车辆的出入库历史记录。

### 功能要求 
1. 停车位状态与车辆信息展示：
   - 显示停车场的总车位数及其当前状态（空闲或占用）。
   - 每个车位能查看车辆信息，信息包括：
     - 车牌号
     - 入库时间
     - 实时停车时长

2. 搜索功能：
   - 用户可以根据车牌号查找车所在车位位置，支持模糊搜索。

3. 出库入库：
   - 入库按钮。有空位时可用，点击之后生成一辆车入库；无空位则不可用。
   - 出库按钮。有车时可用，随机选取一辆车出库；无车时不可用。

4. 车辆出入库历史记录：
   - 记录需要包含车牌号、入库时间、出库时间、停车时长。

### 交付要求
- 充分理解需求，充分理解需求，充分理解需求。
- 自己设计 UI/UE，展示自己的设计能力，需要**工业级**实现。
- 提交完整的源代码。
- 提供项目 README 文档，说明如何运行和测试系统。