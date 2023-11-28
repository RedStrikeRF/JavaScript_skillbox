function filter(whiteList = [], blackList = []) {
        let result = [];
        for (let whiteElement of whiteList) {
            let flag = true
            for (let blackElement of blackList) {
                if (whiteElement == blackElement) {
                    flag = false
                }
            }
            if (flag) {
                result.push(whiteElement)
            }
        }
        return result;
}


let whiteList = ['my-email@gmail.ru', 'jsfunc@mail.ru', 'annavkmail@vk.ru', 'fullname@skill.ru', 'goodday@day.ru']
let blackList = ['jsfunc@mail.ru','goodday@day.ru']

let finalList = filter(whiteList, blackList)
console.log(finalList)