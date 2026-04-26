# Sử dụng Node.js bản nhẹ (Alpine)
FROM node:20-alpine

# Cài đặt thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Build NestJS app
RUN npm run build

# Mở cổng 3000 (cổng mặc định của NestJS)
EXPOSE 3000

# Lệnh chạy ứng dụng khi container khởi động
CMD ["npm", "run", "start:prod"]