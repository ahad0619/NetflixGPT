export const isDataValid = (email, password)=>{
const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!/%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(password);

if(!isEmailValid) return "Email is not valid"
if(!isPasswordValid) return "Invalid password"

return null
}