const dob = new Date(input.value);
    
    // Получаем текущую дату
const now = new Date();
    
    // Вычисляем возраст
const age = now.getFullYear() - dob.getFullYear();
    
    // Проверяем, нужно ли корректировать возраст из-за даты рождения в этом году
if (now.getMonth() < dob.getMonth() || (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate())) {
    age--;
}