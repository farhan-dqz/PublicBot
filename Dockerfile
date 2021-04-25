FROM fusuf/whatsasena:latest

RUN git clone https://faru89kt@: farhan-dqz@github.com/farhan-dqz/farhan-dqz/root/WhatsAsenaDuplicated
WORKDIR /root/WhatsAsenaDuplicated/
ENV TZ=Europe/Istanbul
RUN npm install supervisor -g
RUN yarn install --no-audit


CMD ["node", "bot.js"]
