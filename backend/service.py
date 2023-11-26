import json
import requests
from bs4 import BeautifulSoup


def getLoLHistory(name: str):
    return {
        "rank": getRankInfo(name),
        "most": getMost(name)
    }


def getUserMostDetails(name: str, most_number: int):
    most = getMost(name)[most_number-1]
    champion_list_file = open("./champion.json", "r")
    champion_list = json.load(champion_list_file)
    champion_name = champion_list[most["name"]]

    response = requests.get(f"https://fow.kr/stats/{champion_name}")
    soup = BeautifulSoup(response.text, "html.parser")

    get_champion_data = soup.select_one("#counter_info > div.basic_info > table > tbody")

    champion_avg_stats = {
        "win_rate": get_champion_data.select_one("tr:nth-child(1) > td:nth-child(2)").get_text().replace("\n", "").replace("%", ""),
        "kda": get_champion_data.select_one("tr:nth-child(5) > td:nth-child(2)").get_text().replace("\n", ""),
        "avg_kill": get_champion_data.select_one("tr:nth-child(6) > td:nth-child(2)").get_text().replace("\n", ""),
        "avg_death": get_champion_data.select_one("tr:nth-child(7) > td:nth-child(2)").get_text().replace("\n", ""),
        "avg_assist": get_champion_data.select_one("tr:nth-child(8) > td:nth-child(2)").get_text().replace("\n", ""),
        "avg_gold": get_champion_data.select_one("tr:nth-child(9) > td:nth-child(2)").get_text().replace("\n", "").replace(",", ""),
        "avg_cs": get_champion_data.select_one("tr:nth-child(12) > td:nth-child(2)").get_text().replace("\n", ""),
    }

    most_avg_stats = {
        "win_rate": most["win_rate"].replace("%", ""),
        "kda": most["kda"],
        "avg_kill": most["avg_kill"],
        "avg_death": most["avg_death"],
        "avg_assist": most["avg_assist"],
        "avg_gold": most["avg_gold"].replace(",", ""),
        "avg_cs": most["avg_cs"]
    }

    return {
        "labels": list(champion_avg_stats.keys()),
        # "champion_avg_stats_list": list(float(value) for value in champion_avg_stats.values()),
        # "most_avg_stats_list": list(float(value) for value in most_avg_stats.values()),
        "champion_avg_stats_list": list(champion_avg_stats.values()),
        "most_avg_stats_list": list(most_avg_stats.values()),
        "champion_name": most["name"]
    }


def getRankInfo(name: str):
    response = requests.get(f"https://fow.kr/find/{name}")
    soup = BeautifulSoup(response.text, "html.parser")

    solo_rank_data = {}
    flex_rank_data = {}

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


def getMost(name: str):
    response = requests.get(f"https://fow.kr/find/{name}")
    soup = BeautifulSoup(response.text, "html.parser")

    top_3_most = [{}, {}, {}]

    get_most = soup.select_one("#content-container > div:nth-child(1) > div:nth-child(2) > div.rankchamp_S13B_div.rankchamp_S13B_div_all > table > tbody")

    first = get_most.select_one("tr:nth-child(1)")
    second = get_most.select_one("tr:nth-child(2)")
    third = get_most.select_one("tr:nth-child(3)")

    for k, v in {0: first, 1: second, 2: third}.items():
        top_3_most[k] = {
            "name": v.select_one("td:nth-child(1)").get_text().strip(),
            "count": v.select_one("td:nth-child(2)").get_text(),
            "win_rate": v.select_one("td:nth-child(3)").get_text(),
            "win": v.select_one("td:nth-child(13)").get_text(),
            "lose": v.select_one("td:nth-child(14)").get_text(),
            "kda": v.select_one("td:nth-child(4)").get_text(),
            "avg_kill": v.select_one("td:nth-child(5)").get_text(),
            "avg_death": v.select_one("td:nth-child(6)").get_text(),
            "avg_assist": v.select_one("td:nth-child(7)").get_text(),
            "avg_cs": v.select_one("td:nth-child(8)").get_text(),
            "avg_gold": v.select_one("td:nth-child(9)").get_text(),
            "triple_kill": v.select_one("td:nth-child(10)").get_text(),
            "quadra_kill": v.select_one("td:nth-child(11)").get_text(),
            "penta_kill": v.select_one("td:nth-child(12)").get_text(),
        }

    return top_3_most
