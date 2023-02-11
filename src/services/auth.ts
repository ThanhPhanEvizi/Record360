import STORAGE_KEYS from "../constants/storage-keys";

interface UserCredential {
  access: string;
  refresh: string;
  username: string;
  role: string;
}

export const removeUserCredential = async () => {
  localStorage.removeItem(STORAGE_KEYS.ACCESS);
  localStorage.removeItem(STORAGE_KEYS.REFRESH);
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.ROLE);
};

export const saveUsername = async (username: string) => {
  localStorage.setItem(STORAGE_KEYS.USER, username);
};

export const saveUserCredential = async ({
  access,
  refresh,
  username,
  role,
}: UserCredential) => {
  localStorage.setItem(STORAGE_KEYS.ACCESS, access);
  localStorage.setItem(STORAGE_KEYS.REFRESH, refresh);
  localStorage.setItem(STORAGE_KEYS.USER, username);
  localStorage.setItem(STORAGE_KEYS.ROLE, role);
};

export const getUserCredentialFromStorage = () => {
  const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS);
  const username = localStorage.getItem(STORAGE_KEYS.USER);
  const role = localStorage.getItem(STORAGE_KEYS.ROLE);
  return { accessToken, username, role };
};
