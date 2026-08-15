/**
 * 🍽️ Thali Combo Platter - Mixed Methods Capstone
 *
 * Grand Indian Thali restaurant mein combo platter system banana hai.
 * String, Number, Array, aur Object — sab methods mila ke ek complete
 * thali banao. Yeh capstone challenge hai — sab kuch combine karo!
 *
 * Data format: thali = {
 *   name: "Rajasthani Thali",
 *   items: ["dal baati", "churma", "papad"],
 *   price: 250,
 *   isVeg: true
 * }
 *
 * Functions:
 *
 *   1. createThaliDescription(thali)
 *      - Template literal, .join(", "), .toUpperCase(), .toFixed(2) use karo
 *      - Format: "{NAME} (Veg/Non-Veg) - Items: {items joined} - Rs.{price}"
 *      - name ko UPPERCASE karo, price ko 2 decimal places tak
 *      - isVeg true hai toh "Veg", false hai toh "Non-Veg"
 *      - Agar thali object nahi hai ya required fields missing hain, return ""
 *      - Required fields: name (string), items (array), price (number), isVeg (boolean)
 *      - Example: createThaliDescription({name:"Rajasthani Thali", items:["dal","churma"], price:250, isVeg:true})
 *                 => "RAJASTHANI THALI (Veg) - Items: dal, churma - Rs.250.00"
 *
 *   2. getThaliStats(thalis)
 *      - Array of thali objects ka stats nikalo
 *      - .filter() se veg/non-veg count
 *      - .reduce() se average price
 *      - Math.min/Math.max se cheapest/costliest
 *      - .map() se saare names
 *      - Return: { totalThalis, vegCount, nonVegCount, avgPrice (2 decimal string),
 *                  cheapest (number), costliest (number), names (array) }
 *      - Agar thalis array nahi hai ya empty hai, return null
 *
 *   3. searchThaliMenu(thalis, query)
 *      - .filter() + .includes() se search karo (case-insensitive)
 *      - Thali match karti hai agar name ya koi bhi item query include kare
 *      - Agar thalis array nahi hai ya query string nahi hai, return []
 *      - Example: searchThaliMenu(thalis, "dal") => thalis with "dal" in name or items
 *
 *   4. generateThaliReceipt(customerName, thalis)
 *      - Template literals + .map() + .join("\n") + .reduce() se receipt banao
 *      - Format:
 *        "THALI RECEIPT\n---\nCustomer: {NAME}\n{line items}\n---\nTotal: Rs.{total}\nItems: {count}"
 *      - Line item: "- {thali name} x Rs.{price}"
 *      - customerName UPPERCASE mein
 *      - Agar customerName string nahi hai ya thalis array nahi hai/empty hai, return ""
 *
 * @example
 *   createThaliDescription({name:"Rajasthani Thali", items:["dal"], price:250, isVeg:true})
 *   // => "RAJASTHANI THALI (Veg) - Items: dal - Rs.250.00"
 */
export function createThaliDescription(thali) {
  if (!thali || !thali.name || !thali.items || !thali.price || thali.isVeg === undefined) return ""
  const { name, items, price, isVeg } = thali
  const updateName = name.toUpperCase();
  const itemList = items.join(", ");
  const value = price.toFixed(2);
  const typeOfThali = isVeg ? "Veg" : "Non-Veg";

  return `${updateName} (${typeOfThali}) - Items: ${itemList} - Rs.${value}`
}

export function getThaliStats(thalis) {
  if (!Array.isArray(thalis) || thalis.length < 1) return null
  let veg = 0;
  let non_Veg = 0;
  thalis.filter((thali) => (thali.isVeg ? veg++ : non_Veg++));
  let average = thalis.reduce((acc, thali) => acc + thali.price / thalis.length, 0);
  let cheap = thalis.reduce((acc, thali) => Math.min(acc, thali.price), thalis[0].price);
  let costliest = thalis.reduce((acc, thali) => Math.max(acc, thali.price), thalis[0].price);
  let name = thalis.map(thali => thali.name);

  return {
    totalThalis: thalis.length,
    vegCount: veg,
    nonVegCount: non_Veg,
    avgPrice: average.toFixed(2),
    cheapest: cheap,
    costliest: costliest,
    names: name
  }

}

export function searchThaliMenu(thalis, query) {
  // Your code here
  if (!Array.isArray(thalis) || typeof query !== "string") return [];
  const data = thalis.filter(thali => thali.name.toLowerCase().includes(query.toLowerCase()) || thali.items.some(item => item.toLowerCase().includes(query.toLowerCase()))) // first check name and then check items 
  //filter se thali nikalo then usmain name ko lo usko lowercase karo then usmain includes se check karo k query match kar raha hain k nehi then uske bad items ko lo usko lowercase karo then usmain includes se check karo k query match kar raha hain k nehi then usko return karo 
  return data;


}

export function generateThaliReceipt(customerName, thalis) {
  /*
  Data format: thali = {
   *   name: "Rajasthani Thali",
   *   items: ["dal baati", "churma", "papad"],
   *   price: 250,
   *   isVeg: true
   * }
  */

  if (!Array.isArray(thalis) || thalis.length < 1 || typeof customerName !== "string") return ""
  // customerName ko uppercase karo
  const CS = customerName.toUpperCase()
  //we will take the thali name and price from the thali object
  const items_with_price = thalis.map(thali => `- ${thali.name} x Rs.${thali.price}`).join("\n");
  //we will take the total price from the thali object
  const total_bill = thalis.reduce((acc, thali) => acc + thali.price, 0);
  // total length karo
  const number_of_items = thalis.length;
   
  return `THALI RECEIPT\n---\nCustomer: ${CS}\n${items_with_price}\n---\nTotal: Rs.${total_bill}\nItems: ${number_of_items}`
}
