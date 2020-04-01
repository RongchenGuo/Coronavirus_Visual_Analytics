import pandas as pd
import json


def m():
    R0 = pd.read_csv("R0_.csv", index_col=1)
    EPI = pd.read_csv("EPI.csv", index_col=0)

    provinces = R0.index.tolist()
    res = []
    for prov in provinces:
        res.append({
            "name" : prov,
            "value" : {
            "infect":EPI.loc[prov].values.tolist()[-1],
            "R0":round(float(R0.loc[prov]["近期"]),3)
            }
        })
    with open("data.json", "w", encoding="utf-8") as jsonFile:
        json.dump(res, jsonFile, ensure_ascii=False, indent=2)

m()