from fastapi import FastAPI
from dotenv import load_dotenv
from service import Service

app = FastAPI()

load_dotenv()


@app.get("/{name}")
async def get_user_info_by_summoner_name(name: str):
    return Service().getLoLHistory(name)
