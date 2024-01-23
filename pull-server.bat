@echo off
npm run build

git add .

set /p message="Mensagem do commit: "
git commit -am "%message%"
git push origin master

ssh joaomarcos@34.95.197.124 "cd /home/api && git pull origin master && pm2 restart api && sudo systemctl restart nginx"
