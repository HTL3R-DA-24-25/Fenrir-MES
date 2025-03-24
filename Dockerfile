# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies and build
COPY . .
RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile && \
    pnpm build

# Production stage - using the smallest possible base image
FROM alpine:3.19 AS runner

# Install only the minimal required packages
RUN apk add --no-cache nodejs

WORKDIR /app

# Create non-root user
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# Copy only the absolute essentials
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public


USER nextjs

EXPOSE 3000
CMD ["node", "server.js"]