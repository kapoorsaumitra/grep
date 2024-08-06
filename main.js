function matchPattern(inputLine, pattern) {
  if (pattern.length === 1) {
    return inputLine.includes(pattern);
  }
  if (pattern === "\\d") {
    return /\d/.test(inputLine);
  }
  if (pattern === "\\w") {
    return /\w/.test(inputLine);
  } else if (
    pattern.startsWith("[") &&
    pattern.includes("^") &&
    pattern.endsWith("]")
  ) {
    let changedPattern = pattern.slice(2, pattern.length - 1);
    for (let i = 0; i < changedPattern.length; i++) {
      if (changedPattern.includes(inputLine[i])) {
        return false;
      }
    }
    return true;
  } else if (pattern.startsWith("[") && pattern.endsWith("]")) {
    return pattern.slice(1, pattern.length - 1).includes(inputLine[0]);
  } else {
    throw new Error(`Unhandled pattern ${pattern}`);
  }
}

function main() {
  const pattern = process.argv[3];
  const inputLine = require("fs").readFileSync(0, "utf-8").trim();

  if (process.argv[2] !== "-E") {
    console.log("Expected first argument to be '-E'");
    process.exit(1);
  }

  if (matchPattern(inputLine, pattern)) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

main();
