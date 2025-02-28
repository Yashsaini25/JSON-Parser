/**
 * @param {string} value
 * @returns {boolean}
 */
function isBooleanTrue(value){
    return value === "true";
}


/**
 * @param {string} value
 * @returns {boolean}
 */
function isBooleanFalse(value){
    return value === "false";
}


/**
 * @param {string} value
 * @returns {boolean}
 */
function isNull(value){
    return value === "null";
}


/**
 * @param {string} input
 * @returns {tokens[]}
 */
const tokenizer = (input) => {
    let current = 0;
    const tokens = [];

    while(current < input.length){
        let char = input[current];

        if(char === '{'){
            tokens.push({type: 'BraceOpen', value: '{'});
        }else if(char === '}'){
            tokens.push({type: 'BraceClose', value: '}'});
        }else if(char === '['){
            tokens.push({type: 'BracketOpen', value: '['});
        }else if(char === ']'){
            tokens.push({type: 'BracketClose', value: ']'});
        }else if(char === ','){
            tokens.push({type: 'Comma', value: ','});
        }else if(char === ':'){
            tokens.push({type: 'Colon', value: ':'});
        }

        else if(char === '"'){
            let value = "";
            char = input[++current];
            while(current < input.length && char !== '"'){
                value += char;
                char = input[++current];
            }

            if(char !== '"') throw new Error("Unexpected end of string");
            tokens.push({type: 'String', value});
        }

        else if(/\d|-/.test(char)){
            let value = "";
            while(/\d|-/.test(char)){
                value += char;
                char = input[++current];
            }

            tokens.push({type: "Number", value: parseFloat(value)});
            current--;
        }
        
        else if(/[a-zA-Z]|-/.test(char)){
            let value = "";
            while(/[a-zA-Z]/.test(char)){
                value += char;
                char = input[++current];
            }

            if(isBooleanTrue(value)) tokens.push({type: "True", value});
            else if(isBooleanFalse(value)) tokens.push({type: "False", value});
            else if(isNull(value)) tokens.push({type: "Null", value});
            else throw new Error ("Unexpected Value: " + value);
            current--;
        }

        else if(/\s/.test(char)){
            current++;
            continue;
        }
        else throw new Error("Unexpected Character: " + char);
        current++;
    }
    return tokens;
}

module.exports = {tokenizer};