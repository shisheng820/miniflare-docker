# 步骤 1: 选择一个轻量级的 Node.js 基础镜像
# Alpine Linux 是一个极简的发行版，非常适合构建小体积的 Docker 镜像。
FROM node:20-alpine

# 步骤 2: 在容器内创建一个工作目录
# 之后的所有操作都将在这个目录内进行。
WORKDIR /app

# 步骤 3: 将您的 worker 脚本复制到工作目录中
# 注意：确保 worker.js 和 Dockerfile 在同一个目录下。
COPY worker.js .

# 步骤 4: 安装 Miniflare
# Miniflare 是一个 Cloudflare Workers 的本地模拟器，我们将用它来运行您的脚本。
# --no-cache 表示不保留下载缓存，可以减小镜像体积。
# --production 表示只安装生产环境需要的依赖，避免安装开发工具。
RUN npm install miniflare --production --no-cache

# 步骤 5: 暴露端口
# Miniflare 默认在 8787 端口上运行服务。
EXPOSE 8787

# 步骤 6: 设置容器启动时执行的命令
# 'npx miniflare worker.js' 是启动服务的命令。
# '--host 0.0.0.0' 是关键，它让服务监听容器的所有网络接口，
# 这样我们才能从容器外部（即您的服务器）访问到它。
CMD ["npx", "miniflare", "worker.js", "--host", "0.0.0.0"]
