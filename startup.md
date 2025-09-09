# Presenton 手动启动指南

本文档详细说明如何手动启动 Presenton 项目的各个服务组件。

## 项目架构

- **后端**: FastAPI (Python) - 端口 8000
- **前端**: Next.js (React) - 端口 3000  
- **MCP 服务器**: Python - 端口 8001
- **Ollama**: 本地模型服务 (可选)
- **Nginx**: 反向代理 (可选) - 端口 5000

## 环境要求

- Node.js (推荐 v18+)
- Python 3.11
- Yarn 包管理器
- uv (Python 包管理器)

## 第一步：设置环境变量

在终端中设置以下环境变量：

```bash
# 基础配置
export CAN_CHANGE_KEYS="false"
export LLM="custom"
export CUSTOM_LLM_URL="https://api.moonshot.cn/v1"
export CUSTOM_LLM_API_KEY="sk-xxxx"
export CUSTOM_MODEL="kimi-k2-0905-preview"
export IMAGE_PROVIDER="pexels"
export PEXELS_API_KEY="xxxxxx"
export DISABLE_THINKING="true"
export APP_DATA_DIRECTORY="./app_data"
```

**重要**: `APP_DATA_DIRECTORY` 环境变量是必需的，用于指定数据库文件存储位置。

## 第二步：创建应用数据目录

```bash
mkdir -p ./app_data
```

## 第三步：安装依赖

### 安装后端依赖 (FastAPI)

```bash
cd servers/fastapi

# 使用 uv 安装依赖 (推荐)
uv sync

# 或者使用 pip
pip install -e .
```

### 安装前端依赖 (Next.js)

```bash
cd ../nextjs

# 使用 yarn 安装依赖
yarn install

# 构建生产版本
yarn build
```

## 第四步：启动各个服务

### 1. 启动后端服务 (FastAPI)

**打开第一个终端窗口**：

```bash
cd /home/wWX1421092/code/smart-req-slides/servers/fastapi

# 设置环境变量
export APP_DATA_DIRECTORY="../../app_data"

# 激活虚拟环境并启动服务
source .venv/bin/activate
python server.py --port 8000 --reload false
```

**预期输出**：
```
INFO:     Started server process [xxxxx]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

**访问地址**: http://localhost:8000

### 2. 启动前端服务 (Next.js)

**打开第二个终端窗口**：

```bash
cd /home/wWX1421092/code/smart-req-slides/servers/nextjs
yarn start -- -p 3000
```

**预期输出**：
```
▲ Next.js 14.2.14
- Local:        http://localhost:3000
- Network:      http://0.0.0.0:3000
✓ Ready in xxxms
```

**访问地址**: http://localhost:3000

### 3. 启动 MCP 服务器 (可选)

**打开第三个终端窗口**：

```bash
cd /home/wWX1421092/code/smart-req-slides/servers/fastapi

# 设置环境变量
export APP_DATA_DIRECTORY="../../app_data"

# 激活虚拟环境并启动服务
source .venv/bin/activate
python mcp_server.py --port 8001
```

**访问地址**: http://localhost:8001

### 4. 启动 Ollama (可选)

**打开第四个终端窗口**：

```bash
ollama serve
```

**预期输出**：
```
time=2024-xx-xxTxx:xx:xx.xxxZ level=INFO source=images.go:xxx msg="total blobs: x"
time=2024-xx-xxTxx:xx:xx.xxxZ level=INFO source=images.go:xxx msg="total unused blobs removed: x"
time=2024-xx-xxTxx:xx:xx.xxxZ level=INFO source=routes.go:xxx msg="Listening on 127.0.0.1:11434"
```

### 5. 启动 Nginx (可选)

**打开第五个终端窗口**：

```bash
sudo service nginx start
```

## 第五步：验证服务状态

### 检查后端 API

```bash
curl http://localhost:8000/docs
```

### 检查前端

访问 http://localhost:3000 查看前端界面

### 检查 MCP 服务器

```bash
curl http://localhost:8001
```

## 服务启动顺序

**必需服务**：
1. 后端 (FastAPI) - 必须先启动
2. 前端 (Next.js) - 依赖后端

**可选服务**：
3. MCP 服务器 - 用于 Model Context Protocol
4. Ollama - 用于本地模型
5. Nginx - 用于端口代理

## 停止服务

### 停止所有服务

在每个终端窗口中按 `Ctrl + C` 停止对应的服务

### 停止 Nginx

```bash
sudo service nginx stop
```

## 故障排除

### 数据库问题

如果遇到数据库相关错误：

```bash
# 确保 APP_DATA_DIRECTORY 环境变量已设置
echo $APP_DATA_DIRECTORY

# 创建应用数据目录
mkdir -p ./app_data

# 检查数据库文件权限
ls -la ./app_data/
```

### 端口冲突

如果遇到端口被占用：

```bash
# 查看端口占用
lsof -i :3000
lsof -i :8000
lsof -i :8001

# 杀死占用进程
kill -9 <PID>
```

### 依赖问题

**后端依赖问题**：
```bash
cd servers/fastapi
uv sync --reinstall
```

**前端依赖问题**：
```bash
cd servers/nextjs
yarn install --force
yarn build
```

### 环境变量问题

确保环境变量已正确设置：

```bash
echo $CUSTOM_LLM_URL
echo $CUSTOM_LLM_API_KEY
echo $PEXELS_API_KEY
echo $APP_DATA_DIRECTORY
```

**重要**: 确保 `APP_DATA_DIRECTORY` 环境变量已设置，否则后端服务无法启动。

## 开发模式

### 后端开发模式

```bash
cd servers/fastapi

# 设置环境变量
export APP_DATA_DIRECTORY="../../app_data"

# 激活虚拟环境并启动服务
source .venv/bin/activate
python server.py --port 8000 --reload true
```

### 前端开发模式

```bash
cd servers/nextjs
yarn dev -- -p 3000
```

## 访问地址总结

- **主应用**: http://localhost:3000
- **后端 API**: http://localhost:8000
- **API 文档**: http://localhost:8000/docs
- **MCP 服务器**: http://localhost:8001
- **通过 Nginx**: http://localhost:5000 (如果配置了 Nginx)

## 注意事项

1. 确保所有环境变量都已正确设置
2. 后端服务必须先于前端启动
3. 如果使用本地模型，需要先安装 Ollama
4. 生产环境建议使用 Nginx 作为反向代理
5. 确保防火墙允许相应端口的访问
