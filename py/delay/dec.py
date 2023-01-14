

def main(e):
    # var Permissions = map[int]map[string]bool{
    #     1:  PlatformInfoAPI,
    #     4:  PlatformAccountAPI,
    #     16: UniformAccountAPI,
    # }

    # for p= 1 ;p < permission; p = p << 2 :
    #     if Permissions[permission & p][api] {
    #         return true
    #     }
    # }
    #

    # ks = {e: e for e in ['id', "um", "uw", "msg"]}
    ks = [e.get('um') for e in [{'id': 3}, {"um": 4}, {
        "uw": 1}, {"msg": 14}]if "um" in e]
    print(ks)
    # print(ks[0] == 3)
    # print(ks.__dir__())
    obj = {"k": 232}
    print(obj['k'])
    pass


if __name__ == "__main__":
    main('999999')
