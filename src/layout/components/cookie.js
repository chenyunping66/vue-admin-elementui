import CryptoJS from 'crypto-js'
// import user from 'mock/user'

//
const key = CryptoJS.enc.Utf8.parse('1234123412ABCDEF') // 十六位十六进制数作为密钥(服务端提供)
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412') // 十六位十六进制数作为密钥偏移量
// 加密方法
export function Encrypt(word) {
  const srcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.ciphertext.toString().toUpperCase()
}
// 解密方法
export function Decrypt(word) {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(word)
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  const decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

// 设置cookie
export const setCookie = (user, psw, exdays, remeberFlag) => {
  // Encrypt，加密账号密码
  const encryptUser = Encrypt(user)
  const enctyptPass = Encrypt(psw)
  // const username = Encrypt(username)
  // const password = Encrypt(password)

  var exdate = new Date() // 获取时间
  exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays) // 保存的天数
  // 字符串拼接cookie，这里用了==，因为加密后的字符串也有个=号，影响下面getcookie的字符串切割
  window.document.cookie =
    'username' + '==' + encryptUser + ';path=/;expires=' + exdate.toGMTString()
  window.document.cookie =
    'password' + '==' + enctyptPass + ';path=/;expires=' + exdate.toGMTString()
  window.document.cookie = 'remeberFlag' + '=' + remeberFlag + ';path=/;expires=' + exdate.toGMTString()
}
// 读取cookie
export const getCookie = () => {
  if (document.cookie.length > 0) {
    var arr = document.cookie.split(';')
    // console.log(arr)
    var userArr = arr[0].split('==') // 根据==切割
    var passArr = arr[1].split('==') // 根据==切割
    var remeberFlag = arr[2].split('=') // 根据==切割

    // 判断查找相对应的值
    const info = {
      'username': Decrypt(userArr[1]),
      'password': Decrypt(passArr[1]),
      'remeberFlag': remeberFlag[1]
    }
    // console.log(info)
    return info
  }
}
// 清除cookie
export const clearCookie = () => {
  setCookie('', '', -1)
}
