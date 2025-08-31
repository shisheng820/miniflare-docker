# docker-list/proxy.Dockerfile

# 步骤 1: 选择一个轻量级的 Node.js 基础镜像
FROM node:20-alpine

# 步骤 2: 在容器内创建一个工作目录
WORKDIR /app

# 步骤 3: 将您的逻辑脚本复制到工作目录中
# (已更新) 从 worker.js 修改为 proxy-logic.js
COPY proxy-logic.js .

# 步骤 4: 安装 Miniflare
RUN npm install miniflare --production --no-cache

# 步骤 5: 暴露端口
EXPOSE 8787

# 步骤 6: 设置容器启动时执行的命令
CMD ["npx", "miniflare", "proxy-logic.js", "--host", "0.0.0.0"]
