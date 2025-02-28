# JSON Parser

A simple JSON parser built in JavaScript that tokenizes and parses JSON-like input into an Abstract Syntax Tree (AST).

## Features
- Tokenizes JSON input into meaningful tokens
- Parses tokens into a structured AST
- Handles objects, arrays, strings, numbers, booleans, and null values

## Project Structure
```
JSON-Parser/
│-- main.js         # Entry point of the application
│-- tokenizer.js    # Converts JSON input into tokens
│-- parser.js       # Parses tokens into an AST
│-- type.js         # Defines token types and constants
│-- README.md       # Project documentation
```

## Installation
Clone the repository and navigate into the project folder:
```sh
git clone https://github.com/Yashsaini25/json-parser.git
cd json-parser
```

## Usage
Run the parser using Node.js:
```sh
node main.js
```

## Example JSON Input
```json
{
  "name": "Yash",
  "age": 20,
  "isStudent": true
}
```

## Example Output (AST)
```json
{
  type: 'Object',
  value: {
    name: { type: 'String', value: 'Yash' },
    age: { type: 'Number', value: 20 },
    isStudent: { type: 'Boolean', value: true }
  }
}
```

## Contributing
Feel free to submit issues or pull requests to improve the parser.

## Credits
Big thanks to https://ogzhanolguncu.com/blog/write-your-own-json-parser/#tokenizer for helping me understand JSON parsing concepts!

## License
This project is licensed under the MIT License.

