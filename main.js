const { tokenizer } = require("./tokenizer"); 
const { parser } = require("./parser"); 

const jsonString = `{
  "name": "Yash",
  "age": 20,
  "isStudent": true
}
`;

const tokens = tokenizer(jsonString);

try {
    const parsedJSON = parser(tokens);
    console.dir(parsedJSON, { depth: null, colors: true });
} catch (error) {
    console.error("Error:", error.message);
}
