var searchArray = ["\<Client Name\>", "\<Solution\>", "\<Company Name\>"];

function main(data) {
  clientName = data.clientName || "invalid";
  solution = data.solution || "invalid";
  companyName = data.companyName || "invalid";

  var replacementArray = [clientName, solution, companyName];

  // Copy files into destination and return array of destination file IDs
  var fileIDArray = copyAllFilesinDir(clientName)

  // Search and Replace for Docs and Slides
  searchReplace(fileIDArray, searchArray, replacementArray)
}