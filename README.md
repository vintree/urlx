# urlx

urlx中集成了url的常见处理方法，主要有三个核心方法

> npm install urlx

## 方法 parse(params, callback)

```
EP1:
urlx.parse('?a=1&b=2')

return => {
    a: 1,
    b: 2
}

EP1.1:
urlx.parse('a=1&b=2')

return => {
    a: 1,
    b: 2
}

EP2:
urlx.parse('?a=1&b=2', (value) => {
    return `${value}. hi!`
})

return => {
    a: 1. hi!,
    b: 2. hi!
}
```

## 方法 parseEncode(params, callback) 

## 方法 parseDecode(params, callback)

## 方法 stringify(data = {}, isSearch = true)

```
EP1:
urlx.parse({
    a: 1,
    b: 2
})

return => '?a=1&b=2'

EP1.1:
urlx.parse({
    a: 1,
    b: 2
}, false)

return => 'a=1&b=2'
```

## 方法 stringifyEncode(data, isSearch)

## 方法 stringifyDecode(data, isSearch)

## 方法 replace(url = '', obj = {})
```
url = 'https://taobao.com?a=1&b=2'
url = '?a=1&b=2'
url = 'a=1&b=2'

EP1:
urlx.replace('https://taobao.com?a=1&b=2', {
    a: 11,
    b: 22
})

return => 'https://taobao.com?a=11&b=22'
```

### 更新日志

#### V1.2.6
* 「Add」parseEncode
* 「Add」parseDecode
* 「Add」stringifyEncode
* 「Add」stringifyDecode
