const BOARD_DATA_KEY = "boardData";

export async function getBoardData() {
  const dataJson = localStorage.getItem(BOARD_DATA_KEY);
  if (!dataJson) {
    return [];
  }
  return JSON.parse(dataJson);
}

export async function setBoardData(data) {
  const json = JSON.stringify(data);
  localStorage.setItem(BOARD_DATA_KEY, json);
}
