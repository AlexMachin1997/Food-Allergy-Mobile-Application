var yourAllergies = ['Wheat', 'Peanuts'];
var productAllergies = ["Wheat"];

console.log(yourAllergies.some(allergy => productAllergies.includes(allergy)));