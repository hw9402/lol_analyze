from fastapi import FastAPI
from dotenv import load_dotenv
from service import getLoLHistory, getUserMostDetails
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

load_dotenv()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/{name}")
async def get_user_info_by_summoner_name(name: str):
    return getLoLHistory(name)


@app.get("/{name}/{most_number}")
async def get_user_details(name: str, most_number: int):
    return getUserMostDetails(name, most_number)
