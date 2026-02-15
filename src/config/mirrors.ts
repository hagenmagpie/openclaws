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
}

export const mirrors: Mirror[] = [
  {
    id: 'win11-pro',
    name: 'Windows 11 专业版',
    os: 'windows',
    version: '23H2',
    arch: 'x64',
    size: '约 8 GB',
    url: 'https://你的网盘地址/win11-pro-x64.gho',
    skills: ['homeassistant', 'weather', 'feishu-doc'],
    description: '预装 OpenClaw Gateway，适合桌面办公 + 智能家居控制',
  },
  {
    id: 'ubuntu-desktop',
    name: 'Ubuntu 22.04 桌面版',
    os: 'linux',
    version: '22.04 LTS',
    arch: 'x64',
    size: '约 4 GB',
    url: 'https://你的网盘地址/ubuntu-22.04-x64.img',
    skills: ['homeassistant', 'weather', 'feishu-wiki'],
    description: '预装 OpenClaw，适合开发者 + 树莓派远程管理',
  },
  {
    id: 'ubuntu-server',
    name: 'Ubuntu 22.04 服务器版',
    os: 'linux',
    version: '22.04 LTS',
    arch: 'x64',
    size: '约 2 GB',
    url: 'https://你的网盘地址/ubuntu-22.04-server-x64.img',
    skills: ['homeassistant', 'weather'],
    description: '轻量服务器镜像，适合长期运行 + 自动化任务',
  },
  {
    id: 'raspbian',
    name: 'Raspberry Pi OS',
    os: 'linux',
    version: 'Debian 12',
    arch: 'arm32',
    size: '约 1.5 GB',
    url: 'https://你的网盘地址/raspbian.img',
    skills: ['homeassistant', 'weather', 'nodes'],
    description: '专为树莓派设计，支持 GPIO 物联网控制',
  },
  {
    id: 'macos-arm',
    name: 'macOS Sonoma (黑苹果)',
    os: 'macos',
    version: '14.x',
    arch: 'arm64',
    size: '约 12 GB',
    url: 'https://你的网盘地址/macos-arm64.img',
    skills: ['feishu-doc', 'feishu-wiki', 'weather'],
    description: 'Apple Silicon Mac 专用，预装 iMessage + FaceTime',
  },
];

// 业务场景选项
export const scenarios = [
  { id: 'smart-home', name: '智能家居', skills: ['homeassistant', 'nodes'] },
  { id: 'office', name: '办公协作', skills: ['feishu-doc', 'feishu-wiki', 'feishu-drive'] },
  { id: 'automation', name: '自动化任务', skills: ['cron', 'weather', 'memory'] },
  { id: 'iot', name: '物联网', skills: ['nodes', 'homeassistant', 'weather'] },
  { id: 'monitor', name: '远程监控', skills: ['nodes', 'camera'] },
];
