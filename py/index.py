#!/usr/bin/python3

# int(整数), 如 1, 只有一种整数类型 int，表示为长整型，没有 python2 中的 Long。
# bool(布尔), 如 True。
# float(浮点数), 如 1.23、3E-2
# complex(复数), 如 1 + 2j、 1.1 + 2.2j

from functools import reduce
import keyword
str = "ABCDEFGHIJKLMN"
str2 = "True"
a = 0
b = 0
isbol = True
isbol2 = False
intnum = 9


def map_func(x):
    res = x**2
    return res


# 直接返回的是object，例如 <map object at 0x000001FEF3457438>
a1 = map(map_func, [1, 2, 3])
obj = {"a": 777, "b": "ok", "www": "wwe"}
# print(dir(a1))
print(obj['a'])
print(obj['b'])
print(obj['www'])
# print(list(a1))  # 强制转换：[1, 4, 9]

names = ['Bob', 'Tom', 'alice', 'Jerry', 'Wendy', 'Smith']
new_names = [name.upper()for name in names if len(name) > 3]
print(new_names)

# -> ['ALICE', 'JERRY', 'WENDY', 'SMITH']


def main():
    # for item in keyword.kwlist:
    #     if e >= 1:
    #         print(item)
    # for strItem in str:
    #     print(strItem)

    print(str[a:10])
    keyword.kwlist

    def add(a, b):
        return a+b
    # 使用count
    count = reduce(add, [1, 2, 3, 4])
    print(count)
    print(isbol, intnum, isbol2)
    pass


if __name__ == "__main__":
    main()
