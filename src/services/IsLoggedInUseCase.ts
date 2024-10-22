import { loadTokenService } from 'src/DIContainer/TokenStoreContainer';

export default function isLoggedInUseCase() {
  function isLoggedIn(): boolean {
    const token = loadTokenOrNull();

    return token != null;
  }

  return {
    isLoggedIn,
  };
}

function loadTokenOrNull() {
  try {
    return loadTokenService();
  } catch (e) {
    return null;
  }
}
