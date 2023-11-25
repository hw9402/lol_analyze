import instance from "./instance";

export const getHomeInfo = async (name: string) => {
  try {
    const { data } = await instance.get(`/${name}`);
    return data;
  } catch (error) {
  }
}