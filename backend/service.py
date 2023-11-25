import requests
from bs4 import BeautifulSoup


def getLoLHistory(name: str):
    return getRankInfo(name)


def getRankInfo(name: str):
    response = requests.get(f"https://fow.kr/find/{name}")

    solo_rank_data = {}
    flex_rank_data = {}

    soup = BeautifulSoup(response.text, "html.parser")
    solo_rank_info = soup.select_one(
        "#content-container > div:nth-child(1) > div:nth-child(2) > div.table_summary > div:nth-child(2)")
    solo_rank_summary = solo_rank_info.get_text().strip().split("\t\t\t")

    if len(solo_rank_summary) == 6:
        solo_rank_data["img"] = "https:" + solo_rank_info.select_one("div:nth-child(1)").find("img")["src"]
        solo_rank_data["tier"] = solo_rank_summary[2].replace("등급: ", "").replace("\n", "")
        solo_rank_data["point"] = solo_rank_summary[3].replace("리그 포인트: ", "").replace("\n", "")
        solo_rank_data["grade"] = solo_rank_data["tier"].split(" ")[0].lower()
    else:
        solo_rank_data["error"] = "배치중"

    flex_rank_info = soup.select_one(
        "#content-container > div:nth-child(1) > div:nth-child(2) > div.table_summary > div:nth-child(4)")
    flex_rank_summary = flex_rank_info.get_text().strip().split("\t\t\t")

    if len(flex_rank_summary) == 6:
        flex_rank_data["img"] = "https:" + flex_rank_info.select_one("div:nth-child(1)").find("img")["src"]
        flex_rank_data["tier"] = flex_rank_summary[2].replace("등급: ", "").replace("\n", "")
        flex_rank_data["point"] = flex_rank_summary[3].replace("리그 포인트: ", "").replace("\n", "")
        flex_rank_data["grade"] = flex_rank_data["tier"].split(" ")[0].lower()
    else:
        flex_rank_data["error"] = "배치중"

    return {"solo_rank_info": solo_rank_data, "flex_rank_info": flex_rank_data}
