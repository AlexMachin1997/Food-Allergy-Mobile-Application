var yourAllergies = ["soya", "milk"];
var productAllergies = ["milk"];

console.log(yourAllergies.some(allergy => productAllergies.includes(allergy)));
