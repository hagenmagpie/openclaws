// 镜像配置
// 在此配置你的 Ghost 镜像地址

export interface Mirror {
  id: string;
  name: string;
  os: 'windows' | 'linux' | 'macos';
  version: string;
  arch: 'x64' | 'arm64' | 'arm32';
  size: string;
  url: string;
  skills: string[];
  description: string;
  installGuide: string;  // 安装教程
}

export const mirrors: Mirror[] = [
  {
    id: 'win11-pro',
    name: 'Windows 11 专业版',
    os: 'windows',
    version: '23H2',
    arch: 'x64',
    size: '约 8 GB',
    url: 'https://your-cloud.example.com/win11-pro-x64.gho',
    skills: ['homeassistant', 'weather', 'feishu-doc'],
    description: '预装 OpenClaw Gateway，适合桌面办公 + 智能家居控制',
    installGuide: `## 🚀 安装教程：Windows 11 专业版

### 准备工作
1. 下载镜像文件 (约 8 GB)
2. 准备一个 ≥32GB 的 U 盘
3. 下载 [Rufus](https://rufus.ie/zh/) 启动盘制作工具

### 写入镜像
1. 插入 U 盘，运行 Rufus
2. 选择下载的 .gho 镜像文件
3. 点击「开始」等待写入完成

### 首次启动
1. 从 U 盘启动电脑（需在 BIOS 中设置启动顺序）
2. 进入 Ghost 界面，选择「恢复到磁盘」
3. 选择目标硬盘，等待恢复完成
4. 重启后自动进入 Windows 11

### 配置 OpenClaw
1. 首次登录账号密码均为 \`openclaw\`
2. 按 \`Win + R\` 打开运行，输入 \`cmd\` 回车
3. 执行以下命令配置：
   \`\`\`cmd
   openclaw config
   \`\`\`
4. 按提示完成 API Key 等配置

### 预装 Skills
- **homeassistant**: 连接 Home Assistant
- **weather**: 天气查询
- **feishu-doc**: 飞书文档操作`,
  },
  {
    id: 'ubuntu-desktop',
    name: 'Ubuntu 22.04 桌面版',
    os: 'linux',
    version: '22.04 LTS',
    arch: 'x64',
    size: '约 4 GB',
    url: 'https://your-cloud.example.com/ubuntu-22.04-x64.img',
    skills: ['homeassistant', 'weather', 'feishu-wiki'],
    description: '预装 OpenClaw，适合开发者 + 树莓派远程管理',
    installGuide: `## 🚀 安装教程：Ubuntu 22.04 桌面版

### 准备工作
1. 下载镜像文件 (约 4 GB)
2. 准备一个 ≥8GB 的 U 盘
3. 下载 [Rufus](https://rufus.ie/zh/) 或 [Etcher](https://etcher.balena.io/)

### 写入镜像
1. 插入 U 盘，运行 Rufus/Etcher
2. 选择下载的 .img 镜像文件
3. 点击「开始」等待写入完成

### 首次启动
1. 从 U 盘启动电脑
2. 选择「Try or Install Ubuntu」
3. 安装完成后重启
4. 登录账号：\`openclaw\`，密码：\`openclaw\`

### 配置 OpenClaw
打开终端执行：
\`\`\`bash
openclaw config
\`\`\`
按提示完成配置。`,
  },
  {
    id: 'ubuntu-server',
    name: 'Ubuntu 22.04 服务器版',
    os: 'linux',
    version: '22.04 LTS',
    arch: 'x64',
    size: '约 2 GB',
    url: 'https://your-cloud.example.com/ubuntu-22.04-server-x64.img',
    skills: ['homeassistant', 'weather'],
    description: '轻量服务器镜像，适合长期运行 + 自动化任务',
    installGuide: `## 🚀 安装教程：Ubuntu 22.04 服务器版

### 写入镜像 (Linux/Mac)
\`\`\`bash
sudo dd if=ubuntu-22.04-server-x64.img of=/dev/sdX bs=4M status=progress
\`\`\`
(\`/dev/sdX\` 替换为你的 U 盘设备名)

### 首次启动
1. 从 U 盘启动服务器
2. 按提示完成系统安装
3. 登录账号：\`openclaw\`，密码：\`openclaw\`

### 配置 OpenClaw
\`\`\`bash
openclaw config
\`\`\``,
  },
  {
    id: 'raspbian',
    name: 'Raspberry Pi OS',
    os: 'linux',
    version: 'Debian 12',
    arch: 'arm32',
    size: '约 1.5 GB',
    url: 'https://your-cloud.example.com/raspbian.img',
    skills: ['homeassistant', 'weather', 'nodes'],
    description: '专为树莓派设计，支持 GPIO 物联网控制',
    installGuide: `## 🚀 安装教程：Raspberry Pi OS

### 准备工作
1. 下载镜像文件 (约 1.5 GB)
2. 准备一个 ≥4GB 的 SD 卡
3. 下载 [Raspberry Pi Imager](https://www.raspberrypi.com/software/)

### 写入镜像
1. 运行 Raspberry Pi Imager
2. 选择「使用自定义镜像」
3. 选择下载的 .img 文件
4. 写入 SD 卡

### 首次启动
1. 将 SD 卡插入树莓派
2. 连接电源开机
3. 登录账号：\`openclaw\`，密码：\`openclaw\`
4. 获取 IP 地址：\`hostname -I\``,
  },
];

// 业务场景选项
export const scenarios = [
  { id: 'smart-home', name: '智能家居', skills: ['homeassistant', 'nodes'], icon: '🏠', desc: '控制灯光、传感器、摄像头等智能设备' },
  { id: 'office', name: '办公协作', skills: ['feishu-doc', 'feishu-wiki', 'feishu-drive'], icon: '💼', desc: '文档管理、知识库、云盘集成' },
  { id: 'automation', name: '自动化任务', skills: ['cron', 'weather', 'memory'], icon: '⚡', desc: '定时任务、数据同步、提醒通知' },
  { id: 'iot', name: '物联网', skills: ['nodes', 'homeassistant', 'weather'], icon: '📡', desc: '传感器数据采集、设备控制' },
  { id: 'monitor', name: '远程监控', skills: ['nodes', 'camera'], icon: '📹', desc: '摄像头监控、屏幕截图、远程控制' },
];
