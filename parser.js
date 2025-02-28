/**
 * @param {tokens[]} tokens
 * @return {ASTNode}
 * @throws {Error}
 */
const parser = (tokens) => {
    if(!tokens || !tokens.length)
        throw new Error("Nothing to parse. Exiting!");

    let current = 0;

    /**
     * @return {tokens}
     */
    function advance(){
        return tokens[++current];
    }

    /**
     * @returns {tokens}
     */
    function getToken(){
        return tokens[current] || {};
    }

    return parseValue(tokens, getToken, advance);
}

/**
 * @param {tokens[]} tokens
 * @param {function} getToken
 * @param {function} advance
 * @return {ASTNode}
 * @throws {Error}
 */
function parseValue(tokens, getToken, advance){
    const token = getToken();

    switch(token.type){
        case "String":
            advance();
            return {type: "String", value: token.value};
        case "Number":
            advance();
            return {type: "Number", value: token.value};
        case "True":
            advance();
            return {type: "Boolean", value: true};
        case "False":
            advance();
            return {type: "Boolean", value: false};
        case "Null":
            advance();
            return {type: "Null"};
        case "BraceOpen":
            return parseObject(tokens, getToken, advance);
        case "BracketOpen":
            return parseArray(tokens, getToken, advance);
        default:
            throw new Error(`Unexpected Token Type: ${token.type}`);
    }
}

/**
 * @param {tokens[]} tokens
 * @param {function} getToken
 * @param {function} advance
 * @return {ASTNode}
 * @throws {Error}
 */
function parseObject(tokens, getToken, advance){
    const node = {type: "Object", value: {}};
    let token = advance();

    while(token && token.type !== "BraceClose"){
        if(token.type === "String"){
            const key = token.value;
            token = advance();

            if(!token || token.type !== "Colon")
                throw new Error("Expected : in key-value pair");

            advance();
            node.value[key] = parseValue(tokens, getToken, advance);
            token = getToken();
        }
        else throw new Error(`Expected String key in Object. Token type: ${token.type}`);

        if(token.type === "Comma"){
            advance();
            token = getToken();
            if(token.type === "BraceClose")
                throw new Error("Unexpected trailing comma in object.");
        }
    }

    if (!token || token.type !== "BraceClose") {
        throw new Error("Unexpected end of input while parsing object");
    }

    advance();
    return node;
}

/**
 * @param {tokens[]} tokens 
 * @param {function} getToken 
 * @param {function} advance 
 * @return {ASTNode} 
 */
function parseArray(tokens, getToken, advance){
    const node = {type: "Array", value: []};
    let token = advance();

    while(token && token.type !== "BracketClose"){
        node.value.push(parseValue(tokens, getToken, advance));
        token = getToken();

        if(token.type === "Comma"){
            advance();
            token = getToken();
            if(token.type === "BracketClose")
                throw new Error("Unexpected trailing comma in array.");
        }
    }
    
    if (!token || token.type !== "BracketClose") {
        throw new Error("Unexpected end of input while parsing array");
    }

    advance();
    return node;
}

module.exports = {parser, parseValue, parseObject, parseArray};