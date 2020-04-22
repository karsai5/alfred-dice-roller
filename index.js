const alfy = require("alfy");
const ini = require("ini");
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime)

const cachedRolls = alfy.cache.get("rolls") || [];

const data = await alfy.fetch("https://rolz.org/api/?" + alfy.input, {
  json: false,
});
const result = ini.parse(data);

cachedRolls.unshift({
  ...result,
  time: dayjs(),
});

alfy.cache.set("rolls", cachedRolls, {maxAge: 600000});

alfy.output(
  cachedRolls.map((roll) => ({
    title: `${roll.result}`,
    subtitle: `🎲 ${roll.input} | 🧮 ${roll.details} | ⏲ ${dayjs(roll.time).fromNow()}`,
    time: dayjs(),
    icon: {
      path: "./dice.png",
    },
  }))
);

