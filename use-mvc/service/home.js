module.exports = {
    login: async (name, pwd) => {
        let data;
        if (name == 'abc' && pwd == '123456') {
            data = `hello, ${name}`;
        }
        else {
            data = '账号密码错误';
        }
        return data;
    }
}