const alfy = require("alfy");
const ini = require("ini");

const data = await alfy.fetch("https://rolz.org/api/?" + alfy.input, {
  json: false,
});
const result = ini.parse(data);

alfy.output([{ 
  title: `${result.result}`,
  subtitle: `${result.input} = ${result.details}`,
  icon: {
    path: './dice.png'
  } 
 }]);
