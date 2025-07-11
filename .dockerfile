# Node.js 공식 이미지 사용
FROM node:20

# 작업 디렉토리 지정
WORKDIR /app

# 패키지 파일 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 전체 소스 복사
COPY . .

# 빌드
RUN npm run build

# 포트 오픈 (Next.js 기본 3000)
EXPOSE 3000

# 실행 명령 (프로덕션 서버)
CMD ["npm", "start"]
