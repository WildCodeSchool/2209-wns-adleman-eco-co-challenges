#!/bin/sh
#chmod +x /home/wns_student/apps/ecocochallenges/production/bin/sh/deploy-staging.sh && \
#cd .. && cd .. && git fetch origin && git reset --hard origin/main && git clean -f -d && \
#docker compose -f docker-compose.staging.yml down && \
#docker compose -f docker-compose.staging.yml pull && \
#docker compose -f docker-compose.staging.yml --env-file .env.staging up -d;
cd ../.. && \
git fetch origin && \
git reset --hard origin/develop -f && \
docker-compose up --no-recreate --no-build --force-recreate -d
